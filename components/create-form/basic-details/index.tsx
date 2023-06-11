import { Input, Textarea, Button } from '@nextui-org/react';
import { CaretRight } from 'react-iconly';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

type CreateFormStepProps = 'basic' | 'settings';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
}

const BasicDetails = ({ step, setStep }: Props) => {
	return (
		<div
			className={`${inter.className} max-w-screen-md flex flex-col justify-center gap-6`}
		>
			<div className='text-4xl font-bold mb-16 text-center'>Basic Details</div>
			<Input
				label='Meeting Title'
				placeholder='Onboarding Meeting'
				required
				size='xl'
				clearable
				className='mt-4 max-w-[450px]'
			/>
			<Textarea
				label='Meeting Description'
				placeholder='We do group onboarding calls and connect them with relevant resources to assist them in contributing meaningfully. '
				minRows={5}
				maxRows={10}
				size='xl'
				className='mt-4 min-w-[400px]'
			/>
			<div className='flex flex-col lg:flex-row gap-6'>
				<Input
					label='Date'
					type='date'
					required
					size='xl'
					clearable
					className='mt-4 min-w-[250px]'
				/>
				<Input
					label='Start Time (UTC)'
					type='time'
					required
					size='xl'
					clearable
					className='mt-4 min-w-[250px]'
				/>
				<Input
					label='Duration(in minutes)'
					placeholder='60'
					step={10}
					type='number'
					required
					size='xl'
					className='mt-4 min-w-[200px]'
				/>
			</div>
			<div className='flex justify-end'>
				<Button
					auto
					light
					iconRight={<CaretRight set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					className='bg-[#0072F5] text-white mt-4 !w-fit'
					onPress={() => setStep('settings')}
				>
					Admin Settings
				</Button>
			</div>
		</div>
	);
};

export default BasicDetails;
