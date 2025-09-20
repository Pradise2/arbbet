import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Medal, 
  Award,
  TrendingUp,
  DollarSign,
  Target,
  Crown,
  Star,
  User
} from "lucide-react";

const Leaderboard = () => {
  // Mock leaderboard data
  const topTraders = [
    {
      rank: 1,
      username: "PredictionKing",
      avatar: null,
      totalPnL: 15420.75,
      winRate: 78.5,
      totalTrades: 234,
      correctPredictions: 184,
      badges: ["Top Trader", "Politics Expert"]
    },
    {
      rank: 2,
      username: "CryptoOracle",
      avatar: null,
      totalPnL: 12890.30,
      winRate: 75.2,
      totalTrades: 198,
      correctPredictions: 149,
      badges: ["Crypto Master", "High Volume"]
    },
    {
      rank: 3,
      username: "SportsBettor",
      avatar: null,
      totalPnL: 11245.60,
      winRate: 72.8,
      totalTrades: 312,
      correctPredictions: 227,
      badges: ["Sports Expert", "Consistent"]
    },
    {
      rank: 4,
      username: "TechPredictor",
      avatar: null,
      totalPnL: 9876.40,
      winRate: 69.5,
      totalTrades: 156,
      correctPredictions: 108,
      badges: ["Tech Guru"]
    },
    {
      rank: 5,
      username: "MarketMaven",
      avatar: null,
      totalPnL: 8945.20,
      winRate: 68.2,
      totalTrades: 201,
      correctPredictions: 137,
      badges: ["Rising Star"]
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="font-bold text-lg text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankCardStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-500/50 bg-gradient-to-r from-yellow-50 to-amber-50 shadow-glow";
      case 2:
        return "border-gray-400/50 bg-gradient-to-r from-gray-50 to-slate-50";
      case 3:
        return "border-amber-600/50 bg-gradient-to-r from-amber-50 to-orange-50";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-primary p-4 rounded-full">
            <Trophy className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the top prediction market traders and their incredible performance
        </p>
      </div>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="all-time" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="monthly">This Month</TabsTrigger>
          <TabsTrigger value="weekly">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="all-time" className="mt-8">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topTraders.slice(0, 3).map((trader, index) => (
              <Card 
                key={trader.rank} 
                className={`${getRankCardStyle(trader.rank)} ${index === 0 ? 'md:order-2 transform md:scale-105' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center mb-3">
                    {getRankIcon(trader.rank)}
                  </div>
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={trader.avatar || undefined} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{trader.username}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-center items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="font-bold text-success text-xl">
                        ${trader.totalPnL.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-center items-center space-x-1">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">
                        {trader.winRate}% Win Rate
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {trader.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Top Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTraders.map((trader) => (
                  <div 
                    key={trader.rank} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(trader.rank)}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={trader.avatar || undefined} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{trader.username}</h3>
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <span>{trader.totalTrades} trades</span>
                          <span>{trader.correctPredictions} correct</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-success" />
                          <span className="font-bold text-success">
                            ${trader.totalPnL.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary font-medium">
                            {trader.winRate}%
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {trader.badges.slice(0, 2).map((badge, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-8">
          <Card>
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Monthly Leaderboard</h3>
              <p className="text-muted-foreground">
                Monthly rankings will be displayed here based on this month's performance.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="mt-8">
          <Card>
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Weekly Leaderboard</h3>
              <p className="text-muted-foreground">
                Weekly rankings will be displayed here based on this week's performance.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;