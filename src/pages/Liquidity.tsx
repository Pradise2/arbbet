import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Gift,
  PackageOpen
} from "lucide-react";

const Liquidity = () => {
  const [addLiquidityAmount, setAddLiquidityAmount] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  // Mock data
  const lpStats = { totalProvided: 5240.50, totalRewards: 312.75, activePositions: 3, apy: 12.4 };
  const lpPositions = [
    { id: "1", market: "Will Bitcoin reach $100,000 by the end of 2024?", category: "CRYPTO", contribution: 1500.00, currentValue: 1587.50, rewards: 127.30, apy: 15.2, canClaim: true },
    { id: "2", market: "Who will win the 2024 US Presidential Election?", category: "POLITICS", contribution: 2000.00, currentValue: 2140.25, rewards: 98.75, apy: 11.8, canClaim: false },
    { id: "3", market: "Will Taylor Swift release a new album in 2024?", category: "ENTERTAINMENT", contribution: 1740.50, currentValue: 1826.88, rewards: 86.70, apy: 9.6, canClaim: true }
  ];
  const availableMarkets = [
    { id: "4", name: "Will OpenAI release GPT-5 before 2025?", category: "TECH", volume: "$234,567" },
    { id: "5", name: "Will the Lakers make the NBA playoffs?", category: "SPORTS", volume: "$156,780" },
    { id: "6", name: "Will Ethereum reach $5,000 by 2025?", category: "CRYPTO", volume: "$89,320" }
  ];

  const summaryStats = [
    { label: "Provided", value: `$${lpStats.totalProvided.toLocaleString()}` },
    { label: "Rewards", value: `$${lpStats.totalRewards.toLocaleString()}`, colorClass: "text-success" },
    { label: "Avg. APY", value: `${lpStats.apy}%`, colorClass: "text-primary" },
    { label: "Positions", value: lpStats.activePositions },
  ];

  const availablePositions = lpPositions.filter(p => p.canClaim);
  const claimedPositions = lpPositions.filter(p => !p.canClaim);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Liquidity Provision</h1>
        <p className="text-muted-foreground">Earn rewards by providing liquidity to prediction markets</p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="available">
            <CardHeader className="px-0">
              <CardTitle>Your LP Positions</CardTitle>
              <TabsList className="grid w-full grid-cols-2 max-w-sm mt-2">
                <TabsTrigger value="available">Available to Claim</TabsTrigger>
                <TabsTrigger value="claimed">Claimed</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <TabsContent value="available" className="space-y-4">
              {availablePositions.length > 0 ? (
                availablePositions.map((position) => (
                  <Card key={position.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">{position.category}</Badge>
                          <h3 className="font-semibold leading-tight">{position.market}</h3>
                        </div>
                        <div className="flex flex-row items-start justify-end gap-6 text-center">
                          {/* --- FONT SIZE CHANGE --- */}
                          <div><p className="text-sm text-muted-foreground mb-1">Value</p><p className="font-semibold text-sm">${position.currentValue.toLocaleString()}</p></div>
                          <div><p className="text-sm text-muted-foreground mb-1">Rewards</p><p className="font-semibold text-sm text-success">${position.rewards.toFixed(2)}</p></div>
                          <div><p className="text-sm text-muted-foreground mb-1">APY</p><p className="font-semibold text-sm text-primary">{position.apy}%</p></div>
                          <div className="self-center"><Button className="bg-gradient-success hover:opacity-90"><Gift className="mr-2 h-4 w-4" />Claim</Button></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card><CardContent className="p-10 text-center"><PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-semibold">No Rewards Available</h3><p className="text-muted-foreground">Rewards you can claim will appear here.</p></CardContent></Card>
              )}
            </TabsContent>

            <TabsContent value="claimed" className="space-y-4">
              {claimedPositions.length > 0 ? (
                claimedPositions.map((position) => (
                  <Card key={position.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">{position.category}</Badge>
                          <h3 className="font-semibold leading-tight">{position.market}</h3>
                        </div>
                        <div className="flex flex-row items-start justify-end gap-6 text-center">
                          {/* --- FONT SIZE CHANGE --- */}
                          <div><p className="text-sm text-muted-foreground mb-1">Value</p><p className="font-semibold text-sm">${position.currentValue.toLocaleString()}</p></div>
                          <div><p className="text-sm text-muted-foreground mb-1">Rewards</p><p className="font-semibold text-sm text-success">${position.rewards.toFixed(2)}</p></div>
                          <div><p className="text-sm text-muted-foreground mb-1">APY</p><p className="font-semibold text-sm text-primary">{position.apy}%</p></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card><CardContent className="p-10 text-center"><PackageOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" /><h3 className="text-xl font-semibold">No Other Positions</h3><p className="text-muted-foreground">Your other liquidity positions will appear here.</p></CardContent></Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Add Liquidity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label htmlFor="market-select">Select Market</Label><select id="market-select" className="w-full p-2 border rounded-md" value={selectedMarket} onChange={(e) => setSelectedMarket(e.target.value)}><option value="">Choose a market...</option>{availableMarkets.map((market) => (<option key={market.id} value={market.id}>{market.name} - {market.volume}</option>))}</select></div>
              <div className="space-y-2"><Label htmlFor="liquidity-amount">Amount (USDC)</Label><Input id="liquidity-amount" type="number" placeholder="0.00" value={addLiquidityAmount} onChange={(e) => setAddLiquidityAmount(e.target.value)} /></div>
              {selectedMarket && addLiquidityAmount && (<div className="bg-muted p-3 rounded-md space-y-2"><div className="flex justify-between text-sm"><span>Estimated APY:</span><span className="font-semibold text-primary">11.5%</span></div><div className="flex justify-between text-sm"><span>Est. Monthly Rewards:</span><span className="font-semibold text-success">${((parseFloat(addLiquidityAmount) * 0.115) / 12).toFixed(2)}</span></div></div>)}
              <Button className="w-full bg-gradient-primary hover:opacity-90" disabled={!selectedMarket || !addLiquidityAmount}><Plus className="mr-2 h-4 w-4" />Add Liquidity</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>How It Works</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-3"><div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">1</div><p>Provide USDC to market liquidity pools</p></div>
              <div className="flex items-start gap-3"><div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">2</div><p>Earn fees from trades in that market</p></div>
              <div className="flex items-start gap-3"><div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">3</div><p>Claim rewards anytime or compound them</p></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;