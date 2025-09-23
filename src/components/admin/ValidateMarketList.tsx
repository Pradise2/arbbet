import { useQuery, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { policastMarketV3Address, policastMarketV3Abi } from "@/lib/contract";
import { toast } from "sonner";
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// --- UPDATED GraphQL Query ---
// We now query the aggregated Market entity and filter for "Pending" status.
const GET_PENDING_MARKETS = gql`
  query GetPendingMarkets {
    markets(where: { status: "Pending" }, orderBy: blockTimestamp, orderDirection: desc) {
      id
      question
    }
  }
`;

const ValidateMarketList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ['pendingMarkets'], // A new, descriptive query key
    queryFn: async () => await client.request(GET_PENDING_MARKETS),
  });

  const { data: hash, writeContract, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleValidate = (marketId: string) => {
    toast.info("Please confirm validation in your wallet.");
    writeContract({
      address: policastMarketV3Address,
      abi: policastMarketV3Abi,
      functionName: "validateMarket",
      args: [BigInt(marketId)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Market validated successfully! Refreshing list...");
      // Invalidate the query to refetch the list.
      // The validated market's status will change, so it will disappear from this list.
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['pendingMarkets'] });
      }, 2000); // 2-second delay to allow the subgraph to index the change
      reset();
    }
  }, [isConfirmed, queryClient, reset]);
  
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (isError) return <p className="text-destructive">Failed to load markets for validation.</p>;

  // --- Data Handling is now much simpler ---
  const unvalidatedMarkets = data?.markets || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validate Pending Markets</CardTitle>
        <CardDescription>
          These markets have been created but require validation before trading can begin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {unvalidatedMarkets.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No markets are currently pending validation.</p>
        ) : (
          unvalidatedMarkets.map((market: any) => (
            <div key={market.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">{market.question}</p>
                <p className="text-sm text-muted-foreground">ID: {market.id}</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleValidate(market.id)}
                disabled={isPending || isConfirming}
              >
                {isPending || isConfirming ? "Validating..." : "Validate"}
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ValidateMarketList;