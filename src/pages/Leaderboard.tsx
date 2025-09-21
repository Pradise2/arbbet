import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award,
  TrendingUp,
  DollarSign,
  Crown,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

const Leaderboard = () => {
  // Mock leaderboard data
  const topTraders = [
    { rank: 1, username: "PredictionKing", avatar: null, totalPnL: 15420.75, winRate: 78.5, totalTrades: 234 },
    { rank: 2, username: "CryptoOracle", avatar: null, totalPnL: 12890.30, winRate: 75.2, totalTrades: 198 },
    { rank: 3, username: "SportsBettor", avatar: null, totalPnL: 11245.60, winRate: 72.8, totalTrades: 312 },
    { rank: 4, username: "TechPredictor", avatar: null, totalPnL: 9876.40, winRate: 69.5, totalTrades: 156 },
    { rank: 5, username: "MarketMaven", avatar: null, totalPnL: 8945.20, winRate: 68.2, totalTrades: 201 },
    { rank: 6, username: "You", avatar: null, totalPnL: 8500.50, winRate: 65.0, totalTrades: 150 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="font-bold text-sm text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-primary p-2 rounded-full">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-base text-muted-foreground">
          Discover the top traders.
        </p>
      </div>

      <Tabs defaultValue="all-time" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="all-time" className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topTraders.map((trader) => (
                  <div 
                    key={trader.rank} 
                    className={cn(
                      "flex items-center justify-between p-2.5 border rounded-lg transition-colors",
                      trader.username === 'You' 
                        ? 'bg-primary/10 border-primary/50' 
                        : 'hover:bg-accent/50'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8">{getRankIcon(trader.rank)}</div>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={trader.avatar || undefined} />
                        <AvatarFallback className={cn(
                          "text-xs",
                          trader.username === 'You' ? 'bg-primary text-primary-foreground' : 'bg-gradient-primary text-primary-foreground'
                        )}>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {/* --- CHANGE IS HERE --- */}
                        <h3 className="font-semibold text-sm">
                          {trader.username === 'You'
                            ? trader.username
                            : trader.username.length > 5
                            ? `${trader.username.substring(0, 5)}...`
                            : trader.username}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-tight">{trader.totalTrades}</p>
                        <p className="text-xs text-muted-foreground leading-tight">trades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-success" />
                        <p className="font-semibold text-sm text-success">{trader.totalPnL.toLocaleString()}</p>
                      </div>
                      <p className="text-xs text-primary">{trader.winRate}% Win Rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-8">
            <Card><CardContent className="p-12 text-center"><TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" /><h3 className="text-xl font-semibold mb-2">Monthly Leaderboard</h3><p className="text-muted-foreground">Monthly rankings are coming soon.</p></CardContent></Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-8">
            <Card><CardContent className="p-12 text-center"><TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" /><h3 className="text-xl font-semibold mb-2">Weekly Leaderboard</h3><p className="text-muted-foreground">Weekly rankings are coming soon.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;