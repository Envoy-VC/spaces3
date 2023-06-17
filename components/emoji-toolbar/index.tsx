import React from 'react';

import { Button } from '@nextui-org/react';
import * as PushAPI from '@pushprotocol/restapi';
import { useAddress, useSigner } from '@thirdweb-dev/react';

import { ENV } from '@pushprotocol/socket/src/lib/constants';

import { ChatDetails } from '@/pages/meeting/[slug]';
import { toast, Toaster } from 'react-hot-toast';

export const emojiList = ['😀', '🤣', '👏', '👍', '❤️'];

const EmojiToolbar = ({ chatId, pgpDecrpyptedPvtKey }: ChatDetails) => {
	const address = useAddress();
	const _signer = useSigner();

	const [isSending, setIsSending] = React.useState<boolean>(false);

	const handleSendReaction = async (reaction: string) => {
		if (!chatId) {
			return;
		}
		try {
			setIsSending(true);
			const response = await PushAPI.chat.send({
				messageContent: reaction,
				messageType: 'Text',
				receiverAddress: chatId!,
				signer: _signer,
				pgpPrivateKey: pgpDecrpyptedPvtKey!,
				env: ENV.PROD,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className='flex flex-col lg:flex-row gap-2 p-2 rounded-xl shadow-lg bg-[#181b20] m-0'>
			{emojiList.map((emoji, index) => (
				<Button
					key={index}
					auto
					className='!w-fit px-2 text-2xl'
					color='primary'
					onPress={() => handleSendReaction(emoji)}
					disabled={isSending}
				>
					{emoji}
				</Button>
			))}
		</div>
	);
};

export default EmojiToolbar;
