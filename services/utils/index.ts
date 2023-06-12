import { FormProps } from '@/components/create-form';
import { TokenType, ChainType } from '@/components/create-form/admin-settings';
import { HUDDLE_API_KEY } from '@/utils';

export const resolveDates = (date: string, time: string, duration: number) => {
	const [year, month, day] = date.split('-');
	const [hour, minute] = time.split(':');

	const startDate = new Date(
		+year,
		+month - 1,
		+day,
		+hour,
		+minute,
		+'00'
	).toISOString();
	const endDate = new Date(
		new Date(startDate).getTime() + duration * 60 * 1000
	).toISOString();

	return { startDate, endDate };
};

export const roomJoinParams = (
	form: FormProps,
	adminList: string[],
	isTokenGated: boolean,
	selectedToken: TokenType,
	selectedChain: ChainType
) => {
	const { startDate, endDate } = resolveDates(
		form.date,
		form.startTime,
		Number(form.duration)
	);
	const options = {
		title: form.title,
		description: form.description,
		startTime: startDate,
		expiryTime: endDate,
		hostWallets: adminList,
	};

	if (!isTokenGated) return options;
	else if (isTokenGated && selectedToken !== 'ERC1155') {
		const tokenGatedOptions = {
			...options,
			tokenType: selectedToken,
			chain: selectedChain,
			contractAddress: form.tokenAddress,
		};
		return tokenGatedOptions;
	} else {
		const erc1155Options = {
			...options,
			tokenType: selectedToken,
			chain: selectedChain,
			contractAddress: form.tokenAddress,
			conditionValue: form.tokenId,
		};
		return erc1155Options;
	}
};

export const getMeetingDetails = async (meetingId: string) => {
	const response = await fetch(
		`https://api.huddle01.com/api/v1/meeting-details/${meetingId}`,
		{
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				'x-api-key': HUDDLE_API_KEY,
			},
		}
	);

	return response;
};
