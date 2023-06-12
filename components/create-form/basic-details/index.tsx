import { Input, Textarea, Button } from '@nextui-org/react';
import { CaretRight } from 'react-iconly';
import toast, { Toaster } from 'react-hot-toast';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { FormProps } from '..';

type CreateFormStepProps = 'basic' | 'settings';

interface Props {
	step: CreateFormStepProps;
	setStep: React.Dispatch<React.SetStateAction<CreateFormStepProps>>;
	form: FormProps;
}

const BasicDetails = ({ step, setStep, form }: Props) => {
	return (
		<div
			className={`${inter.className} max-w-screen-md flex flex-col justify-center gap-6`}
		>
			<div className='text-4xl font-bold mb-16 text-center'>Basic Details</div>
			<Input
				label='Meeting Title*'
				placeholder='Onboarding Meeting'
				size='xl'
				clearable
				className='mt-4 max-w-[450px]'
				initialValue={form.title ? form.title : ''}
				onChange={(e) => {
					form.title = e.target.value;
				}}
			/>
			<Textarea
				label='Meeting Description'
				placeholder='We do group onboarding calls and connect them with relevant resources to assist them in contributing meaningfully. '
				minRows={5}
				maxRows={10}
				size='xl'
				className='mt-4 min-w-[400px]'
				initialValue={form.description ? form.description : ''}
				onChange={(e) => {
					form.description = e.target.value;
				}}
			/>
			<div className='flex flex-col lg:flex-row gap-6'>
				<Input
					label='Date*'
					type='date'
					size='xl'
					className='mt-4 min-w-[250px]'
					initialValue={form.date ? form.date : ''}
					onChange={(e) => {
						form.date = e.target.value;
					}}
				/>
				<Input
					label='Start Time*'
					type='time'
					required
					size='xl'
					className='mt-4 min-w-[250px]'
					initialValue={form.startTime ? form.startTime : ''}
					onChange={(e) => {
						form.startTime = e.target.value;
					}}
				/>
				<Input
					label='Duration(minutes)'
					placeholder='60'
					step={10}
					type='number'
					size='xl'
					className='mt-4 min-w-[200px]'
					initialValue={form.duration ? form.duration : ''}
					onChange={(e) => {
						form.duration = e.target.value;
					}}
				/>
			</div>
			<div className='flex justify-end'>
				<Button
					auto
					light
					iconRight={<CaretRight set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					className='bg-[#0072F5] text-white mt-4 !w-fit'
					type='submit'
					onPress={() => {
						if (!form.title) {
							toast.error('Meeting title required');
							return;
						} else if (!form.date) {
							toast.error('Meeting date required');
							return;
						} else if (!form.startTime) {
							toast.error('Meeting start time required');
							return;
						} else if (!form.duration) {
							toast.error('Meeting duration required');
							return;
						} else {
							setStep('settings');
						}
					}}
				>
					Admin Settings
				</Button>
			</div>
			<Toaster position='bottom-left' />
		</div>
	);
};

export default BasicDetails;
