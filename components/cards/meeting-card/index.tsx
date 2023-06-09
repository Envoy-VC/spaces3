import { Card, Avatar, Button } from '@nextui-org/react';
import { ArrowRight } from 'react-iconly';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const MeetingCard = () => {
	const pictureUsers = [
		'https://i.pravatar.cc/150?u=a042581f4e29026024d',
		'https://i.pravatar.cc/150?u=a042581f4e29026704d',
		'https://i.pravatar.cc/150?u=a04258114e29026702d',
		'https://i.pravatar.cc/150?u=a04258114e29026702d',
	];
	return (
		<Card
			css={{
				mw: '526px',
				background: 'Black',
				padding: '16px',
				borderRadius: '24px',
			}}
			className='border-gray-800 border-2 outline-none meeting-card'
		>
			<Card.Header>
				<div className='flex justify-start items-center'>
					<Avatar
						src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
						bordered
						color='primary'
						size='lg'
					/>
					<div
						className={`${inter.className} flex flex-col text-md ml-2 justify-start`}
					>
						<div className='font-semibold'>Vedant Chainani</div>
						<div className='text-[#bdbdbd]'>Organizer</div>
					</div>
				</div>
			</Card.Header>
			<Card.Body>
				<div className={`${inter.className} flex flex-col justify-start gap-2`}>
					<div className='text-lg font-bold'>
						Special Guest: Marty Cagon. The Delivery Managing Girl
					</div>
					<div className='text-sm font-regular'>14 Participants</div>
				</div>
			</Card.Body>
			<Card.Footer className='w-full flex flex-row justify-between'>
				<Button
					light
					color='primary'
					auto
					iconRight={<ArrowRight set='bold' primaryColor='#0072F5' />}
					className='text-md text-semibold'
				>
					Join Meeting
				</Button>
				<Avatar.Group count={12}>
					{pictureUsers.map((url, index) => (
						<Avatar
							key={index}
							size='md'
							pointer
							src={url}
							bordered
							color='gradient'
							stacked
						/>
					))}
				</Avatar.Group>
			</Card.Footer>
		</Card>
	);
};

export default MeetingCard;
