// src/components/admin/ResolveMarketList.tsx
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { policastMarketV3Address, policastMarketV3Abi } from "@/lib/contract";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// --- UPDATED QUERY: Removed earlyResolutionAllowed ---
const GET_RESOLVABLE_MARKETS = gql`
  query GetResolvableMarkets {
    markets(where: { status: "Active" }, orderBy: endTime, orderDirection: asc) {
      id
      question
      options
      endTime
    }
  }
`;

const ResolveMarketList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery<any>({
    queryKey: ['resolvableMarkets'],
    queryFn: async () => await client.request(GET_RESOLVABLE_MARKETS),
  });

  const [selectedWinningOption, setSelectedWinningOption] = useState<string | null>(null);
  const { data: hash, writeContract, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleResolve = (marketId: string) => {
    if (selectedWinningOption === null) { toast.error("Please select a winning option."); return; }
    toast.info("Please confirm resolution in your wallet.");
    writeContract({
      address: policastMarketV3Address,
      abi: policastMarketV3Abi,
      functionName: "resolveMarket",
      args: [BigInt(marketId), BigInt(selectedWinningOption)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Market resolved successfully! Refreshing list...");
      setTimeout(() => { queryClient.invalidateQueries({ queryKey: ['resolvableMarkets'] }); }, 2000);
      reset();
    }
  }, [isConfirmed, queryClient, reset]);
  
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (isError) return <p className="text-destructive">Failed to load markets for resolution.</p>;

  // --- UPDATED FILTER: Only check endTime ---
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const resolvableMarkets = data?.markets.filter(
    (m: any) => parseInt(m.endTime) < nowInSeconds
  ) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolve Ended Markets</CardTitle>
        <CardDescription>
          These markets are active but have passed their end time and can now be resolved.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resolvableMarkets.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No markets are currently ready for resolution.</p>
        ) : (
          resolvableMarkets.map((market: any) => (
            <div key={market.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">{market.question}</p>
                <p className="text-sm text-muted-foreground">ID: {market.id}</p>
              </div>
              <AlertDialog onOpenChange={() => setSelectedWinningOption(null)}>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="destructive">Resolve</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Resolve Market: "{market.question}"</AlertDialogTitle>
                    <AlertDialogDescription>Please select the correct winning outcome. This action is irreversible.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="py-4">
                    <RadioGroup onValueChange={setSelectedWinningOption}>
                      {market.options.map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={String(index)} id={`option-${market.id}-${index}`} />
                          <Label htmlFor={`option-${market.id}-${index}`}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleResolve(market.id)} disabled={isPending || isConfirming}>
                      {isPending || isConfirming ? "Processing..." : "Confirm Resolution"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ResolveMarketList;