import React from 'react';
import { useRouter } from 'next/router';
import { useAddress } from '@thirdweb-dev/react';
import { useHuddle01 } from '@huddle01/react';

import { Input, Button } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';
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

	const handleJoinMeeting = async () => {
		if (!meetingId) {
			toast.error('Meeting ID cannot be empty');
			return;
		} else if (!address) {
			toast.error('Please connect your wallet');
			return;
		} else {
			router.push(`/lobby/${meetingId}`);
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
					<div className='flex flex-col md:flex-row w-fit mx-auto mt-16'>
						<Input
							aria-label='Meeting ID'
							label='Meeting ID'
							placeholder='Enter Meeting ID'
							initialValue={meetingIdQuery as string}
							size='xl'
							clearable
							className='mt-2 min-w-[400px]'
							onChange={(e) => setMeetingId(e.target.value)}
						/>
						<Button
							auto
							light
							iconRight={
								<ArrowRight set='bold' primaryColor='#fff' size={32} />
							}
							size='lg'
							className='bg-[#0072F5] text-white !w-fit mt-[44px] mx-0 md:mx-4'
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
