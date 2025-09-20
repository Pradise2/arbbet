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

const Header = () => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

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
            <NavLink to="/markets" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Markets</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Portfolio</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Leaderboard</NavLink>
            <NavLink to="/liquidity" className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}`}>Liquidity</NavLink>
          </nav>
        </div>
        
        {/* Wallet Connect Section */}
        <div className="flex items-center space-x-4">
          {isConnected && chain && (<Badge variant="outline" className="hidden sm:flex">{chain.name}</Badge>)}
          
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block"><p className="text-xs text-muted-foreground">{truncateAddress(address!)}</p></div>
              <Button variant="outline" size="sm" onClick={() => disconnect()} className="flex items-center space-x-2"><User className="h-4 w-4" /><span className="hidden sm:inline">Disconnect</span></Button>
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
                  {connectors.map((connector) => (
                    <Button
                      key={connector.id}
                      onClick={() => {
                        connect({ connector });
                        setIsModalOpen(false);
                      }}
                      disabled={!connector.ready}
                      variant="outline"
                      className="w-full justify-start text-base p-6"
                    >
                      <img src={connector.icon} alt={connector.name} className="w-6 h-6 mr-4" />
                      {connector.name}
                      {!connector.ready && ' (Not Detected)'}
                    </Button>
                  ))}
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