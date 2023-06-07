import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';
import { Ethereum, Sepolia, Polygon, Mumbai } from '@thirdweb-dev/chains';

import { WALLET_CONNECT_ID } from '@/utils';


const darkTheme = createTheme({
	type: 'dark',
});

export default function App({ Component, pageProps }: AppProps) {
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
