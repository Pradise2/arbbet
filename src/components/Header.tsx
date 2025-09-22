import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, User, Menu, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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
  const { disconnect } = useDisconnect(); // <<< --- THE FIX IS HERE ---
  const { data: balance } = useBalance({ address });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
  };
  
  const NavLinkItem = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <SheetClose asChild>
      <NavLink to={to} className={({ isActive }) => `w-full text-left p-3 rounded-md text-lg font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>
        {children}
      </NavLink>
    </SheetClose>
  );

  const connectDialogContent = (
    <div className="grid gap-4 py-4">
      {connectors.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">No wallets detected.</p>
          <p className="text-sm">Please install a browser wallet or use WalletConnect.</p>
        </div>
      ) : (
        connectors.map((connector) => {
          const getConnectorIcon = () => {
            if (connectorIcons[connector.id]) return connectorIcons[connector.id];
            if (connectorIcons[connector.name]) return connectorIcons[connector.name];
            return "/icons/default.svg";
          };
          return (
            <Button
              key={connector.uid}
              onClick={() => { connect({ connector }); setIsModalOpen(false); }}
              variant="outline"
              className="w-full justify-start text-base p-6 hover:bg-accent"
              disabled={status === 'pending'}
            >
              <img src={getConnectorIcon()} alt={connector.name} className="w-6 h-6 mr-4" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{connector.name}</span>
                {connector.type === 'walletConnect' && (<span className="text-xs text-muted-foreground">Scan with mobile wallet</span>)}
              </div>
            </Button>
          );
        })
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary"><TrendingUp className="h-5 w-5 text-primary-foreground" /></div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Policast</span>
        </NavLink>
        
        <nav className="hidden items-center space-x-4 md:flex md:space-x-6">
          <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Home</NavLink>
          {isConnected && (
            <>
              <NavLink to="/markets" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Markets</NavLink>
              <NavLink to="/portfolio" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Portfolio</NavLink>
              <NavLink to="/leaderboard" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Leaderboard</NavLink>
              <NavLink to="/liquidity" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Liquidity</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <Badge variant="outline">{chain?.name}</Badge>
                <p className="text-xs text-muted-foreground">{truncateAddress(address!)}</p>
                <Button variant="outline" size="sm" onClick={() => disconnect()} className="flex items-center space-x-2"><User className="h-4 w-4" /><span>Disconnect</span></Button>
              </div>
            ) : (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild><Button className="bg-gradient-primary hover:opacity-90 transition-opacity"><Wallet className="mr-2 h-4 w-4" />Connect Wallet</Button></DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Connect a Wallet</DialogTitle>
                    <DialogDescription>Choose your preferred wallet to continue.</DialogDescription>
                  </DialogHeader>
                  {connectDialogContent}
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            {isConnected && chain && (
              <div className="text-right">
                <p className="font-semibold text-sm leading-tight">{balance ? parseFloat(balance.formatted).toFixed(3) : '0.00'}<span className="text-muted-foreground"> {balance?.symbol}</span></p>
                <p className="text-xs text-muted-foreground leading-tight">{chain.name}</p>
              </div>
            )}
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon"><Menu className="h-6 w-6" /><span className="sr-only">Open menu</span></Button></SheetTrigger>
              <SheetContent side="right" className="w-[35%]">
                <div className="flex h-full flex-col p-4">
                  <div className="flex flex-col space-y-4">
                    <NavLinkItem to="/">Home</NavLinkItem>
                    {isConnected && (
                      <>
                        <NavLinkItem to="/markets">Markets</NavLinkItem>
                        <NavLinkItem to="/portfolio">Portfolio</NavLinkItem>
                        <NavLinkItem to="/leaderboard">Leaderboard</NavLinkItem>
                        <NavLinkItem to="/liquidity">Liquidity</NavLinkItem>
                      </>
                    )}
                  </div>
                  <div className="mt-auto"> 
                    {isConnected ? (
                      <div className="space-y-4 border-t pt-4">
                        <div className="p-3 rounded-md bg-muted text-sm">
                          <p className="font-mono text-muted-foreground font-semibold">{truncateAddress(address!)}</p>
                          <p className="text-muted-foreground">Network: {chain?.name}</p>
                        </div>
                        <SheetClose asChild><Button variant="outline" onClick={() => disconnect()} className="w-full"><LogOut className="mr-2 h-4 w-4" /> Disconnect</Button></SheetClose>
                      </div>
                    ) : (
                      <div className="border-t pt-4">
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                          <DialogTrigger asChild><Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"><Wallet className="mr-2 h-4 w-4" />Connect Wallet</Button></DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Connect a Wallet</DialogTitle>
                              <DialogDescription>Choose your preferred wallet to continue.</DialogDescription>
                            </DialogHeader>
                            {connectDialogContent}
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;