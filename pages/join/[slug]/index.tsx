import React from 'react';
import { Sidebar, NavBar } from '@/components';
import { useRouter } from 'next/router';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Join = () => {
	const router = useRouter();
	const slug = router.query.slug;
	return (
		<main className={`${inter.className}`}>
			<NavBar />
			<div className='flex flex-row justify-start'>
				<Sidebar />
				{slug}
			</div>
		</main>
	);
};

export default Join;
