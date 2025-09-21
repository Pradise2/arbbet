
import { http, createConfig } from "wagmi";
import { mainnet, sepolia, base } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector';

// --- PASTE YOUR PROJECT ID HERE ---
const projectId = "cb46d9497eb6ef8306af418593b93703"; // Get from https://cloud.walletconnect.com
// ---------------------------------

if (!projectId || projectId === "cb46d9497eb6ef8306af418593b93703") {
  console.error(
    "ERROR: WalletConnect Project ID is missing. Please create one at https://cloud.walletconnect.com and add it to src/lib/wagmi.ts"
  );
}

export const config = createConfig({
  chains: [mainnet, sepolia, base],
  connectors: [
      miniAppConnector(),
    // EIP-6963 will automatically detect installed wallets
    injected({
      shimDisconnect: true,
    }),
    walletConnect({ 
      projectId: projectId || "dummy_id", // Replace with your actual project ID
      metadata: {
        name: "Policast",
        description: "Decentralized Prediction Markets",
        url: typeof window !== 'undefined' ? window.location.origin : 'https://policast.app',
        icons: ['https://policast.app/icons/logo.png'], // Add your app icon URL
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
  // Enable EIP-6963 multi-wallet detection
  multiInjectedProviderDiscovery: true,
  ssr: false,
});