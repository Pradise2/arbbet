import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, User, Droplet } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress] = useState("0x742d35...4bc7");
  const [balance] = useState("1,250.50");

  const handleWalletConnect = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Policast
            </span>
          </NavLink>

          {/* Navigation */}
          <nav className="flex items-center space-x-4 md:space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              Markets
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/liquidity"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`
              }
            >
              Liquidity
            </NavLink>
          </nav>
        </div>

        {/* Right Side - Wallet & Network */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="hidden sm:flex">
            Ethereum
          </Badge>
          
          {isWalletConnected ? (
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{balance} USDC</p>
                <p className="text-xs text-muted-foreground">{walletAddress}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleWalletConnect}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Connected</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleWalletConnect}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;