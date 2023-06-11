import { Sidebar, NavBar, Profile } from '@/components';
import Header from '@/components/layout/headers/dashboard';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Dashboard = () => {
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-between'>
				<Sidebar />
				<div className='w-full'>
					<Header />
					<Profile />
				</div>
			</div>
		</main>
	);
};

export default Dashboard;
