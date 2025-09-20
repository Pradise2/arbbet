import { http, createConfig } from "wagmi";
import { mainnet, sepolia, base } from "wagmi/chains";
import { injected, walletConnect, coinbaseWallet } from "wagmi/connectors";

// --- PASTE YOUR PROJECT ID HERE ---
const projectId = "Pcb46d9497eb6ef8306af418593b93703";
// ---------------------------------

if (projectId === "cb46d9497eb6ef8306af418593b93703" || !projectId) {
  console.error(
    "ERROR: WalletConnect Project ID is missing. Please create one at https://cloud.walletconnect.com and add it to src/lib/wagmi.ts"
  );
}

export const config = createConfig({
  chains: [mainnet, sepolia], base,
  // This setup is more robust and handles multiple injected wallets automatically.
  connectors: [
    injected(), // This single connector will find MetaMask, Rabby, Coinbase Wallet extension, etc.
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
  },
  // This helps prevent race conditions on page load
  multiInjectedProviderDiscovery: true,
});