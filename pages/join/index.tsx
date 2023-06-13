import React from 'react';

import { useRouter } from 'next/router';
import { useLobby } from '@huddle01/react/hooks';
import { useAddress } from '@thirdweb-dev/react';
import toast, { Toaster } from 'react-hot-toast';

import { getJoinRoomToken } from '@/services/utils';

import { Input, Button } from '@nextui-org/react';
import { ArrowRight } from 'react-iconly';
import { Sidebar, NavBar } from '@/components';
import { Header } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Join = () => {
	const address = useAddress();
	const router = useRouter();
	const { meetingId: meetingIdQuery } = router?.query;

	const [meetingId, setMeetingId] = React.useState<string>(
		meetingIdQuery as string
	);

	const { joinLobby } = useLobby();

	const handleJoinMeeting = async () => {
		if (!meetingId) {
			toast.error('Meeting ID cannot be empty');
			return;
		} else if (!address) {
			toast.error('Please connect your wallet');
			return;
		} else {
			const res: any = await getJoinRoomToken({
				address: address,
				meetingId: meetingId,
			});
			joinLobby(meetingId, res?.token);
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

					<div className='flex flex-col gap-8 items-center mt-16'>
						<Input
							aria-label='Meeting ID'
							placeholder='Meeting ID'
							initialValue={meetingIdQuery as string}
							size='xl'
							clearable
							className='mt-4 max-w-[450px]'
							onChange={(e) => setMeetingId(e.target.value)}
						/>
						<Button
							auto
							light
							iconRight={
								<ArrowRight set='bold' primaryColor='#fff' size={32} />
							}
							size='lg'
							disabled={!joinLobby.isCallable}
							className='bg-[#0072F5] text-white mt-4 !w-fit'
							onPress={() => handleJoinMeeting()}
						>
							Join
						</Button>
					</div>
				</div>
				<Toaster position='bottom-left' />
			</div>
		</main>
	);
};

export default Join;
