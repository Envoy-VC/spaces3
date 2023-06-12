import React from 'react';
import { Card, Avatar, Button } from '@nextui-org/react';
import { ArrowRight, Notification } from 'react-iconly';
import { useAddress } from '@thirdweb-dev/react';
import toast, { Toaster } from 'react-hot-toast';

import { MeetingDetails } from '@/sections/dashboard';
import { checkReminderExists, updateReminder } from '@/services/graphql';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const MeetingCard = ({
	meetingId,
	meetingTitle,
	host,
	participants,
}: MeetingDetails) => {
	const address = useAddress();
	const [reminderExists, setReminderExists] = React.useState<boolean>(false);

	// Fetch if Reminder Exists
	React.useEffect(() => {
		async function fetchReminder() {
			if (address) {
				const exists: any = checkReminderExists(address, meetingId);
				setReminderExists(exists);
			}
		}
		fetchReminder();
	}, []);

	// Update Reminder
	const handleUpdateReminder = async () => {
		if (address) {
			const updatedReminder = await updateReminder(meetingId, address);
			setReminderExists(!reminderExists);
			toast.success('Reminder Updated');
		} else {
			toast.error('Please Connect Wallet');
		}
	};

	return (
		<div>
			<Card
				css={{
					mw: '526px',
					minWidth: '526px',
					background: 'Black',
					padding: '16px',
					borderRadius: '24px',
				}}
				className='border-gray-800 border-2 outline-none meeting-card'
			>
				<Card.Header>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-row'>
							<Avatar
								src={
									host.avatar ||
									'https://i.pravatar.cc/150?u=a042581f4e29026704d'
								}
								bordered
								color='primary'
								size='lg'
							/>
							<div
								className={`${inter.className} flex flex-col text-md ml-2 justify-start`}
							>
								<div className='font-semibold'>{host.name}</div>
								<div className='text-[#bdbdbd]'>Organizer</div>
							</div>
						</div>
						<Button
							light
							auto
							className='w-fit'
							icon={
								!reminderExists ? (
									<Notification set='light' primaryColor='#fff' size={32} />
								) : (
									<Notification set='bold' primaryColor='#fff' size={32} />
								)
							}
							onPress={() => handleUpdateReminder()}
						></Button>
					</div>
				</Card.Header>
				<Card.Body>
					<div
						className={`${inter.className} flex flex-col justify-start gap-2`}
					>
						<div className='text-lg font-bold'>{meetingTitle}</div>
						<div className='text-sm font-regular'>
							{participants.length} Participants
						</div>
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
					<Avatar.Group
						count={
							participants.length > 4
								? participants.length - 4
								: participants.length
						}
					>
						{participants.length > 4 ? (
							<div className='flex flex-row '>
								{participants.slice(4).map((participant, index) => (
									<Avatar
										key={index}
										size='lg'
										pointer
										text={participant.displayName || participant.address}
										src={participant.avatar}
										bordered
										color='gradient'
										stacked
									/>
								))}
							</div>
						) : (
							<div className='flex flex-row'>
								{participants.map((participant, index) => (
									<Avatar
										key={index}
										size='lg'
										pointer
										text={participant.displayName || participant.address}
										src={participant.avatar}
										bordered
										color='gradient'
										stacked
									/>
								))}
							</div>
						)}
					</Avatar.Group>
				</Card.Footer>
			</Card>
			<Toaster position='bottom-left' />
		</div>
	);
};

export default MeetingCard;
