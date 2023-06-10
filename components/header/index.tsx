import React from 'react';

import { Button } from '@nextui-org/react';
import { Plus } from 'react-iconly';
import { ConnectWallet } from '@thirdweb-dev/react';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Header = () => {
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
				>
					CREATE MEETING
				</Button>
				<ConnectWallet
					btnTitle='CONNECT WALLET'
					theme='dark'
					className='!w-[200px] !rounded-xl'
					style={{
						backgroundColor: '#000',
						color: '#0072f5',
						border: '3px solid #0072f5',
					}}
				/>
			</div>
		</div>
	);
};

export default Header;
