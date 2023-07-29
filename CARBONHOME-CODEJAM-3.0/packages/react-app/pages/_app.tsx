import type { AppProps } from 'next/app';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import celoGroups from '@celo/rainbowkit-celo/lists';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { publicProvider } from 'wagmi/providers/public';
import { Alfajores, Celo } from '@celo/rainbowkit-celo/chains';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';


const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [Celo, Alfajores],
  [publicProvider()]
);

const connectors = celoGroups({
  chains,
  projectId,
  appName: (typeof document === 'object' && document.title) || 'Toucan',
});

const appInfo = {
  appName: 'Toucan',
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const importTE = async () => {
      (await import('tw-elements')).default;
    };
    importTE();
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={appInfo} coolMode={true}>
        <ApolloProvider client={client}>
			<Toaster position="top-center"/>
          <Layout>
            <Component
              {...pageProps}
            />
          </Layout>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
