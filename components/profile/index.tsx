import React from 'react';
import { Input, Textarea, Avatar, Button } from '@nextui-org/react';
import { Edit, Upload } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Profile = () => {
	return (
		<div className={`${inter.className} max-w-screen-lg py-12 px-16 mx-auto`}>
			<div className='text-4xl font-bold mb-16 text-center'>Profile</div>
			<div className='flex flex-col xl:flex-row w-full justify-start items-center gap-24'>
				<div className='flex flex-col gap-6'>
					<Input
						label='Display Name'
						placeholder='Richard Hendricks'
						required
						size='xl'
						clearable
						className='mt-4 min-w-[400px]'
					/>
					<Textarea
						label='About me'
						placeholder={`Hi, I'm Richard Hendricks, the founder and CEO of Pied Piper, a revolutionary video conferencing platform.`}
						minRows={5}
						maxRows={10}
						size='xl'
						className='mt-4 max-w-[600px]'
					/>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<Avatar
						src='https://nextui.org/images/card-example-3.jpeg'
						className='w-60 h-60 rounded-full mb-4'
						alt='Profile Picture'
						color='primary'
						bordered
					/>
					<Button
						color='gradient'
						icon={<Upload set='bold' primaryColor='#fff' size={22} />}
						className='bg-[#0072F5] text-white mt-4 !max-w-[200px]'
						auto
					>
						{' '}
						<input type='file' className='max-w-[200px]' placeholder='' />
					</Button>
				</div>
			</div>
			<div className='flex w-full justify-start my-16'>
				<Button
					auto
					light
					icon={<Edit set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					color='secondary'
					className='bg-[#9750DD] text-white mt-4 !w-fit'
				>
					Update
				</Button>
			</div>
		</div>
	);
};

export default Profile;
