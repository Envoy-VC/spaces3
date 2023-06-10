import { Navbar } from '@nextui-org/react';
import CustomConnectButton from '../custom-connect';
import Link from 'next/link';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const NavBar = () => {
	const tabs = [
		{
			name: 'Home',
			link: '/',
		},
		{
			name: 'Join Meeting',
			link: '/join',
		},
		{
			name: 'Create Meeting',
			link: '/create',
		},
		{
			name: 'Dashboard',
			link: '/dashboard',
		},
	];
	return (
		<div className='flex xl:hidden'>
			<Navbar isBordered variant='sticky'>
				<Navbar.Brand>
					<Navbar.Toggle aria-label='toggle navigation' />
					<p className={`${inter.className} text-xl font-semibold ml-4`}>
						SPACES3
					</p>
				</Navbar.Brand>
				<Navbar.Content>
					<CustomConnectButton />
				</Navbar.Content>
				<Navbar.Collapse>
					{tabs.map((item, index) => (
						<Navbar.CollapseItem key={index}>
							<Link color='inherit' href={item.link}>
								{item.name}
							</Link>
						</Navbar.CollapseItem>
					))}
					<Navbar.CollapseItem
						css={{
							color: '$error',
						}}
					>
						Logout
					</Navbar.CollapseItem>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
