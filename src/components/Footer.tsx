import { NavLink } from "react-router-dom";
import { useAccount } from 'wagmi';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  TrendingUp, Twitter, Github, Mail, Heart, 
  Home, LayoutGrid, Briefcase, Trophy, Droplet 
} from "lucide-react";

const Footer = () => {
  const { isConnected } = useAccount();
  const isMobile = useIsMobile();

  // --- RENDER MOBILE FOOTER ---
  if (isMobile) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 md:hidden">
        <nav className="container flex h-16 items-center justify-around px-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 p-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`
            }
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </NavLink>

          {isConnected && (
            <>
              <NavLink
                to="/markets"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <LayoutGrid className="h-6 w-6" />
                <span className="text-xs font-medium">Markets</span>
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <Briefcase className="h-6 w-6" />
                <span className="text-xs font-medium">Portfolio</span>
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <Trophy className="h-6 w-6" />
                <span className="text-xs font-medium">Leaders</span>
              </NavLink>
              <NavLink
                to="/liquidity"
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                <Droplet className="h-6 w-6" />
                <span className="text-xs font-medium">Liquidity</span>
              </NavLink>
            </>
          )}
        </nav>
      </footer>
    );
  }

  // --- RENDER DESKTOP FOOTER (Original Code with updates) ---
  return (
    <footer className="hidden bg-card border-t mt-20 md:block">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Policast
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The future of prediction markets. Trade on outcomes, earn from accuracy, 
              and put your knowledge to work.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Markets */}
          <div className="space-y-4">
            <h3 className="font-semibold">Markets</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Politics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Sports</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cryptocurrency</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Technology</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </NavLink>
              </li>
              {isConnected && (
                <>
                  <li>
                    <NavLink to="/markets" className="text-muted-foreground hover:text-foreground transition-colors">
                      Browse Markets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                      Your Portfolio
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">
                      Leaderboard
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Policast. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for prediction enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;