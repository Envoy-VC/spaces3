import React from 'react';
import { Card, Avatar, Image } from '@nextui-org/react';
import { getProfileByPeerId } from '@/services/graphql';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface UserMeetingCardProps {
	peerId: string;
	mic?: MediaStreamTrack;
}

type ProfileProps = {
	displayName?: string;
	avatar?: string;
};

const UserMeetingCard = ({ peerId, mic }: UserMeetingCardProps) => {
	const [profile, setProfile] = React.useState<ProfileProps>({});
	// Get User Profile
	React.useEffect(() => {
		async function getProfile() {
			const profile = await getProfileByPeerId(peerId);
			console.log(profile);
			if (profile) {
				setProfile(profile);
			}
		}
		getProfile();
	}, []);

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
						profile?.avatar ||
						'https://geekculture.co/wp-content/uploads/2018/03/silicon-valley-s5-intro-feature.jpg'
					}
					alt='Profile Image'
					className='absolute !w-full !h-full object-cover scale-[180%] overflow-hidden blur-sm saturate-150 contrast-125'
				/>
				<div className='relative flex flex-col justify-evenly h-full p-4'>
					<div className='text-lg font-semibold'>
						{profile?.displayName || ''}
					</div>
					<div className=''>
						<Avatar
							src={profile.avatar || ''}
							className='mx-auto w-36 h-36 xl:w-48 xl:h-48 rounded-full mb-4 backdrop-blur-sm opacity-80'
							text={profile.displayName}
							textColor='white'
							color='gradient'
							borderWeight='bold'
							alt='Profile Picture'
							bordered
						/>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default UserMeetingCard;
