import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql } from 'graphql-request';
import { client } from "@/lib/graphql";
import { formatTimeRemaining } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import MarketCard from "@/components/MarketCard";
import { Skeleton } from "@/components/ui/skeleton";

// --- TypeScript types for our GraphQL response ---
interface MarketCreated {
  id: string;
  marketId: string;
  question: string;
  options: string[];
  endTime: string;
  category: number;
  blockTimestamp: string;
}

interface MarketResolved {
  marketId: string;
  winningOptionId: string;
}

interface MarketplaceData {
  marketCreateds: MarketCreated[];
  marketResolveds: MarketResolved[];
}

// --- GraphQL Query ---
const GET_MARKETS = gql`
  query GetMarketplaceData {
    marketCreateds(first: 100, orderBy: blockTimestamp, orderDirection: desc) {
      id
      marketId
      question
      options
      endTime
      category
      blockTimestamp
    }
    marketResolveds(first: 100) {
      marketId
      winningOptionId
    }
  }
`;

// --- Helper to map category ID from the contract to a readable string ---
const categoryMap: { [key: number]: string } = {
  0: 'POLITICS', 1: 'SPORTS', 2: 'CRYPTO', 3: 'ENTERTAINMENT', 4: 'TECH', 5: 'FINANCE', 6: 'OTHER'
};

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", ...Object.values(categoryMap)];
  const visibleCategories = categories.slice(0, 5); // Show ALL + first 4
  const hiddenCategories = categories.slice(5);

  const { data, isLoading, isError } = useQuery<MarketplaceData>({
    queryKey: ['marketplaceData'],
    queryFn: async () => await client.request(GET_MARKETS),
  });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="text-center"><h1 className="text-3xl font-bold">Loading Markets...</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3 p-4 border rounded-lg">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold text-destructive">Failed to load markets.</h1>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  // --- Data Processing ---
  const resolvedMarketIds = new Set(data?.marketResolveds.map((m) => m.marketId) || []);
  const allMarkets = data?.marketCreateds.map((market) => ({
    ...market,
    status: resolvedMarketIds.has(market.marketId) ? "Resolved" : "Active",
    category: categoryMap[market.category] || 'OTHER',
  })) || [];

  const filterAndSortMarkets = (tab: 'popular' | 'newest' | 'ending-soon' | 'ended') => {
    const tabStatus = tab === 'ended' ? 'Resolved' : 'Active';
    
    let filtered = allMarkets.filter((market) => {
      const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || market.category === selectedCategory;
      const matchesStatus = market.status === tabStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    switch(tab) {
        case 'popular':
            // Note: Volume is a placeholder. For real sorting, add totalVolume to your Subgraph Market entity.
            return filtered;
        case 'newest':
            return filtered.sort((a, b) => parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp));
        case 'ending-soon':
            return filtered.sort((a, b) => parseInt(a.endTime) - parseInt(b.endTime));
        case 'ended':
            return filtered.sort((a, b) => parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp));
        default:
            return filtered;
    }
  };

  const popularMarkets = filterAndSortMarkets('popular');
  const newestMarkets = filterAndSortMarkets('newest');
  const endingSoonMarkets = filterAndSortMarkets('ending-soon');
  const endedMarkets = filterAndSortMarkets('ended');

  // Helper to render a list of markets or an empty state message
  const renderMarketList = (markets: typeof allMarkets) => {
    if (markets.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No markets found matching your criteria.</p>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market) => {
          const endTimeInMs = parseInt(market.endTime) * 1000;
          
          return (
            <MarketCard 
              key={market.id} 
              id={market.marketId} 
              question={market.question} 
              category={market.category} 
              volume={"$0"}
              options={[
                  { name: market.options[0] || "Yes", price: 50, color: "success" }, 
                  { name: market.options[1] || "No", price: 50, color: "destructive" }
              ]} 
              timeRemaining={formatTimeRemaining(endTimeInMs)}
              endTime={new Date(endTimeInMs).toISOString()} 
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">Prediction Markets</h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">Trade on the outcomes of future events and put your knowledge to work.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search markets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-9" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          {visibleCategories.map((category) => (
            <Badge key={category} variant={selectedCategory === category ? "default" : "secondary"} className="cursor-pointer" onClick={() => setSelectedCategory(category)}>{category}</Badge>
          ))}
          {hiddenCategories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs">More <ChevronDown className="h-3 w-3 ml-1" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {hiddenCategories.map((category) => (<DropdownMenuItem key={category} onSelect={() => setSelectedCategory(category)}>{category}</DropdownMenuItem>))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
          <TabsTrigger value="ended">Ended</TabsTrigger>
        </TabsList>
        <TabsContent value="popular" className="mt-6">{renderMarketList(popularMarkets)}</TabsContent>
        <TabsContent value="newest" className="mt-6">{renderMarketList(newestMarkets)}</TabsContent>
        <TabsContent value="ending-soon" className="mt-6">{renderMarketList(endingSoonMarkets)}</TabsContent>
        <TabsContent value="ended" className="mt-6">{renderMarketList(endedMarkets)}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;