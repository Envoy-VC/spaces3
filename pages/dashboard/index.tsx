import { useAddress } from '@thirdweb-dev/react';

import { Sidebar, NavBar, Profile } from '@/components';
import { Header } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Dashboard = () => {
	const address = useAddress();
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-between'>
				<Sidebar />
				<div className='w-full'>
					<Header
						headline='Edit Profile 👤'
						tagline='Personalize your virtual presence'
					/>
					{address ? (
						<Profile />
					) : (
						<div className='text-xl font-bold p-12 px-16'>
							Connect Wallet to Customize Profile
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
