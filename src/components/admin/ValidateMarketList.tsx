// src/components/admin/ValidateMarketList.tsx
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { policastMarketV3Address, policastMarketV3Abi } from "@/lib/contract";
import { toast } from "sonner";
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Query to get all created and all validated markets
const GET_VALIDATION_DATA = gql`
  query GetValidationData {
    marketCreateds(orderBy: blockTimestamp, orderDirection: desc) {
      marketId
      question
    }
    marketValidateds {
      marketId
    }
  }
`;

const ValidateMarketList = () => {
  const { data, isLoading, isError, refetch } = useQuery<any>({
    queryKey: ['validationData'],
    queryFn: async () => await client.request(GET_VALIDATION_DATA),
  });

  const { data: hash, writeContract, isPending } = useWriteContract();
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
      toast.success("Market validated successfully!");
      refetch(); // Refetch the list to remove the validated market
    }
  }, [isConfirmed, refetch]);
  
  if (isLoading) return <Skeleton className="h-48 w-full" />;
  if (isError) return <p className="text-destructive">Failed to load markets for validation.</p>;

  const validatedMarketIds = new Set(data?.marketValidateds.map((m: any) => m.marketId) || []);
  const unvalidatedMarkets = data?.marketCreateds.filter((m: any) => !validatedMarketIds.has(m.marketId)) || [];

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
            <div key={market.marketId} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold">{market.question}</p>
                <p className="text-sm text-muted-foreground">ID: {market.marketId}</p>
              </div>
              <Button 
                size="sm" 
                onClick={() => handleValidate(market.marketId)}
                disabled={isPending || isConfirming}
              >
                Validate
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ValidateMarketList;