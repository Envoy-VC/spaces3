import React from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import { useAudio, useRoom, useHuddle01 } from '@huddle01/react/hooks';
import { useRouter } from 'next/navigation';
import EmojiToolbar from '../emoji-toolbar';
import { Voice, VoiceMute } from '../icons';
import { Call, Heart2, Message } from 'react-iconly';
import { HUDDLE_PROJECT_ID } from '@/utils';

const MeetingControls = () => {
	const { initialize, isInitialized } = useHuddle01();

	React.useEffect(() => {
		initialize(HUDDLE_PROJECT_ID);
	}, []);

	const {
		produceAudio,
		stopProducingAudio,
		stream: AudioStream,
		isProducing,
	} = useAudio();
	const { leaveRoom } = useRoom();
	const router = useRouter();

	const handleAudioStream = () => {
		if (isProducing) {
			stopProducingAudio();
		} else {
			produceAudio(AudioStream);
		}
	};

	const handleLeaveMeeting = () => {
		leaveRoom();
		router.push('/');
	};

	if (isInitialized)
		return (
			<div className='flex flex-row gap-8 justify-center items-center'>
				<Button
					auto
					className={`!w-fit px-[8px] ${
						isProducing ? 'bg-[#0072F5]' : 'bg-[#F02747]'
					} h-[3.25em]`}
					icon={isProducing ? <Voice size={32} /> : <VoiceMute size={32} />}
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
					onPress={() => handleLeaveMeeting()}
				>
					{''}
				</Button>
				<Tooltip trigger='click' content={<EmojiToolbar />} placement='top'>
					<Button
						auto
						className='!w-fit px-[8px] bg-[#0072F5] h-[3.25em]'
						icon={<Heart2 set='bold' size={32} primaryColor='#fff' />}
					></Button>
				</Tooltip>
				<Button
					auto
					className='!w-fit px-[8px] bg-[#0072F5] h-[3.25em] flex xl:hidden'
					icon={<Message set='bold' size={32} primaryColor='#fff' />}
				></Button>
			</div>
		);
};

export default MeetingControls;
