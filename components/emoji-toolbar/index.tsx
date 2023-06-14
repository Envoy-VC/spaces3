import { Button } from '@nextui-org/react';
import React from 'react';

const emojiList = ['😀', '🤣', '👏', '👍', '❤️'];

const EmojiToolbar = () => {
	return (
		<div className='flex flex-col lg:flex-row gap-2 p-2 rounded-xl shadow-lg bg-[#181b20] m-0'>
			{emojiList.map((emoji, index) => (
				<Button
					key={index}
					auto
					className='!w-fit px-2 text-2xl'
					color='primary'
				>
					{emoji}
				</Button>
			))}
		</div>
	);
};

export default EmojiToolbar;
