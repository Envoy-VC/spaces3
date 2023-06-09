import { Sidebar, NavBar } from '@/components';

import { Dashboard } from '@/sections';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-between'>
				<Sidebar />
				<Dashboard />
			</div>
		</main>
	);
}
