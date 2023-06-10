import { Input, Textarea, Button } from '@nextui-org/react';
import { CaretRight } from 'react-iconly';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const CreateForm = () => {
	return (
		<div className='flex flex-col p-12 px-16 w-full justify-center items-center'>
			<div className='text-4xl font-bold mb-16'>Basic Details</div>
			<form
				className={`${inter.className} max-w-screen-md flex flex-col justify-center gap-6`}
			>
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
				<Button
					auto
					light
					iconRight={<CaretRight set='bold' primaryColor='#fff' size={32} />}
					size='xl'
					className='bg-[#0072F5] text-white mt-4 !w-fit'
				>
					Create
				</Button>
			</form>
		</div>
	);
};

export default CreateForm;
