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

const Leaderboard = () => {
  // Mock leaderboard data
  const topTraders = [
    { rank: 1, username: "PredictionKing", avatar: null, totalPnL: 15420.75, winRate: 78.5, totalTrades: 234 },
    { rank: 2, username: "CryptoOracle", avatar: null, totalPnL: 12890.30, winRate: 75.2, totalTrades: 198 },
    { rank: 3, username: "SportsBettor", avatar: null, totalPnL: 11245.60, winRate: 72.8, totalTrades: 312 },
    { rank: 4, username: "TechPredictor", avatar: null, totalPnL: 9876.40, winRate: 69.5, totalTrades: 156 },
    { rank: 5, username: "MarketMaven", avatar: null, totalPnL: 8945.20, winRate: 68.2, totalTrades: 201 }
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
        return <span className="font-bold text-base text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-primary p-3 rounded-full">
            <Trophy className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the top prediction market traders.
        </p>
      </div>

      <Tabs defaultValue="all-time" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="all-time" className="mt-8">
          {/* --- PODIUM SECTION HAS BEEN REMOVED --- */}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Top Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topTraders.map((trader) => (
                  <div 
                    key={trader.rank} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8">{getRankIcon(trader.rank)}</div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={trader.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">{trader.username}</h3>
                        <p className="text-xs text-muted-foreground">{trader.totalTrades} trades</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="h-4 w-4 text-success" />
                          <p className="font-semibold text-sm text-success">{trader.totalPnL.toLocaleString()}</p>
                        </div>
                        <p className="text-xs text-primary">{trader.winRate}% Win Rate</p>
                      </div>
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