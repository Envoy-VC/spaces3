import React from 'react';
import { Avatar, Button, Tooltip } from '@nextui-org/react';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { useRouter } from 'next/navigation';

import { Home, Logout, Video, Setting, Plus } from 'react-iconly';

import Logo from '@/public/logo.png';

export type Tabs = 'home' | 'create' | 'join' | 'dashboard';

const Sidebar = () => {
	const router = useRouter();
	const address = useAddress();
	const disconnect = useDisconnect();

	const tabs = [
		{
			name: 'home',
			content: 'Home',
			icon: <Home set='bold' primaryColor='#E0E1E2' size={32} />,
			link: '/',
		},
		{
			name: 'join',
			content: 'Join Meeting',
			icon: <Plus set='bold' primaryColor='#E0E1E2' size={32} />,
			link: '/join',
		},
		{
			name: 'create',
			content: 'Create Meetings',
			icon: <Video set='bold' primaryColor='#E0E1E2' size={32} />,
			link: '/create',
		},
		{
			name: 'dashboard',
			content: 'Dashboard',
			icon: <Setting set='bold' primaryColor='#E0E1E2' size={32} />,
			link: '/dashboard',
		},
	];

	const handleClick = (tab: Tabs) => {
		router.push(tab === 'home' ? '/' : `/${tab}`);
	};

	return (
		<div className='hidden xl:flex flex-col h-screen !w-[88px] justify-between items-center border-r border-gray-600'>
			<div className='flex flex-col items-center w-full'>
				<Avatar
					size='lg'
					src={Logo.src}
					color='primary'
					bordered
					squared
					className='my-8 mx-8'
				/>
				<div className='border-[1px] border-gray-600 w-full' />
				<div className='flex flex-col items-center gap-8 mt-8'>
					{tabs.map((tab, index) => (
						<Tooltip
							key={index}
							color='primary'
							content={tab.content}
							placement='right'
						>
							<Button
								auto
								light
								onPress={() => handleClick(tab.name as Tabs)}
								icon={tab.icon}
							/>
						</Tooltip>
					))}
				</div>
			</div>
			<div className='my-8'>
				<Tooltip color='error' content='Disconnect' placement='right'>
					<Button
						auto
						light
						onPress={disconnect}
						disabled={!address}
						icon={<Logout set='bold' primaryColor='#F31260' size={32} />}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default Sidebar;
