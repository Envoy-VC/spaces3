import React from 'react';
import { Header } from '@/components';
import { MeetingCard } from '@/components/cards';
import { getCurrentMeetings, getProfile } from '@/services/graphql';
import { getMeetingDetails } from '@/services/utils';

export type Participant = {
	address: string;
	displayName: string;
	avatar: string;
};

export type MeetingDetails = {
	meetingId: string;
	meetingTitle: string;
	host: {
		address: string;
		name: string;
		displayName: string;
		avatar: string;
	};
	participants: Participant[];
};

const Dashboard = () => {
	const [meetings, setMeetings] = React.useState<MeetingDetails[]>([]);

	// Initial Page Load Data
	React.useEffect(() => {
		async function fetchMeetings() {
			let meetingDetails: MeetingDetails[] = [];
			const meetings = await getCurrentMeetings();
			for await (const meeting of meetings) {
				const details: any = await getMeetingDetails(meeting?.meetingId);
				console.log(details);
				const hostDetails: any = await getProfile(
					details?.hostWalletAddress?.at(0)
				);
				const meetingData: MeetingDetails = {
					meetingId: meeting?.meetingId,
					meetingTitle: details?.title,
					host: {
						address: hostDetails?.address,
						name: meeting?.host,
						displayName: hostDetails?.displayName,
						avatar: hostDetails?.avatar,
					},
					participants: meeting?.profiles,
				};
				meetingDetails.push(meetingData);
			}
			setMeetings(meetingDetails);
		}
		fetchMeetings();
	}, []);

	return (
		<div className='grow'>
			<Header
				headline='Hi Vedant👋'
				tagline='Let&lsquo;s get started for today!'
				isDashboard
			/>
			<div className='flex flex-row w-fit flex-wrap justify-start gap-8 px-8 mt-8'>
				{meetings.map((meeting, index: number) => (
					<MeetingCard key={index} {...meeting} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
