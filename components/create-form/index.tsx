import React from 'react';

import BasicDetails from './basic-details';
import AdminDetails from './admin-settings';

type CreateFormStepProps = 'basic' | 'settings';

interface FormProps {
	title: string;
}

const CreateForm = () => {
	const [step, setStep] = React.useState<CreateFormStepProps>('basic');
	return (
		<div className='flex flex-col p-12 px-16 w-full justify-center items-center'>
			{step === 'basic' ? (
				<BasicDetails step={step} setStep={setStep} />
			) : (
				<AdminDetails step={step} setStep={setStep} />
			)}
		</div>
	);
};

export default CreateForm;
