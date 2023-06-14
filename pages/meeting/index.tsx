import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { MeetingHeader, MeetingControls } from '@/components';
import { UserMeetingCard } from '@/components/cards';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Meeting = () => {
	const peers = new Array(5).fill(1);
	return (
		<main className={`${inter.className} mb-12 xl:mb-0`}>
			<MeetingHeader />
			<div className='max-w-[90vw] w-full mx-auto flex flex-row h-[75dvh]'>
				<div className='basis-[100%] xl:basis-2/3 overflow-scroll border-2 no-scrollbar'>
					<div className='flex flex-row flex-wrap justify-evenly gap-8'>
						{peers.map((peer, index) => (
							<UserMeetingCard key={index} />
						))}
					</div>
				</div>
				<div className='hidden xl:flex xl:basis-1/3 border-2'>Chat</div>
			</div>
			<div className='max-w-screen-sm w-full mx-auto mt-8 p-4'>
				<MeetingControls />
			</div>
			<Toaster position='bottom-left' />
		</main>
	);
};

export default Meeting;
