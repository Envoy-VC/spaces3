import React from 'react';
import { Avatar } from '@nextui-org/react';

import { Home, Logout, Video, Setting, Plus } from 'react-iconly';

const Sidebar = () => {
	return (
		<div className='hidden xl:flex flex-col h-screen !w-[88px] justify-between items-center border-r border-gray-600'>
			<div className='flex flex-col items-center w-full'>
				<Avatar
					size='lg'
					src='https://i.pravatar.cc/150?u=a042581f4e25056704b'
					color='gradient'
					bordered
					squared
					className='my-8 mx-8'
				/>
				<div className='border-[1px] border-gray-600 w-full' />
				<div className='flex flex-col items-center gap-8 mt-8'>
					<Home set='bold' primaryColor='#E0E1E2' size={32} />
					<Plus set='bold' primaryColor='#0072F5' size={32} />
					<Video set='bold' primaryColor='#E0E1E2' size={32} />
					<Setting set='bold' primaryColor='#E0E1E2' size={32} />
				</div>
			</div>
			<div className='my-8'>
				<Logout set='bold' primaryColor='#E0E1E2' size={32} />
			</div>
		</div>
	);
};

export default Sidebar;
