import { Header } from '@/components';
import { MeetingCard } from '@/components/cards';

const Dashboard = () => {
	return (
		<div>
			<Header />
			<div className='w-full mt-8 flex flex-row flex-wrap justify-center items-center gap-8'>
				{Array(1, 2, 3, 4).map((card, index) => (
					<MeetingCard key={index} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
