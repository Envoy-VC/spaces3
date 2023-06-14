import React from 'react';
import { Avatar, Card, Image } from '@nextui-org/react';
import { useAddress } from '@thirdweb-dev/react';
import { getProfile } from '@/services/graphql';

type ProfileProps = {
	address?: string;
	displayName?: string;
	about?: string;
	avatar?: string;
};

const LobbyCard = () => {
	const address = useAddress();
	const [profile, setProfile] = React.useState<ProfileProps>({});

	// Get Profile Details
	React.useEffect(() => {
		async function getUserDetails() {
			const res = await getProfile(address!);
			setProfile(res);
		}
		getUserDetails();
	}, []);
	return (
		<Card
			css={{
				mw: '640px',
				minWidth: '320px',
				background: 'Black',
				padding: '0px',
				borderRadius: '24px',
			}}
			className='border-gray-800 border-2 outline-none meeting-card h-[24em] !w-[320px] lg:!w-[640px]'
		>
			<Card.Body css={{ p: '0px', m: '0px' }} className='overflow-hidden'>
				<Image
					src={
						profile.avatar ||
						'https://geekculture.co/wp-content/uploads/2018/03/silicon-valley-s5-intro-feature.jpg'
					}
					alt='Profile Image'
					className='absolute !w-full !h-full object-cover scale-[130%] overflow-hidden blur-sm saturate-150'
				/>
				<Avatar
					src={profile?.avatar}
					className='mx-auto top-[20%] w-60 h-60 rounded-full mb-4 backdrop-blur-sm opacity-80'
					text={profile?.displayName || profile?.address}
					textColor='white'
					color='gradient'
					alt='Profile Picture'
					
					bordered
				/>
			</Card.Body>
		</Card>
	);
};

export default LobbyCard;
