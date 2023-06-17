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
	hostName: string;
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

export const createProfile = async (address: string) => {
	const createProfile = gql`
		mutation CreateProfile {
  			createProfile(data: {address: "${address}", displayName: "", about: "", avatar: ""}) {
    			id
  			}
  			publishProfile(where: {address: "${address}"}) {
    			id
  			}
		}
	`;
	const result = await client.request(createProfile);
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
	hostName,
	startDate,
	endDate,
}: CreateMeetingProps) => {
	const createMeeting = gql`
		mutation CreateMeeting {
			createMeeting(data: { meetingId: "${meetingId}", host: "${hostName}", startDate: "${startDate}", endDate: "${endDate}"}) {
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

export const checkUserExists = async (address: string) => {
	const checkUser = gql`
		query CheckUser {
			profile(
				where: { address: "${address}" }
			) {
				id
			}
		}
	`;
	const res: any = await client.request(checkUser);
	if (res?.profile === null) {
		return false;
	} else {
		return true;
	}
};

export const checkReminderExists = async (
	meetingId: string,
	address: string
) => {
	const checkReminder = gql`
		query CheckReminder {
			meeting(where: { meetingId: "${meetingId}" }) {
				profiles(where: { address: "${address}" }) {
					id
				}
			}
		}
	`;

	const res: any = await client.request(checkReminder);
	const hasSetReminder = res?.meeting?.profiles?.length > 0;
	return hasSetReminder;
};

export const updateReminder = async (meetingId: string, address: string) => {
	const userExists = await checkUserExists(address);
	if (!userExists) {
		await createProfile(address);
	}

	const hasSetReminder = await checkReminderExists(meetingId, address);

	const addReminder = gql`
		mutation AddReminder {
			updateMeeting(
				data: { profiles: { connect: { where: { address: "${address}" } } } }
				where: { meetingId: "${meetingId}" }
			) {
				id
			}
			publishMeeting(where: {meetingId: "${meetingId}"}) {
    			id
  			}
		}
	`;

	const removeReminder = gql`
		mutation RemoveReminder {
			updateMeeting(
				data: { profiles: { disconnect: { address: "${address}" } } }
				where: { meetingId: "${meetingId}" }
			) {
				id
			}
			publishMeeting(where: {meetingId: "${meetingId}"}) {
    			id
  			}
		}
	`;

	if (hasSetReminder) {
		const res = await client.request(removeReminder);
		return res;
	} else {
		const res = await client.request(addReminder);
		return res;
	}
};

export const getCurrentMeetings = async () => {
	const currentTimestamp = new Date().toISOString();

	const getCurrentMeetings = gql`
		query MyQuery {
			meetings(where: { endDate_gte: "${currentTimestamp}" }) {
				meetingId
				host
				profiles {
					address
					displayName
					avatar
				}
			}
		}
	`;

	const res: any = await client.request(getCurrentMeetings);
	return res?.meetings;
};

export const updatePeerId = async ({
	address,
	peerId,
}: {
	address: string;
	peerId: string;
}) => {
	const updatePeerId = gql`
		mutation UpdatePeerId {
			updateProfile(
				data: { peerId: "${peerId}" }
				where: { address: "${address}" }
			) {
				id
			}
			publishProfile(where: {address: "${address}"}) {
				id
  			}
		}
	`;

	const res = await client.request(updatePeerId);
	return res;
};

export const getProfileByPeerId = async (peerId: string) => {
	const getProfile = gql`
		query GetProfile {
			profile(where: { peerId: "${peerId}" }) {
				address
				displayName
				avatar
			}
		}
	`;

	const res: any = await client.request(getProfile);
	return res?.profile;
};
