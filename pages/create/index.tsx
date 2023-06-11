import { Sidebar, NavBar, CreateForm } from '@/components';
import Header from '@/components/layout/headers/create-meeting';

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
					<CreateForm />
				</div>
			</div>
		</main>
	);
};

export default Create;
