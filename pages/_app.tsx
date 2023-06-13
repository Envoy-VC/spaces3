import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import React from 'react';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { useHuddle01 } from '@huddle01/react';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';

import { WALLET_CONNECT_ID, HUDDLE_PROJECT_ID } from '@/utils';

const darkTheme = createTheme({
	type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
	const { initialize } = useHuddle01();

	// Initialize Huddle01
	React.useEffect(() => {
		initialize(HUDDLE_PROJECT_ID);
	}, []);

	return (
		<ThirdwebProvider
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<NextUIProvider theme={darkTheme}>
				<Component {...pageProps} />
			</NextUIProvider>
		</ThirdwebProvider>
	);
}
