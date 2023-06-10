import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import { Dropdown, Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { Tabs } from '../sidebar';

type TabTypes = Tabs | 'logout';

const CustomConnectButton = () => {
	const address = useAddress();
	const disconnect = useDisconnect();
	const router = useRouter();
	const handleAction = (key: TabTypes) => {
		if (key === 'logout') {
			disconnect();
		} else if (key === 'home') router.push('/');
		else router.push(`/${key}`);
	};
	return (
		<div>
			{!address ? (
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
			) : (
				<Dropdown placement='bottom-right'>
					<Dropdown.Trigger>
						<Avatar
							bordered
							as='button'
							color='secondary'
							size='lg'
							src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
						/>
					</Dropdown.Trigger>
					<Dropdown.Menu
						aria-label='User menu actions'
						color='primary'
						onAction={(actionKey) => handleAction(actionKey as TabTypes)}
					>
						<Dropdown.Item key='home'>Home</Dropdown.Item>
						<Dropdown.Item key='join'>Join Meeting</Dropdown.Item>
						<Dropdown.Item key='create'>Create Meeting</Dropdown.Item>
						<Dropdown.Item key='dashboard'>Dashboard</Dropdown.Item>
						<Dropdown.Item key='logout' withDivider color='error'>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</div>
	);
};

export default CustomConnectButton;
