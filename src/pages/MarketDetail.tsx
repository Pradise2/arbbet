import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Volume2, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Users,
  DollarSign,
  ArrowUpDown
} from "lucide-react";

const MarketDetail = () => {
  const { id } = useParams();
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [swapFromOption, setSwapFromOption] = useState("Yes");
  const [swapToOption, setSwapToOption] = useState("No");
  const [swapAmount, setSwapAmount] = useState("");

  // Mock market data
  const market = {
    id: id || "1",
    question: "Will Bitcoin reach $100,000 by the end of 2024?",
    description: "This market will resolve to 'Yes' if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before January 1, 2025, 00:00 UTC. The price must be sustained for at least 5 minutes to count.",
    category: "CRYPTO",
    status: "Active",
    options: [
      { name: "Yes", price: 68, shares: 1250000, color: "success" },
      { name: "No", price: 32, shares: 580000, color: "destructive" }
    ],
    volume: "$125,420",
    totalLiquidity: "$89,340",
    timeRemaining: "23 days",
    endTime: "2024-12-31T23:59:59Z",
    createdAt: "2024-08-15T10:00:00Z",
    userShares: { Yes: 125, No: 0 }
  };

  const calculateEstimatedCost = (amount: string) => {
    const num = parseFloat(amount) || 0;
    return (num * 0.68).toFixed(2); // Simplified calculation
  };

  const calculateEstimatedRevenue = (amount: string) => {
    const num = parseFloat(amount) || 0;
    return (num * 0.64).toFixed(2); // Simplified calculation
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Market Info & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{market.category}</Badge>
              <Badge 
                variant="outline" 
                className={market.status === "Active" ? "border-success text-success" : ""}
              >
                {market.status}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight">{market.question}</h1>
            <p className="text-muted-foreground leading-relaxed">{market.description}</p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Volume2 className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Volume</p>
                <p className="font-semibold">{market.volume}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Liquidity</p>
                <p className="font-semibold">{market.totalLiquidity}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className="font-semibold">{market.timeRemaining}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Traders</p>
                <p className="font-semibold">1,247</p>
              </CardContent>
            </Card>
          </div>

          {/* Price Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Price History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive price chart would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Trading Interface */}
        <div className="space-y-6">
          {/* Market Options */}
          <Card>
            <CardHeader>
              <CardTitle>Market Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {market.options.map((option, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{option.name}</span>
                    <span className="font-bold text-lg text-primary">{option.price}%</span>
                  </div>
                  <Progress value={option.price} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{option.shares.toLocaleString()} shares</span>
                    <span>${(option.shares * option.price / 100).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trading Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                  <TabsTrigger value="swap">Swap</TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="buy-option">Option</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Yes - 68%</option>
                      <option>No - 32%</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buy-amount">Quantity (shares)</Label>
                    <Input
                      id="buy-amount"
                      type="number"
                      placeholder="0"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Cost:</span>
                      <span className="font-semibold">${calculateEstimatedCost(buyAmount)} USDC</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-success hover:opacity-90">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Buy Shares
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-option">Option</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Yes - 125 shares available</option>
                      <option>No - 0 shares available</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sell-amount">Quantity (shares)</Label>
                    <Input
                      id="sell-amount"
                      type="number"
                      placeholder="0"
                      max="125"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                    />
                  </div>
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span>Estimated Revenue:</span>
                      <span className="font-semibold">${calculateEstimatedRevenue(sellAmount)} USDC</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-danger hover:opacity-90">
                    <TrendingDown className="mr-2 h-4 w-4" />
                    Sell Shares
                  </Button>
                </TabsContent>

                <TabsContent value="swap" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>From</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={swapFromOption}
                      onChange={(e) => setSwapFromOption(e.target.value)}
                    >
                      <option value="Yes">Yes - 125 shares</option>
                      <option value="No">No - 0 shares</option>
                    </select>
                  </div>
                  <div className="flex justify-center">
                    <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label>To</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={swapToOption}
                      onChange={(e) => setSwapToOption(e.target.value)}
                    >
                      <option value="No">No - 32%</option>
                      <option value="Yes">Yes - 68%</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swap-amount">Amount to swap</Label>
                    <Input
                      id="swap-amount"
                      type="number"
                      placeholder="0"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                    />
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Swap Positions
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Your Position */}
          <Card>
            <CardHeader>
              <CardTitle>Your Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Yes shares:</span>
                <span className="font-semibold">{market.userShares.Yes}</span>
              </div>
              <div className="flex justify-between">
                <span>No shares:</span>
                <span className="font-semibold">{market.userShares.No}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Current Value:</span>
                <span className="font-semibold text-primary">
                  ${((market.userShares.Yes * 0.68) + (market.userShares.No * 0.32)).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;