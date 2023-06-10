import React from 'react';
import { Avatar, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { Home, Logout, Video, Setting, Plus } from 'react-iconly';

const Sidebar = () => {
	const [activeTab, setActiveTab] = React.useState<
		'home' | 'create' | 'join' | 'dashboard'
	>('home');

	const router = useRouter();

	const handleClick = (tab: 'home' | 'create' | 'join' | 'dashboard') => {
		setActiveTab(tab);
		router.push(tab === 'home' ? '/' : `/${tab}`);
	};

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
					<Button
						auto
						light
						onPress={() => handleClick('home')}
						icon={
							<Home
								set='bold'
								primaryColor={activeTab === 'home' ? '#0072F5' : '#E0E1E2'}
								size={32}
							/>
						}
					/>
					<Button
						auto
						light
						onPress={() => handleClick('join')}
						icon={
							<Plus
								set='bold'
								primaryColor={activeTab === 'join' ? '#0072F5' : '#E0E1E2'}
								size={32}
							/>
						}
					/>
					<Button
						auto
						light
						onPress={() => handleClick('create')}
						icon={
							<Video
								set='bold'
								primaryColor={activeTab === 'create' ? '#0072F5' : '#E0E1E2'}
								size={32}
							/>
						}
					/>
					<Button
						auto
						light
						onPress={() => handleClick('dashboard')}
						icon={
							<Setting
								set='bold'
								primaryColor={activeTab === 'dashboard' ? '#0072F5' : '#E0E1E2'}
								size={32}
							/>
						}
					/>
				</div>
			</div>
			<div className='my-8'>
				<Logout set='bold' primaryColor='#F31260' size={32} />
			</div>
		</div>
	);
};

export default Sidebar;
