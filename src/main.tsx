import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import { StrictMode, useEffect } from 'react';
import App from "./App.tsx";
import "./index.css";
import FrameSDK from '@farcaster/frame-sdk';

function FarcasterFrameProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
  const init = async () => {
      FrameSDK.actions.ready();
    };

    init();
  }, []);

  return <>{children}</>;
 }

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <FarcasterFrameProvider>
          <App />
    </FarcasterFrameProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);