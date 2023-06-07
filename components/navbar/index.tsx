import { useState } from 'react';

import { Navbar } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';

import { useTheme } from '@nextui-org/react';

import { ThemeSwitcher } from '@/components';
import { ActiveTab } from '@/types';

const NavBar = () => {
	const { isDark } = useTheme();
	const [activeTab, setActiveTab] = useState<ActiveTab>('home');
	return (
		<Navbar variant='sticky'>
			<Navbar.Brand>
				<p className='hidden sm:flex text-xl font-bold'>thirdweb starter</p>
			</Navbar.Brand>
			<Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
				<Navbar.Link
					isActive={activeTab === 'home'}
					onPress={() => setActiveTab('home')}
				>
					Home
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'features'}
					onPress={() => setActiveTab('features')}
				>
					Features
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'about'}
					onPress={() => setActiveTab('about')}
				>
					About
				</Navbar.Link>
				<Navbar.Link
					isActive={activeTab === 'contact'}
					onPress={() => setActiveTab('contact')}
				>
					Contact
				</Navbar.Link>
			</Navbar.Content>
			<Navbar.Content>
				<Navbar.Item>
					<ThemeSwitcher />
				</Navbar.Item>
				<ConnectWallet
					theme={isDark ? 'dark' : 'light'}
					className='!bg-[#2e77ff] dark:!text-white'
				/>
			</Navbar.Content>
		</Navbar>
	);
};

export default NavBar;
