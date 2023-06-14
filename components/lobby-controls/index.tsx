import React from 'react';
import { Button } from '@nextui-org/react';
import { Voice, VoiceMute } from '../icons';

import { useAudio } from '@huddle01/react/hooks';

const LobbyControls = () => {
	const { fetchAudioStream, stopAudioStream, stream: AudioStream } = useAudio();
	const [isAudioStreamEnabled, setIsAudioStreamEnabled] =
		React.useState<boolean>(false);

	const handleAudioStream = () => {
		if (AudioStream?.getAudioTracks().length > 0) {
			stopAudioStream();
			setIsAudioStreamEnabled(false);
		} else {
			fetchAudioStream();
			setIsAudioStreamEnabled(true);
		}
	};

	return (
		<Button
			auto
			className={`!w-fit px-[8px] ${
				isAudioStreamEnabled ? 'bg-[#0072F5]' : 'bg-[#F31260]'
			} h-[3.5em]`}
			icon={
				isAudioStreamEnabled ? <Voice size={36} /> : <VoiceMute size={36} />
			}
			onPress={() => handleAudioStream()}
		></Button>
	);
};

export default LobbyControls;
