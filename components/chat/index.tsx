import React from 'react';

import { Button, Textarea, Loading } from '@nextui-org/react';
import { Send } from 'react-iconly';

import { ChatDetails } from '@/pages/meeting';
import * as PushAPI from '@pushprotocol/restapi';
import { useAddress, useSigner } from '@thirdweb-dev/react';
import { ENV } from '@pushprotocol/socket/src/lib/constants';

const ChatPill = ({ content, sender }: { content: string; sender: string }) => {
	return (
		<div
			className={`${
				sender === 'me' ? 'self-end bg-[#0072F5]' : 'self-start bg-[#252D33]'
			} px-4 py-2 rounded-xl text-white font-medium`}
		>
			{content}
		</div>
	);
};

const Chat = ({ chatId, pgpDecrpyptedPvtKey, chats }: ChatDetails) => {
	const address = useAddress();
	const _signer = useSigner();

	const chatContainer = React.useRef<HTMLDivElement>(null);
	const sendButtonRef = React.useRef<HTMLButtonElement>(null);

	const [message, setMessage] = React.useState<string>('');
	const [isSending, setIsSending] = React.useState<boolean>(false);

	// Scroll to bottom on new message
	const Scroll = () => {
		const { offsetHeight, scrollHeight, scrollTop } =
			chatContainer.current as HTMLDivElement;
		if (scrollHeight <= scrollTop + offsetHeight + 100) {
			chatContainer.current?.scrollTo(0, scrollHeight);
		}
	};

	React.useEffect(() => {
		Scroll();
	}, [chats]);

	// Enter Key Event Listener
	React.useEffect(() => {
		const textarea = document.getElementById('textarea');
		textarea?.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				sendButtonRef.current?.click();
				textarea.focus();
			}
		});
	}, []);

	const handleSendMessage = async () => {
		try {
			setIsSending(true);
			const response = await PushAPI.chat.send({
				messageContent: message,
				messageType: 'Text',
				receiverAddress: chatId!,
				signer: _signer,
				pgpPrivateKey: pgpDecrpyptedPvtKey,
				env: ENV.PROD,
			});
			setMessage('');
		} catch (error) {
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className=' w-full flex flex-col justify-end items-center rounded-3xl bg-[#0e0f0f] shadow-2xl pb-8 px-4'>
			<div
				ref={chatContainer}
				className='flex flex-col gap-2 w-full overflow-scroll no-scrollbar pr-12 mb-4'
			>
				{chats?.map((chat, index) => (
					<ChatPill
						key={index}
						content={chat.messageContent}
						sender={chat.from === address ? 'me' : 'other'}
					/>
				))}
			</div>
			<div>
				<div className='flex flex-row gap-4'>
					<Textarea
						id='textarea'
						placeholder='Type your message...'
						aria-label='Type your message...'
						minRows={3}
						size='lg'
						bordered
						color='primary'
						className='min-w-[400px]'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<Button
						ref={sendButtonRef}
						auto
						icon={
							!isSending && (
								<div className='ml-[3px]'>
									<Send set='bold' primaryColor='#fff' />
								</div>
							)
						}
						className='bg-[#0072F5] px-2'
						disabled={isSending}
						onPress={() => handleSendMessage()}
					>
						{isSending && <Loading color='white' size='sm' />}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
