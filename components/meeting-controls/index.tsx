import React from 'react';
import { Button } from '@nextui-org/react';
import { Voice, VoiceMute } from '../icons';
import { Call, Heart2 } from 'react-iconly';

const MeetingControls = () => {
	const [isAudioStreamEnabled, setIsAudioStreamEnabled] = React.useState(false);

	const handleAudioStream = () => {
		setIsAudioStreamEnabled(!isAudioStreamEnabled);
	};

	return (
		<div className='flex flex-row gap-8 justify-center items-center'>
			<Button
				auto
				className={`!w-fit px-[8px] ${
					isAudioStreamEnabled ? 'bg-[#0072F5]' : 'bg-[#F02747]'
				} h-[3.25em]`}
				icon={
					isAudioStreamEnabled ? <Voice size={32} /> : <VoiceMute size={32} />
				}
				onPress={() => handleAudioStream()}
			></Button>
			<Button
				auto
				color='primary'
				size='lg'
				className='bg-[#F02747] pl-8 py-8 rounded-[36px] !w-fit'
				icon={
					<Call
						set='bold'
						primaryColor='#fff'
						style={{ transform: 'rotate(135deg)' }}
						size={36}
					/>
				}
			>
				{''}
			</Button>
			<Button
				auto
				className='!w-fit px-[8px] bg-[#0072F5] h-[3.25em]'
				icon={<Heart2 set='bold' size={32} primaryColor='#fff' />}
			></Button>
		</div>
	);
};

export default MeetingControls;
