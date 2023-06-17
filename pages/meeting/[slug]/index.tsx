import React from 'react';

import { useRouter } from 'next/router';
import { Button, Modal } from '@nextui-org/react';
import {
	useHuddle01,
	useRoom,
	usePeers,
	useMeetingMachine,
} from '@huddle01/react/hooks';
import { useAddress, useSigner } from '@thirdweb-dev/react';
import * as PushAPI from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';

import { Loading } from '@nextui-org/react';
import { Audio } from '@huddle01/react/components';
import { useEventListener } from '@huddle01/react';
import { MeetingHeader, MeetingControls, Chat } from '@/components';
import { UserMeetingCard } from '@/components/cards';

import { updatePeerId, getProfileByPeerId } from '@/services/graphql';

import { ENV } from '@pushprotocol/socket/src/lib/constants';
import { HUDDLE_PROJECT_ID } from '@/utils';

import { emojiList } from '@/components/emoji-toolbar';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export type ChatType = {
	messageContent: string;
	from: string;
};

export type ChatDetails = {
	chatId?: string;
	pgpDecrpyptedPvtKey?: string;
	chats?: ChatType[];
};

const Meeting = () => {
	const { initialize, isInitialized } = useHuddle01();

	React.useEffect(() => {
		initialize(HUDDLE_PROJECT_ID);
	}, []);

	const router = useRouter();
	const address = useAddress();
	const _signer = useSigner();
	const { state } = useMeetingMachine();
	const { peers, peerIds } = usePeers();
	const { joinRoom, isLoading, isRoomJoined } = useRoom();

	const [chatDetails, setChatDetails] = React.useState<ChatDetails>({});
	const [sdkSocket, setSDKSocket] = React.useState<any>(null);
	const [isChatJoining, setIsChatJoining] = React.useState<boolean>(false);
	const [chats, setChats] = React.useState<ChatType[]>([]);
	const [modalOpen, setIsModalOpen] = React.useState<boolean>(false);

	const reactionRef = React.useRef<HTMLDivElement>(null);

	const meetingId = router?.query.slug as string;

	React.useEffect(() => {
		async function joinMeetingRoom() {
			try {
				if (!isInitialized) return;
				await joinRoom();
				const res = await updatePeerId({
					address: address!,
					peerId: state?.context.peerId,
				});
			} catch (error) {
				console.log(error);
			}
		}
		if (meetingId && address && isInitialized) {
			joinMeetingRoom();
		}
	}, [meetingId, isInitialized]);

	useEventListener('room:new-peer', async () => {
		const { membersList, adminList } = await getMembersAndAdmins();
		console.log(adminList, address);
		if (adminList?.includes(address!)) {
			console.log('adding');
			const newPeer = await getProfileByPeerId(peerIds[peerIds.length - 1]);
			if (!membersList.includes(newPeer?.address)) {
				await addGroupMember(newPeer?.address);
			}
		}
	});

	const startChat = async () => {
		setIsChatJoining(true);
		const pushSDKSocket = createSocketConnection({
			user: `eip155:${address}`,
			env: ENV.PROD,
			socketType: 'chat',
			socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
		});
		setSDKSocket(pushSDKSocket);
		const res = await PushAPI.chat.getGroupByName({
			groupName: meetingId,
		});

		console.log(res);

		const user = await PushAPI.user.get({
			account: `eip155:${address}`,
		});

		// need to decrypt the encryptedPvtKey to pass in the api using helper function
		const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
			encryptedPGPPrivateKey: user.encryptedPrivateKey,
			signer: _signer,
		});

		try {
			const approveChatRequest = await PushAPI.chat.approve({
				status: 'Approved',
				account: address!,
				senderAddress: res.chatId,
				signer: _signer,
				pgpPrivateKey: pgpDecryptedPvtKey,
				env: ENV.PROD,
			});
		} catch (error) {
			console.log(error);
		}

		setChatDetails({
			chatId: res.chatId,
			pgpDecrpyptedPvtKey: pgpDecryptedPvtKey,
			chats: chats,
		});
		setIsChatJoining(false);
	};

	const getMembersAndAdmins = async () => {
		const res = await PushAPI.chat.getGroupByName({
			groupName: meetingId,
		});

		const membersList = [];
		const adminList = [];

		for (let i = 0; i < res.members.length; i++) {
			if (res?.members?.at(i)?.isAdmin) {
				adminList.push(res?.members?.at(i)?.wallet.split('eip155:').at(1));
			} else {
				membersList.push(res?.members?.at(i)?.wallet.split('eip155:').at(1));
			}
		}

		return { membersList, adminList };
	};

	const addGroupMember = async (peerAddress: string) => {
		const res = await PushAPI.chat.getGroupByName({
			groupName: meetingId,
		});

		const { membersList, adminList } = await getMembersAndAdmins();

		const groupDetails = {
			chatId: res.chatId,
			account: address!,
			groupName: res.groupName,
			groupDescription: res.groupDescription as string,
			groupImage: res.groupImage as string,
			admins: adminList as string[],
			pgpPrivateKey: chatDetails.pgpDecrpyptedPvtKey,
			members: [...membersList, ...adminList, peerAddress] as string[],
			env: ENV.PROD,
		};

		try {
			await PushAPI.chat.updateGroup(groupDetails);
		} catch (error) {
			console.log(error);
		}
	};

	sdkSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message: any) => {
		if (emojiList.includes(message.messageContent)) {
			// move reaction div from bottom to top while reducing opacity
			if (reactionRef.current) {
				reactionRef.current.innerText = message.messageContent;
				reactionRef.current.style.opacity = '1';
				reactionRef.current.style.bottom = '0';
				reactionRef.current.style.transition = 'all 3s ease-in';
				setTimeout(() => {
					if (reactionRef.current) {
						reactionRef.current.style.bottom = '600px';
					}
				}, 1000);
				setTimeout(() => {
					if (reactionRef.current) {
						reactionRef.current.style.bottom = '0px';
						reactionRef.current.innerText = '';
					}
				}, 4000);
				console.log(message);
			}
		} else {
			setChats([
				...chats,
				{
					messageContent: message.messageContent,
					from: message.fromCAIP10.split('eip155:').at(1),
				},
			]);
		}
	});

	return (
		<main className={`${inter.className} mb-12 xl:mb-0`}>
			<MeetingHeader />
			{isRoomJoined && !isLoading ? (
				<div>
					<div className='max-w-[90vw] w-full mx-auto flex flex-row h-[75dvh]'>
						<div className='basis-[100%] xl:basis-2/3 overflow-scroll no-scrollbar my-auto'>
							<div className='flex flex-row flex-wrap justify-evenly gap-8'>
								<UserMeetingCard peerId={state?.context.peerId} />
								{Object.values(peers)
									.filter((peer) => peer.peerId)
									.map((peer, index) => (
										<div key={index}>
											<Audio peerId={peer.peerId} />
											<UserMeetingCard {...peer} />
										</div>
									))}
							</div>
						</div>

						<div className='hidden xl:flex xl:basis-1/3'>
							{chatDetails?.chatId ? (
								<Chat {...chatDetails} chats={chats} />
							) : (
								<div className='w-full flex items-center justify-center rounded-3xl bg-[#0e0f0f] shadow-2xl'>
									<Button
										className='bg-blue-500'
										size='lg'
										onPress={async () => startChat()}
										aria-label='start chat'
										disabled={isChatJoining}
									>
										{isChatJoining ? (
											<Loading color='white' size='sm' />
										) : (
											'Start Chat'
										)}
									</Button>
								</div>
							)}
							<Modal
								scroll
								fullScreen
								closeButton
								aria-labelledby='modal-title'
								aria-describedby='modal-description'
								noPadding
								open={modalOpen}
								onClose={() => setIsModalOpen(false)}
								className='flex xl:hidden'
							>
								{chatDetails?.chatId ? (
									<Chat {...chatDetails} chats={chats} />
								) : (
									<div className='w-full flex items-center justify-center rounded-3xl bg-[#0e0f0f] shadow-2xl h-full'>
										<Button
											className='bg-blue-500'
											size='lg'
											onPress={async () => startChat()}
											aria-label='start chat'
											disabled={isChatJoining}
										>
											{isChatJoining ? (
												<Loading color='white' size='sm' />
											) : (
												'Start Chat'
											)}
										</Button>
									</div>
								)}
							</Modal>
						</div>
					</div>
					<div className='max-w-screen-sm w-full mx-auto mt-8 p-4'>
						<MeetingControls
							modalOpen={modalOpen}
							setIsModalOpen={setIsModalOpen}
							chatDetails={chatDetails}
						/>
						<div
							ref={reactionRef}
							className='w-fit text-4xl relative ml-16 sm:ml-0'
						></div>
					</div>
				</div>
			) : (
				<div className=' w-fit mx-auto mt-60'>
					<Loading size='xl' />
				</div>
			)}
		</main>
	);
};

export default Meeting;
