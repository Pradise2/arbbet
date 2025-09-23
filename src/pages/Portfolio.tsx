import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { gql } from 'graphql-request';
import { client } from "@/lib/graphql";
import { formatEther } from "viem";

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

// --- TypeScript Types for the GraphQL Response ---
interface Position {
  id: string;
  user: string;
  shares: string[]; // Comes as an array of BigInt strings
  market: {
    id: string; // This is the marketId
    question: string;
    category: number;
    status: "Active" | "Resolved" | "Invalidated";
    options: string[];
  };
}

interface PortfolioData {
  positions: Position[];
}

// --- GraphQL Query to get a user's positions ---
const GET_USER_POSITIONS = gql`
  query GetUserPositions($userAddress: Bytes!) {
    positions(where: { user: $userAddress }, orderBy: market__blockTimestamp, orderDirection: desc) {
      id
      user
      shares
      market {
        id
        question
        category
        status
        options
      }
    }
  }
`;

const categoryMap: { [key: number]: string } = {
  0: 'POLITICS', 1: 'SPORTS', 2: 'CRYPTO', 3: 'ENTERTAINMENT', 4: 'TECH', 5: 'FINANCE', 6: 'OTHER'
};

const Portfolio = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const { data, isLoading, isError } = useQuery<PortfolioData>({
    queryKey: ['userPositions', address],
    queryFn: async () => await client.request(GET_USER_POSITIONS, { userAddress: address?.toLowerCase() }),
    enabled: !!isConnected && !!address,
  });
  
  // Farcaster data fetching can be added back here if needed
  const [farcasterUser, setFarcasterUser] = useState<any>(null);

  if (!isConnected) {
    return (
      <div className="container mx-auto py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <Wallet className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">Please connect your wallet to view your portfolio.</p>
      </div>
    );
  }

  const allPositions = data?.positions || [];
  const activePositions = allPositions.filter(p => p.market.status === 'Active');
  const resolvedPositions = allPositions.filter(p => p.market.status === 'Resolved');
  
  // Mock stats can be replaced later with more complex Subgraph aggregations
  const portfolioStats = { totalInvested: 2450.75, totalWinnings: 1820.30, realizedPnL: -630.45 };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center space-x-4">
        <Avatar className="w-12 h-12 border-2 border-primary/20">
          <AvatarFallback className="text-base font-semibold bg-gradient-primary text-primary-foreground"><User className="w-6 h-6" /></AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">My Portfolio</h1>
          <p className="text-sm text-muted-foreground font-mono">{address}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ... (Summary cards with mock data) ... */}
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-8">
          <div className="space-y-4">
            {isLoading ? ( <Skeleton className="h-28 w-full rounded-lg" /> ) : 
             activePositions.length > 0 ? (
              activePositions.map((position) => (
                <Card key={position.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{categoryMap[position.market.category]}</Badge>
                          <Badge variant="outline">{position.market.status}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{position.market.question}</h3>
                        <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                          {position.market.options.map((opt, index) => (
                            <span key={index}>
                              <b>{opt}:</b> {parseFloat(formatEther(BigInt(position.shares[index]))).toFixed(2)} shares
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-end gap-6 text-center">
                        <div><p className="text-sm text-muted-foreground mb-1">Value</p><p className="font-semibold text-base">$0.00</p></div>
                        <div><p className="text-sm text-muted-foreground mb-1">P&L</p><p className="font-semibold text-base text-gray-500">$0.00</p></div>
                        <div className="self-center"><Button variant="outline" onClick={() => navigate(`/market/${position.market.id}`)}>View Market</Button></div>
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
            {isLoading ? ( <Skeleton className="h-28 w-full rounded-lg" /> ) :
             resolvedPositions.length > 0 ? (
              resolvedPositions.map((position) => (
                <Card key={position.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{categoryMap[position.market.category]}</Badge>
                          <Badge className="bg-success text-success-foreground">{position.market.status}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{position.market.question}</h3>
                         <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                          {position.market.options.map((opt, index) => (
                            <span key={index}>
                              <b>{opt}:</b> {parseFloat(formatEther(BigInt(position.shares[index]))).toFixed(2)} shares
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-end gap-6 text-center">
                        <div><p className="text-sm text-muted-foreground mb-1">Value</p><p className="font-semibold text-base text-success">$100.00</p></div>
                        <div><p className="text-sm text-muted-foreground mb-1">P&L</p><p className="font-semibold text-base text-success">+$25.00</p></div>
                        <div className="self-center"><Button className="bg-gradient-success hover:opacity-90"><Trophy className="mr-2 h-4 w-4" />Claim</Button></div>
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
                <CardContent className="p-10 text-center text-muted-foreground">
                    Trade history from the Subgraph is coming soon.
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;