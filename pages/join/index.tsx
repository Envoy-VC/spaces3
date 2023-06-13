import React from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import { Input, Button } from '@nextui-org/react';
import { ArrowRight } from 'react-iconly';
import { Sidebar, NavBar } from '@/components';
import Header from '@/components/layout/headers/join-meeting';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Join = () => {
	const router = useRouter();
	const { meetingId: meetingIdQuery } = router?.query;
	const [meetingId, setMeetingId] = React.useState<string>(
		meetingIdQuery as string
	);

	const handleJoinMeeting = () => {
		if (!meetingId) {
			toast.error('Meeting ID cannot be empty');
			return;
		}
		router.push(`/join/${meetingId}`);
	};
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-start'>
				<Sidebar />
				<div className='w-full'>
					<Header />
					<div className='flex flex-col gap-8 items-center mt-16'>
						<Input
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
