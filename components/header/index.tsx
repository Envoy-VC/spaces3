import React from 'react';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Plus } from 'react-iconly';
import { useAddress } from '@thirdweb-dev/react';
import CustomConnectButton from '../custom-connect';
import { getProfile } from '@/services/graphql';

import { ProfileProps } from '../profile';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

interface Props {
	headline: string;
	tagline: string;
	isDashboard?: boolean;
}

const Header = ({ headline, tagline, isDashboard }: Props) => {
	const router = useRouter();
	const address = useAddress();
	const [userDetails, setUserDetails] = React.useState<ProfileProps>({});

	React.useEffect(() => {
		async function fetchProfile() {
			if (address) {
				const profile = await getProfile(address);
				console.log(profile);
				setUserDetails(profile);
			}
		}
		if (isDashboard) {
			fetchProfile();
		}
	}, [address]);

	return (
		<div
			className={`${inter.className} flex flex-col sm:flex-row justify-between items-center p-12 px-16`}
		>
			<div className='flex flex-col gap-4 leading-5'>
				<span className='text-3xl font-bold'>
					{!isDashboard
						? headline
						: `Hi ${userDetails.displayName || ''} 👋
`}
				</span>
				<span>{tagline}</span>
			</div>
			<div className='hidden xl:flex flex-row gap-4'>
				<Button
					icon={<Plus set='bold' />}
					color='primary'
					className='bg-[#0072F5]'
					size='lg'
					auto
					onPress={() => router.push('/create')}
				>
					CREATE MEETING
				</Button>
				<CustomConnectButton />
			</div>
		</div>
	);
};

export default Header;
