import { Header } from '@/components';
import { MeetingCard } from '@/components/cards';

const Dashboard = () => {
	return (
		<div className=''>
			<Header />
			<div className='flex flex-row w-fit flex-wrap justify-start gap-8 px-8 mt-8'>
				{Array(1, 2, 3, 4).map((card, index: number) => (
					<MeetingCard key={index} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
