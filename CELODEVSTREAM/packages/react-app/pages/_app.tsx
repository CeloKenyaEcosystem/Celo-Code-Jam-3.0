import type { AppProps } from "next/app";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import celoGroups from "@celo/rainbowkit-celo/lists";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";
import { Toaster } from "react-hot-toast";
import AppDataProvider from "@/providers/AppDataProvider";


const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
    [Celo, Alfajores, sepolia],
    [publicProvider()]
);

const connectors = celoGroups({
    chains,
    projectId,
    appName:
        (typeof document === "object" && document.title) || "Celo Streaming Payroll",
});

const appInfo = {
    appName: "Celo Streaming Payroll",
};

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient: publicClient,
});

function App({ Component, pageProps }: AppProps) {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: '#13AAA1',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
          chains={chains}
          appInfo={appInfo}
          coolMode={true}
        >
          <AppDataProvider>
            <Toaster position='top-center' />
              <Component {...pageProps} />
          </AppDataProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    );
}

export default App;
