import React from 'react';
import { Image } from '@nextui-org/react';

import logo from '@/public/logo.png';

const MeetingHeader = () => {
	return (
		<div className='w-full p-8 px-12 flex flex-row justify-start items-center'>
			<div>
				<Image src={logo.src} alt='SPACES3 Logo' width={24} height={24} />
			</div>
			<div className='font-bold text-xl mx-2'>SPACES3</div>
		</div>
	);
};

export default MeetingHeader;
