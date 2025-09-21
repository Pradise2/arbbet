import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const connectorIcons: Record<string, string> = {
  "injected": "/icons/metamask.svg",
  "io.metamask": "/icons/metamask.svg",
  "com.coinbase.wallet": "/icons/coinbase.svg", 
  "io.rabby": "/icons/rabby.svg",
  "walletConnect": "/icons/walletconnect.svg",
  "MetaMask": "/icons/metamask.svg",
  "Coinbase Wallet": "/icons/coinbase.svg",
  "Rabby Wallet": "/icons/rabby.svg",
};

const Header = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const availableConnectors = connectors.filter((connector) => {
    if (connector.type === 'walletConnect') return true;
    if (connector.id !== 'injected') return true;
    const hasSpecificWallets = connectors.some(c => c.id !== 'injected' && c.id !== 'walletConnect');
    return !hasSpecificWallets && (typeof window !== 'undefined' && window.ethereum);
  });

  const uniqueConnectors = availableConnectors.reduce((acc, connector) => {
    const existing = acc.find(c => c.name === connector.name);
    if (!existing) {
      acc.push(connector);
    }
    return acc;
  }, [] as typeof availableConnectors);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Nav */}
        <div className="flex items-center space-x-8">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Policast
            </span>
          </NavLink>
          <nav className="hidden items-center space-x-4 md:flex md:space-x-6">
            <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Home</NavLink>
            
            {/* Conditionally render all links except Home based on connection status */}
            {isConnected && (
              <>
                <NavLink to="/markets" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Markets</NavLink>
                <NavLink to="/portfolio" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Portfolio</NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Leaderboard</NavLink>
                <NavLink to="/liquidity" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Liquidity</NavLink>
              </>
            )}
          </nav>
        </div>
        
        {/* Wallet Connect Section */}
        <div className="flex items-center space-x-4">
          {isConnected && chain && (
            <Badge variant="outline" className="hidden sm:flex">
              {chain.name}
            </Badge>
          )}
          
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">
                  {truncateAddress(address!)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => disconnect()}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Disconnect</span>
              </Button>
            </div>
          ) : (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Connect a Wallet</DialogTitle>
                  <DialogDescription>
                    Choose your preferred wallet to continue.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {uniqueConnectors.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="mb-2">No wallets detected</p>
                      <p className="text-sm">
                        Please install MetaMask, Rabby, or Coinbase Wallet extension
                      </p>
                      <p className="text-xs mt-2">
                        Or use WalletConnect to scan QR code
                      </p>
                    </div>
                  ) : (
                    uniqueConnectors.map((connector) => {
                      const getConnectorIcon = () => {
                        if (connectorIcons[connector.id]) return connectorIcons[connector.id];
                        if (connectorIcons[connector.name]) return connectorIcons[connector.name];
                        if (connectorIcons[connector.type]) return connectorIcons[connector.type];
                        return "/icons/default.svg";
                      };

                      return (
                        <Button
                          key={connector.id}
                          onClick={() => {
                            connect({ connector });
                            setIsModalOpen(false);
                          }}
                          variant="outline"
                          className="w-full justify-start text-base p-6 hover:bg-accent"
                          disabled={status === 'pending'}
                        >
                          <img
                            src={getConnectorIcon()}
                            alt={connector.name}
                            className="w-6 h-6 mr-4"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/icons/default.svg";
                            }}
                          />
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{connector.name}</span>
                            {connector.type === 'walletConnect' && (
                              <span className="text-xs text-muted-foreground">
                                Scan with mobile wallet
                              </span>
                            )}
                          </div>
                        </Button>
                      );
                    })
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;