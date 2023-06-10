import { Sidebar, NavBar } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Dashboard = () => {
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-between'>
				<Sidebar />
			</div>
		</main>
	);
};

export default Dashboard;
