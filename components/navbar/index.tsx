import { Navbar } from '@nextui-org/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import Link from 'next/link';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const NavBar = () => {
	const collapseItems = [
		'Home',
		'Create Meeting',
		'Join Meeting',
		'Dashboard',
		'Logout',
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
				</Navbar.Content>
				<Navbar.Collapse>
					{collapseItems.map((item, index) => (
						<Navbar.CollapseItem
							key={item}
							css={{
								color: index === collapseItems.length - 1 ? '$error' : '',
							}}
						>
							<Link color='inherit' href='#'>
								{item}
							</Link>
						</Navbar.CollapseItem>
					))}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default NavBar;
