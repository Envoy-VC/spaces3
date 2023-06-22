import { Sidebar, NavBar, SEO } from '@/components';
import { Dashboard } from '@/sections';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className={`${inter.className}`}>
			<SEO />
			<NavBar />
			<div className='flex flex-row justify-start'>
				<Sidebar />
				<Dashboard />
			</div>
		</main>
	);
}
