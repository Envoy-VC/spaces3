import { Sidebar, NavBar } from '@/components';
import { Header } from '@/components/layout/headers';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Create = () => {
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row'>
				<Sidebar />
				<div className='w-full'>
					<Header />
				</div>
			</div>
		</main>
	);
};

export default Create;
