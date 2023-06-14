import React from 'react';
import { Image } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

import { UserMeetingCard } from '@/components/cards';
import logo from '@/public/logo.png';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Meeting = () => {
	const peers = new Array(5).fill(1);
	return (
		<main className={`${inter.className}`}>
			<div className='w-full p-8 px-12 flex flex-row justify-start items-center'>
				<div>
					<Image src={logo.src} alt='SPACES3 Logo' width={24} height={24} />
				</div>
				<div className='font-bold text-xl mx-2'>SPACES3</div>
			</div>
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
			<div className='max-w-screen-sm w-full mx-auto mt-8 p-4 border-2'>
				controls
			</div>
			<Toaster position='bottom-left' />
		</main>
	);
};

export default Meeting;
