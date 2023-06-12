import React from 'react';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Plus } from 'react-iconly';
import CustomConnectButton from '../custom-connect';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	const router = useRouter();
	return (
		<div
			className={`${inter.className} flex flex-col sm:flex-row justify-between items-center p-12 px-16`}
		>
			<div className='flex flex-col gap-4 leading-5'>
				<span className='text-3xl font-bold'>Hi Vedant👋</span>
				<span>Let&lsquo;s get started for today!</span>
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
