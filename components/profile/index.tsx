import React from 'react';
import { Input, Textarea, Avatar, Button, Loading } from '@nextui-org/react';
import { useAddress, useStorage } from '@thirdweb-dev/react';
import toast, { Toaster } from 'react-hot-toast';
import { Edit, Upload } from 'react-iconly';

import { getProfile, createProfile, updateProfile } from '@/services/graphql';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export type ProfileProps = {
	displayName?: string;
	about?: string;
	avatar?: string;
};

const Profile = () => {
	const address = useAddress();
	const storage = useStorage();
	const [profile, setProfile] = React.useState<ProfileProps>({});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	// Fetch Profile on Page Load
	React.useEffect(() => {
		async function fetchProfile() {
			const profile = await getProfile(address!);
			if (!profile) {
				const res = await createProfile(address!);
				const newProfile = await getProfile(address!);
				setProfile(newProfile);
				return;
			}
			setProfile(profile);
		}
		fetchProfile();
	}, []);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			const file = e.target.files![0];
			const uri = await storage!.upload(file, { uploadWithoutDirectory: true });
			setProfile({
				...profile,
				avatar: 'https://ipfs.io/ipfs/' + uri.split('ipfs://')[1],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdate = async () => {
		try {
			setIsLoading(true);
			const res = await updateProfile({
				address,
				displayName: profile.displayName || '',
				about: profile.about || '',
				avatar: profile.avatar || '',
			});
			toast.success('Profile Updated');
		} catch (error) {
			console.log(error);
			toast.error('Error Updating Profile');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={`${inter.className} max-w-screen-lg py-12 px-16 mx-auto`}>
			<div className='text-4xl font-bold mb-16 text-center'>Profile</div>
			<div className='flex flex-col xl:flex-row w-full justify-start items-center gap-24'>
				<div className='flex flex-col gap-6'>
					<Input
						label='Display Name'
						placeholder='Richard Hendricks'
						initialValue={profile.displayName ? profile.displayName : ''}
						onChange={(e) =>
							setProfile({ ...profile, displayName: e.target.value })
						}
						required
						size='xl'
						clearable
						className='mt-4 min-w-[400px]'
					/>
					<Textarea
						label='About me'
						placeholder={`Hi, I'm Richard Hendricks, the founder and CEO of Pied Piper, a revolutionary video conferencing platform.`}
						initialValue={profile.about ? profile.about : ''}
						onChange={(e) => setProfile({ ...profile, about: e.target.value })}
						minRows={5}
						maxRows={10}
						size='xl'
						className='mt-4 max-w-[600px]'
					/>
				</div>
				<div className='flex flex-col justify-center items-center'>
					<Avatar
						src={
							profile.avatar
								? profile.avatar
								: 'https://nextui.org/images/card-example-3.jpeg'
						}
						className='w-60 h-60 rounded-full mb-4'
						alt='Profile Picture'
						color='primary'
						bordered
					/>
					<Button
						color='gradient'
						icon={<Upload set='bold' primaryColor='#fff' size={22} />}
						className='bg-[#0072F5] text-white mt-4 !max-w-[200px]'
						auto
					>
						<input
							type='file'
							className='max-w-[200px]'
							placeholder=''
							accept='image/*'
							onChange={(e) => handleFileChange(e)}
						/>
					</Button>
				</div>
			</div>
			<div className='flex w-full justify-center xl:justify-start my-16'>
				<Button
					auto
					light
					icon={!isLoading && <Edit set='bold' primaryColor='#fff' size={32} />}
					size='lg'
					color='secondary'
					className='bg-[#9750DD] text-white mt-4 !w-fit'
					disabled={isLoading}
					onPress={() => handleUpdate()}
				>
					{isLoading ? <Loading color='currentColor' size='md' /> : 'Update'}
				</Button>
			</div>
			<Toaster position='bottom-left' />
		</div>
	);
};

export default Profile;
