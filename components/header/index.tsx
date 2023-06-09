import React from 'react';

import { Button } from '@nextui-org/react';
import { Plus } from 'react-iconly';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	return (
		<div
			className={`${inter.className} flex flex-row justify-between items-center p-12 px-16`}
		>
			<div className='flex flex-col gap-4 leading-5'>
				<span className='text-3xl font-bold'>Hi Vedant👋</span>
				<span>Let&lsquo;s get started for today!</span>
			</div>
			<div>
				<Button
					icon={<Plus set='bold' />}
					color='primary'
					className='bg-[#0072F5] tet-white w-fit'
					size='lg'
					auto
				>
					CREATE MEETING
				</Button>
			</div>
		</div>
	);
};

export default Header;
