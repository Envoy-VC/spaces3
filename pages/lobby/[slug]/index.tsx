import React from 'react';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import { useLobby, useAudio } from '@huddle01/react/hooks';
import { toast, Toaster } from 'react-hot-toast';

import { Button, Loading } from '@nextui-org/react';
import { People } from 'react-iconly';
import { LobbyCard } from '@/components/cards';
import { Sidebar, NavBar, LobbyControls } from '@/components';
import { Header } from '@/components';

import { Inter } from 'next/font/google';
import { getJoinRoomToken } from '@/services/utils';
const inter = Inter({ subsets: ['latin'] });

const Lobby = () => {
	const router = useRouter();
	const address = useAddress();
	const { joinLobby, isLoading, isLobbyJoined } = useLobby();
	const { stream: AudioStream } = useAudio();
	const meetingId = router?.query.slug as string;

	React.useEffect(() => {
		async function joinMeetingLobby() {
			const res = await getJoinRoomToken({
				meetingId: meetingId,
				address: address!,
			});
			await joinLobby(meetingId, res?.token);
		}
		if (meetingId) {
			joinMeetingLobby();
		}
	}, [meetingId]);

	const handleJoinRoom = () => {
		if (!AudioStream?.getAudioTracks().at(0)?.enabled) {
			toast.error('Please enable audio device');
		} else {
			router.push(`/meeting/${meetingId}`);
		}
	};

	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-start'>
				<Sidebar />
				<div className='w-full'>
					<Header
						headline='Join Meeting 🎥'
						tagline='Secure, private, and decentralized'
					/>
					{isLobbyJoined && (
						<div className='w-fit flex flex-col mx-auto'>
							<LobbyCard />
							<div className='flex flex-col gap-8 lg:flex-row justify-evenly items-center mt-8'>
								<LobbyControls />
								<Button
									auto
									size='xl'
									icon={<People set='bold' primaryColor='#fff' size={32} />}
									className='bg-[#0072F5]'
									onPress={() => handleJoinRoom()}
								>
									Enter Room
								</Button>
							</div>
						</div>
					)}
					{(isLoading || !isLobbyJoined) && (
						<div className=' w-fit mx-auto mt-60'>
							<Loading size='xl' />
						</div>
					)}
				</div>
				<Toaster position='bottom-left' />
			</div>
		</main>
	);
};

export default Lobby;
