import React from 'react';

import BasicDetails from './basic-details';
import AdminDetails from './admin-settings';

type CreateFormStepProps = 'basic' | 'settings';
type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';
type ChainType = 'ETHEREUM' | 'POLYGON';

export interface FormProps {
	title: string;
	description?: string;
	date: string;
	startTime: string;
	duration: string;
	organizer: string;
	hosts: string[];
	tokenGated: boolean;
	tokenType?: TokenType;
	chainType?: ChainType;
	tokenAddress?: string;
	tokenId?: string;
}

const CreateForm = () => {
	const [step, setStep] = React.useState<CreateFormStepProps>('basic');
	const form = React.useRef<FormProps>({
		title: '',
		date: '',
		startTime: '',
		duration: '60',
		organizer: '',
		hosts: [],
		tokenGated: false,
	});

	return (
		<div className='flex flex-col p-12 px-16 w-full justify-center items-center'>
			{step === 'basic' ? (
				<BasicDetails step={step} setStep={setStep} form={form.current} />
			) : (
				<AdminDetails step={step} setStep={setStep} form={form.current} />
			)}
		</div>
	);
};

export default CreateForm;
