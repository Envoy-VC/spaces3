import { Sidebar, NavBar, CreateForm } from '@/components';
import { Header } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Create = () => {
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row'>
				<Sidebar />
				<div className='w-full'>
					<Header
						headline='Create Meeting 🎥'
						tagline='Secure, private, and decentralized'
					/>
					<CreateForm />
				</div>
			</div>
		</main>
	);
};

export default Create;
