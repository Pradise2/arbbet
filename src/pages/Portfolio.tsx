import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Trophy,
  User,
  Wallet,
  PackageOpen
} from "lucide-react";

type FarcasterUser = Awaited<typeof miniAppSdk.context>['user'];

const Portfolio = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  const [farcasterUser, setFarcasterUser] = useState<FarcasterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const context = await miniAppSdk.context;
          if (context && context.user) {
            setFarcasterUser(context.user);
          } else {
            setFarcasterUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch Farcaster user data:", error);
          setFarcasterUser(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUserData();
    } else {
      setIsLoading(false);
      setFarcasterUser(null);
    }
  }, [isConnected]);

  // Mock data
  const portfolioStats = { totalInvested: 2450.75, totalWinnings: 1820.30, realizedPnL: -630.45, activePositions: 2, completedTrades: 23 };
  const positions = [
    { id: "1", question: "Will Bitcoin reach $100,000 by the end of 2024?", category: "CRYPTO", option: "Yes", shares: 125, avgPrice: 0.65, currentPrice: 0.68, currentValue: 85.00, pnl: 3.75, status: "Active", canClaim: false },
    { id: "2", question: "Who will win the 2024 US Presidential Election?", category: "POLITICS", option: "Democrat", shares: 200, avgPrice: 0.48, currentPrice: 0.52, currentValue: 104.00, pnl: 8.00, status: "Active", canClaim: false },
    { id: "3", question: "Will Taylor Swift release a new album in 2024?", category: "ENTERTAINMENT", option: "Yes", shares: 300, avgPrice: 0.75, currentPrice: 0.84, currentValue: 252.00, pnl: 27.00, status: "Resolved", canClaim: true },
    { id: "4", question: "Will OpenAI release GPT-5 before 2025?", category: "TECH", option: "No", shares: 500, avgPrice: 0.70, currentPrice: 0.71, currentValue: 355.00, pnl: 5.00, status: "Resolved", canClaim: true }
  ];
  const tradeHistory = [
    { id: "1", date: "2024-09-15", market: "Bitcoin $100k by 2024", action: "Buy", option: "Yes", shares: 125, price: 0.65, total: 81.25 },
    { id: "2", date: "2024-09-10", market: "Presidential Election 2024", action: "Buy", option: "Democrat", shares: 200, price: 0.48, total: 96.00 },
  ];
  
  const summaryStats = [
    { label: "Invested", value: `$${portfolioStats.totalInvested.toLocaleString()}` },
    { label: "Winnings", value: `$${portfolioStats.totalWinnings.toLocaleString()}`, colorClass: "text-success" },
    { label: "Realized P&L", value: `${portfolioStats.realizedPnL < 0 ? '-' : ''}$${Math.abs(portfolioStats.realizedPnL).toLocaleString()}`, colorClass: portfolioStats.realizedPnL >= 0 ? 'text-success' : 'text-destructive' },
    { label: "Active", value: portfolioStats.activePositions },
    { label: "Trades", value: portfolioStats.completedTrades },
  ];

  const activePositions = positions.filter(p => p.status === 'Active');
  const resolvedPositions = positions.filter(p => p.status === 'Resolved');

  if (!isConnected) {
    return (
      <div className="container mx-auto py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <Wallet className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">Please connect your wallet to view your portfolio, positions, and trade history.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* --- CHANGES ARE IN THIS SECTION --- */}
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <>
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </>
        ) : farcasterUser ? (
          <>
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={farcasterUser.pfpUrl} alt={farcasterUser.displayName} />
              <AvatarFallback className="text-base font-semibold bg-gradient-primary text-primary-foreground">
                {farcasterUser.displayName?.[0] || farcasterUser.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">{farcasterUser.displayName}'s Portfolio</h1>
              <p className="text-sm text-muted-foreground">@{farcasterUser.username}</p>
            </div>
          </>
        ) : (
          <>
            <Avatar className="w-12 h-12 border-2 border-primary/20">
               <AvatarFallback className="text-base font-semibold bg-gradient-primary text-primary-foreground">
                 <User className="w-6 h-6" />
               </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Portfolio Dashboard</h1>
              <p className="text-sm text-muted-foreground">Could not load Farcaster profile.</p>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {summaryStats.map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-xl font-semibold ${stat.colorClass || ''}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
        {summaryStats.length % 2 !== 0 && <div className="hidden sm:block"></div>}
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-8">
          <div className="space-y-4">
            {activePositions.length > 0 ? (
              activePositions.map((position) => (
                <Card key={position.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="secondary">{position.category}</Badge><Badge variant="outline">{position.status}</Badge></div>
                        <h3 className="font-semibold text-lg mb-1">{position.question}</h3>
                        <p className="text-sm text-muted-foreground">{position.shares} shares of "{position.option}" @ ${position.avgPrice}</p>
                      </div>
                      <div className="flex flex-row items-start justify-end gap-6 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Value</p>
                          <p className="font-semibold text-base">${position.currentValue.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">P&L</p>
                          <p className={`font-semibold text-base ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>{position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}</p>
                        </div>
                        <div className="self-center">
                          <Button variant="outline" onClick={() => navigate(`/market/${position.id}`)}>View Market</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card><CardContent className="p-10 text-center"><PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-semibold">No Active Positions</h3><p className="text-muted-foreground">Browse the markets to start trading.</p></CardContent></Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="mt-8">
          <div className="space-y-4">
            {resolvedPositions.length > 0 ? (
              resolvedPositions.map((position) => (
                <Card key={position.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2"><Badge variant="secondary">{position.category}</Badge><Badge className="bg-success text-success-foreground">{position.status}</Badge>{position.canClaim && (<Badge className="bg-gradient-primary">Can Claim</Badge>)}</div>
                        <h3 className="font-semibold text-lg mb-1">{position.question}</h3>
                        <p className="text-sm text-muted-foreground">{position.shares} shares of "{position.option}" @ ${position.avgPrice}</p>
                      </div>
                      <div className="flex flex-row items-start justify-end gap-6 text-center">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Value</p>
                          <p className="font-semibold text-base">${position.currentValue.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">P&L</p>
                          <p className={`font-semibold text-base ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>{position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}</p>
                        </div>
                        <div className="self-center">
                           {position.canClaim && (<Button className="bg-gradient-success hover:opacity-90"><Trophy className="mr-2 h-4 w-4" />Claim</Button>)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card><CardContent className="p-10 text-center"><PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-semibold">No Resolved Positions</h3><p className="text-muted-foreground">Your completed trades will appear here once markets are resolved.</p></CardContent></Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-8">
          <Card>
            <CardHeader><CardTitle>Trade History</CardTitle></CardHeader>
            <CardContent>
              {tradeHistory.length > 0 ? (
                <div className="space-y-4">
                  {tradeHistory.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1"><span className="text-sm text-muted-foreground">{trade.date}</span><Badge variant={trade.action === "Buy" ? "default" : "outline"} className={trade.action === "Buy" ? "bg-success" : "bg-destructive"}>{trade.action}</Badge></div>
                        <p className="font-medium">{trade.market}</p>
                        <p className="text-sm text-muted-foreground">{trade.shares} shares of "{trade.option}" @ ${trade.price}</p>
                      </div>
                      <div className="text-right"><p className="font-semibold">${trade.total.toFixed(2)}</p></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-10">
                  <PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold">No Trade History</h3>
                  <p className="text-muted-foreground">Your past transactions will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;