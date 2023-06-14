import React from 'react';
import { Card, Avatar, Image } from '@nextui-org/react';
import { Voice, VoiceMute } from '@/components/icons';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const UserMeetingCard = () => {
	return (
		<Card
			css={{
				mw: '320px',
				background: 'Black',
				padding: '0px',
				borderRadius: '24px',
			}}
			className='border-gray-800 border-2 outline-none meeting-card w-64 h-64 xl:h-[20em] xl:w-[20em]'
		>
			<Card.Body
				css={{ p: '0px', m: '0px' }}
				className={`${inter.className} overflow-hidden`}
			>
				<Image
					src={
						'https://geekculture.co/wp-content/uploads/2018/03/silicon-valley-s5-intro-feature.jpg'
					}
					alt='Profile Image'
					className='absolute !w-full !h-full object-cover scale-[180%] overflow-hidden blur-sm saturate-150 contrast-125'
				/>
				<div className='relative flex flex-col justify-evenly h-full p-4'>
					<div className='text-lg font-semibold'>Richie</div>
					<div className=''>
						<Avatar
							src='https://ipfs.io/ipfs/QmYrU5XFRiYtWeTtvFDeZjzTSV3crEg4aeRYGKW1ip9Nh2'
							className='mx-auto w-36 h-36 xl:w-48 xl:h-48 rounded-full mb-4 backdrop-blur-sm opacity-80'
							text='Hello'
							textColor='white'
                            color='gradient'
                            borderWeight='bold'
							alt='Profile Picture'
							bordered
						/>
					</div>
					<div>
						<Voice />
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default UserMeetingCard;
