import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';

const client = new GraphQLClient(GRAPHQL_URL);

type ProfileProps = {
	address?: string;
	displayName: string;
	about: string;
	avatar: string;
};

type CreateMeetingProps = {
	meetingId: string;
	startDate: string;
	endDate: string;
};

export const getProfile = async (address: string) => {
	const query = gql`
		query GetProfile {
			profile(
				where: { address: "${address}" }
			) {
                address
				displayName
				about
				avatar
			}
		}
	`;
	const profile: any = await client.request(query);
	return profile?.profile;
};

export const createProfile = async ({ address }: ProfileProps) => {
	const createProfile = gql`
		mutation CreateProfile {
			createProfile(
				data: { address: "${address}", displayName: "", about: "", avatar: "" }
			) {
				id
			}
		}
	`;
	let result;
	const data = await client.request(createProfile).then(async (res: any) => {
		const publishProfile = gql`
		mutation PublishProfile {
			publishProfile(where: { id: "${res?.createProfile?.id}" }) {
				id
			}
		}
	`;
		const data = await client.request(publishProfile);
		result = data;
	});
	return result;
};

export const updateProfile = async ({
	address,
	displayName,
	about,
	avatar,
}: ProfileProps) => {
	const updateProfile = gql`
		mutation UpdateProfile {
			updateProfile(
				data: { about: "${about}", avatar: "${avatar}", displayName: "${displayName}" }
				where: { address: "${address}" }
			) {
				id
			}
            publishProfile(where: {address: "${address}"}) {
                id
            }
		}
	`;

	const res = await client.request(updateProfile);
	return res;
};

export const createMeeting = async ({
	meetingId,
	startDate,
	endDate,
}: CreateMeetingProps) => {
	const createMeeting = gql`
		mutation CreateMeeting {
			createMeeting(data: { meetingId: "${meetingId}", startDate: "${startDate}", endDate: "${endDate}" }) {
				id
			}
			publishMeeting(where: { meetingId: "${meetingId}" }) {
				id
			}
		}
	`;
	const res = await client.request(createMeeting);
	return res;
};
