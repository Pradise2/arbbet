import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from 'graphql-request';
import { client } from "@/lib/graphql";
import { formatTimeRemaining } from "@/lib/utils";
import { formatEther, parseEther, erc20Abi, maxUint256 } from "viem";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract, useReadContracts } from "wagmi";
import { policastMarketV3Address, policastMarketV3Abi } from "@/lib/contract";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpDown,
  AlertCircle
} from "lucide-react";

// --- TypeScript Types ---
interface Market {
  id: string;
  question: string;
  options: string[];
  endTime: string;
  category: number;
  status: "Active" | "Resolved" | "Invalidated";
  totalVolume: string;
  traderCount: string;
}

interface MarketDetailData {
  market: Market | null;
}

// --- GraphQL Query ---
const GET_MARKET_BY_ID = gql`
  query GetMarketById($marketId: ID!) {
    market(id: $marketId) {
      id
      question
      options
      endTime
      category
      status
      totalVolume
      traderCount
    }
  }
`;

const categoryMap: { [key: number]: string } = {
  0: 'POLITICS', 1: 'SPORTS', 2: 'CRYPTO', 3: 'ENTERTAINMENT', 4: 'TECH', 5: 'FINANCE', 6: 'OTHER'
};

const MarketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [buyQuantity, setBuyQuantity] = useState("");
  const [selectedBuyOption, setSelectedBuyOption] = useState(0);
  const [sellQuantity, setSellQuantity] = useState("");
  const [selectedSellOption, setSelectedSellOption] = useState(0);
  const [lastAction, setLastAction] = useState<'buy' | 'sell' | 'approve' | null>(null);

  const { data: subgraphData, isLoading: isSubgraphLoading, isError: isSubgraphError } = useQuery<MarketDetailData>({
    queryKey: ['marketDetail', id],
    queryFn: async () => await client.request(GET_MARKET_BY_ID, { marketId: id }),
    enabled: !!id,
  });

  const marketOptions = subgraphData?.market?.options || [];
  const { data: optionData, isLoading: arePricesLoading, refetch: refetchPrices } = useReadContracts({
    contracts: marketOptions.map((_: string, index: number) => ({
      address: policastMarketV3Address, abi: policastMarketV3Abi, functionName: 'getMarketOption', args: [BigInt(id!), BigInt(index)],
    })),
    enabled: marketOptions.length > 0,
  });
  
  const { data: userShares, refetch: refetchUserShares } = useReadContract({
    address: policastMarketV3Address, abi: policastMarketV3Abi, functionName: 'getUserShares', args: [BigInt(id!), address!], enabled: !!address && !!id,
  });

  const { data: bettingTokenAddress } = useReadContract({
    address: policastMarketV3Address, abi: policastMarketV3Abi, functionName: 'getBettingToken',
  });

  const { data: allowance, isLoading: isAllowanceLoading, refetch: refetchAllowance } = useReadContract({
    address: bettingTokenAddress as `0x${string}` | undefined, abi: erc20Abi, functionName: 'allowance', args: [address!, policastMarketV3Address], enabled: !!address && !!bettingTokenAddress,
  });
  
  const estimatedCost = parseEther((parseFloat(buyQuantity) > 0 ? (parseFloat(buyQuantity) * 0.5).toString() : '0'));
  const needsApproval = isConnected && allowance !== undefined && allowance < estimatedCost;

  const handleBuySubmit = () => {
    if (!isConnected) { toast.error("Please connect your wallet."); return; }
    if (needsApproval) {
      setLastAction('approve');
      toast.info("Please approve token spending...");
      writeContract({ address: bettingTokenAddress as `0x${string}`, abi: erc20Abi, functionName: "approve", args: [policastMarketV3Address, maxUint256] });
    } else {
      setLastAction('buy');
      toast.info("Please confirm transaction...");
      writeContract({ address: policastMarketV3Address, abi: policastMarketV3Abi, functionName: "buyShares", args: [ BigInt(id!), BigInt(selectedBuyOption), parseEther(buyQuantity), maxUint256 ] });
    }
  };

  const handleSellSubmit = () => {
    if (!isConnected) { toast.error("Please connect your wallet."); return; }
    setLastAction('sell');
    toast.info("Please confirm transaction...");
    writeContract({ address: policastMarketV3Address, abi: policastMarketV3Abi, functionName: "sellShares", args: [ BigInt(id!), BigInt(selectedSellOption), parseEther(sellQuantity), BigInt(0) ] });
  };

  useEffect(() => {
    if (isPending) { toast.loading("Confirm in your wallet..."); }
    if (isConfirming) { toast.loading("Transaction is confirming..."); }
    if (isConfirmed) {
      toast.dismiss();
      switch(lastAction) {
        case 'approve': toast.success("Approval successful!"); setTimeout(() => refetchAllowance(), 1500); break;
        case 'buy': toast.success("Shares purchased! Refreshing data..."); setBuyQuantity(""); break;
        case 'sell': toast.success("Shares sold! Refreshing data..."); setSellQuantity(""); break;
      }
      if (lastAction === 'buy' || lastAction === 'sell') {
        setTimeout(() => {
          toast.info("Data refreshed!");
          queryClient.invalidateQueries({ queryKey: ['marketDetail', id] });
          refetchPrices();
          refetchUserShares();
        }, 3000);
      }
      reset();
    }
    if (error) { toast.error("Transaction failed", { description: error.message }); reset(); }
  }, [isPending, isConfirming, isConfirmed, error, lastAction, id, queryClient, refetchPrices, refetchUserShares, refetchAllowance, reset]);

  if (isSubgraphLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6"><Skeleton className="h-8 w-1/4" /><Skeleton className="h-10 w-full" /><Skeleton className="h-20 w-full" /><Skeleton className="h-24 w-full" /></div>
          <div className="space-y-6"><Skeleton className="h-48 w-full" /><Skeleton className="h-64 w-full" /></div>
        </div>
      </div>
    );
  }

  if (isSubgraphError || !subgraphData?.market) {
    return (
      <div className="container mx-auto py-20 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive">Market Not Found</h1>
        <p className="text-muted-foreground">The market you are looking for (ID: {id}) does not exist or has not been indexed yet.</p>
      </div>
    );
  }

  const rawPrices = optionData?.map(option => (option?.result as any[])?.[4] as bigint || BigInt(0)) || [];
  const sumOfRawPrices = rawPrices.reduce((sum, current) => sum + current, BigInt(0));

  const market = {
    ...subgraphData.market,
    category: categoryMap[subgraphData.market.category] || 'OTHER',
    volume: `$${parseFloat(formatEther(BigInt(subgraphData.market.totalVolume))).toFixed(2)}`,
    traders: subgraphData.market.traderCount,
    stats: { liquidity: "$0" },
    optionsWithPrice: subgraphData.market.options.map((optName: string, index: number) => {
      const rawPrice = rawPrices[index] || BigInt(0);
      let normalizedPrice = 0;
      if (sumOfRawPrices > BigInt(0)) {
        const priceAsFloat = parseFloat(formatEther(rawPrice));
        const sumAsFloat = parseFloat(formatEther(sumOfRawPrices));
        normalizedPrice = parseFloat(((priceAsFloat / sumAsFloat) * 100).toFixed(2));
      }
      return { name: optName, price: normalizedPrice };
    }),
  };
  
  const userBalanceForOption = (optionIndex: number) => (userShares as bigint[])?.[optionIndex] || BigInt(0);
  const canSell = userBalanceForOption(selectedSellOption) >= parseEther(sellQuantity || '0');

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3"><Badge variant="secondary">{market.category}</Badge><Badge variant="outline" className={market.status === "Active" ? "border-success text-success" : ""}>{market.status}</Badge></div>
            <h1 className="text-2xl font-bold leading-tight">{market.question}</h1>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><p className="text-xs text-muted-foreground">Volume</p><p className="font-semibold text-sm">{market.volume}</p></div>
                <div><p className="text-xs text-muted-foreground">Liquidity</p><p className="font-semibold text-sm">{market.stats.liquidity}</p></div>
                <div><p className="text-xs text-muted-foreground">Ends In</p><p className="font-semibold text-sm">{formatTimeRemaining(parseInt(market.endTime) * 1000)}</p></div>
                <div><p className="text-xs text-muted-foreground">Traders</p><p className="font-semibold text-sm">{market.traders}</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Market Options</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {arePricesLoading ? (
                <div className="space-y-4"><Skeleton className="h-8 w-full" /><Skeleton className="h-8 w-full" /></div>
              ) : (
                market.optionsWithPrice.map((option, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center"><span className="font-medium">{option.name}</span><span className="font-bold text-lg text-primary">{option.price}%</span></div>
                    <Progress value={option.price} className="h-3" />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Trade</CardTitle></CardHeader>
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
                    <select className="w-full p-2 border rounded-md" value={selectedBuyOption} onChange={(e) => setSelectedBuyOption(Number(e.target.value))}>
                      {market.options.map((opt, index) => <option key={index} value={index}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2"><Label htmlFor="buy-amount">Quantity</Label><Input id="buy-amount" type="number" placeholder="0" value={buyQuantity} onChange={(e) => setBuyQuantity(e.target.value)} /></div>
                  <div className="bg-muted p-3 rounded-md"><div className="flex justify-between text-sm"><span>Estimated Cost:</span><span className="font-semibold">{formatEther(estimatedCost)} Tokens</span></div></div>
                  <Button className="w-full bg-gradient-success hover:opacity-90" onClick={handleBuySubmit} disabled={isAllowanceLoading || isPending || isConfirming || !buyQuantity || parseFloat(buyQuantity) <= 0}>
                    {isAllowanceLoading ? 'Checking approval...' : isPending || isConfirming ? 'Processing...' : needsApproval ? `Approve Tokens` : 'Buy Shares'}
                  </Button>
                </TabsContent>
                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-option">Option</Label>
                    <select className="w-full p-2 border rounded-md" value={selectedSellOption} onChange={(e) => setSelectedSellOption(Number(e.target.value))}>
                      {market.options.map((opt, index) => (
                        <option key={index} value={index}>{opt} - Balance: {parseFloat(formatEther(userBalanceForOption(index))).toFixed(2)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2"><Label htmlFor="sell-amount">Quantity</Label><Input id="sell-amount" type="number" placeholder="0" value={sellQuantity} onChange={(e) => setSellQuantity(e.target.value)} /></div>
                  {!canSell && sellQuantity && <p className="text-sm text-destructive">Insufficient share balance.</p>}
                  <Button className="w-full bg-gradient-danger hover:opacity-90" onClick={handleSellSubmit} disabled={isPending || isConfirming || !sellQuantity || !canSell || parseFloat(sellQuantity) <= 0}>
                    {isPending || isConfirming ? 'Processing...' : 'Sell Shares'}
                  </Button>
                </TabsContent>
                <TabsContent value="swap" className="space-y-4 mt-4">
                  <div className="space-y-2 text-center text-muted-foreground p-4">Swap functionality coming soon.</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;