import { GraphQLClient, gql } from 'graphql-request';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';

const client = new GraphQLClient(GRAPHQL_URL);

type ProfileProps = {
	address?: string;
	displayName: string;
	about: string;
	avatar: string;
};

export const getProfile = async (address: string) => {
	const query = gql`
		query GetProfile {
			profile(
				where: { address: "${address}" }
			) {
				displayName
				about
				avatar
			}
		}
	`;
	const profile: any = await client.request(query);
	return profile?.data?.profile;
};

export const createProfile = async ({
	address,
	displayName,
	about,
	avatar,
}: ProfileProps) => {
	const createProfile = gql`
		mutation CreateProfile {
			createProfile(
				data: { address: "${address}", displayName: "${displayName}", about: "${about}", avatar: "${avatar}" }
			) {
				id
			}
		}
	`;
	const publishProfile = gql`
		mutation PublishProfile {
			publishProfile(where: { address: "${address}" })
		}
	`;

	const data = await client.request(createProfile);
	const res: any = await client.request(publishProfile);
	if (res?.data?.publishProfile?.id) return true;
	else return false;
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
		}
	`;

	const res = await client.request(updateProfile);
	return res;
};
