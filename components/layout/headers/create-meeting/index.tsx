import React from 'react';

import { Button } from '@nextui-org/react';
import { Plus } from 'react-iconly';
import CustomConnectButton from '@/components/custom-connect';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	return (
		<div
			className={`${inter.className} flex flex-col sm:flex-row justify-between items-center p-12 px-16`}
		>
			<div className='flex flex-col gap-4 leading-5'>
				<span className='text-3xl font-bold'>Create Meeting 🎥</span>
				<span>Secure, private, and decentralized</span>
			</div>
			<div className='hidden xl:flex flex-row gap-4'>
				<CustomConnectButton />
			</div>
		</div>
	);
};

export default Header;
