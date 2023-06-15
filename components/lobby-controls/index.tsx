import React from 'react';
import { Button } from '@nextui-org/react';
import { Voice, VoiceMute } from '../icons';

import { useAudio } from '@huddle01/react/hooks';

const LobbyControls = () => {
	const { fetchAudioStream, stream: AudioStream } = useAudio();

	return (
		<Button
			auto
			className={`!w-fit px-[8px] ${
				AudioStream?.getAudioTracks().at(0)?.enabled
					? 'bg-[#0072F5]'
					: 'bg-[#F31260]'
			} h-[3.5em]`}
			icon={
				AudioStream?.getAudioTracks().at(0)?.enabled ? (
					<Voice size={36} />
				) : (
					<VoiceMute size={36} />
				)
			}
			onPress={() => fetchAudioStream()}
		></Button>
	);
};

export default LobbyControls;
