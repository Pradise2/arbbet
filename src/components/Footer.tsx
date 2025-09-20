import { NavLink } from "react-router-dom";
import { TrendingUp, Twitter, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
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
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Politics
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sports
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cryptocurrency
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </a>
              </li>
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
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Status
                </a>
              </li>
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