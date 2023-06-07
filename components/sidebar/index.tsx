import React from 'react';
import { Avatar } from '@nextui-org/react';

import { motion } from 'framer-motion';

import { RightArrows } from '@/components/icons';

const Sidebar = () => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	return (
		<motion.div
			className='flex h-screen w-[88px] flex-col justify-between border-r border-gray-600 sidebar'
			layout='position'
			transition={{
				type: 'spring',
				bounce: 0.15,
			}}
			data-isOpen={isOpen}
			initial={{}}
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className='flex flex-col items-center justify-center my-8 gap-4'>
				<motion.div className='sidebar'>
					<Avatar
						squared
						icon={<RightArrows fill='#fff' size={36} className='pl-[4px]' />}
					/>
				</motion.div>
				<Avatar
					size='lg'
					src='https://i.pravatar.cc/150?u=a042581f4e25056704b'
					color='gradient'
					bordered
					squared
				/>
			</div>
		</motion.div>
	);
};

export default Sidebar;
