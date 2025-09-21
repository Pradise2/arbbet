import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import MarketCard from "@/components/MarketCard";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = ["ALL", "POLITICS", "SPORTS", "CRYPTO", "ENTERTAINMENT", "TECH"];

  const mockMarkets = [
    { id: "1", question: "Will Bitcoin reach $100,000 by the end of 2024?", category: "CRYPTO", isFreeEntry: true, options: [ { name: "Yes", price: 68, color: "success" }, { name: "No", price: 32, color: "destructive" } ], volume: "$125,420", timeRemaining: "23 days", endTime: "2024-12-31T23:59:59Z", status: "Active" },
    { id: "2", question: "Who will win the 2024 US Presidential Election?", category: "POLITICS", options: [ { name: "Democrat", price: 52, color: "accent" }, { name: "Republican", price: 48, color: "destructive" } ], volume: "$2,340,123", timeRemaining: "45 days", endTime: "2024-11-05T23:59:59Z", status: "Active" },
    { id: "3", question: "Will the next iPhone support 8K video recording?", category: "TECH", isFreeEntry: true, options: [ { name: "Yes", price: 75, color: "success" }, { name: "No", price: 25, color: "destructive" } ], volume: "$89,320", timeRemaining: "12 days", endTime: "2024-10-15T23:59:59Z", status: "Active" },
    { id: "4", question: "Will Taylor Swift release a new album in 2024?", category: "ENTERTAINMENT", options: [ { name: "Yes", price: 84, color: "success" }, { name: "No", price: 16, color: "destructive" } ], volume: "$67,890", timeRemaining: "67 days", endTime: "2024-12-31T23:59:59Z", status: "Active" },
    { id: "5", question: "Will the Lakers make the NBA playoffs this season?", category: "SPORTS", options: [ { name: "Yes", price: 43, color: "success" }, { name: "No", price: 57, color: "destructive" } ], volume: "$156,780", timeRemaining: "89 days", endTime: "2025-04-15T23:59:59Z", status: "Active" },
    { id: "6", question: "Will OpenAI release GPT-5 before 2025?", category: "TECH", isFreeEntry: true, options: [ { name: "Yes", price: 29, color: "success" }, { name: "No", price: 71, color: "destructive" } ], volume: "$234,567", timeRemaining: "78 days", endTime: "2024-12-31T23:59:59Z", status: "Active" },
    // --- ADDED RESOLVED MARKET ---
    { id: "7", question: "Did the Fed raise interest rates in Q2 2024?", category: "FINANCE", options: [ { name: "Yes", price: 100, color: "success" }, { name: "No", price: 0, color: "destructive" } ], volume: "$550,000", timeRemaining: "Ended", endTime: "2024-06-30T23:59:59Z", status: "Resolved" }
  ];

  // Filter logic now includes the active tab's status
  const filterMarkets = (tabStatus: "Active" | "Resolved") => {
    return mockMarkets.filter(market => {
      const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || market.category === selectedCategory;
      const matchesStatus = market.status === tabStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* --- UPDATED: Reduced Header --- */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Prediction Markets
        </h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Trade on the outcomes of future events and put your knowledge to work.
        </p>
      </div>

      {/* --- UPDATED: Compact Filters --- */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* --- UPDATED: 4 Tabs --- */}
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
          <TabsTrigger value="ended">Ended</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterMarkets("Active")
              .sort((a, b) => parseFloat(b.volume.replace(/[$,]/g, '')) - parseFloat(a.volume.replace(/[$,]/g, '')))
              .map((market) => (<MarketCard key={market.id} {...market} />))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterMarkets("Active")
              .sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
              .map((market) => (<MarketCard key={market.id} {...market} />))}
          </div>
        </TabsContent>

        <TabsContent value="ending-soon" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterMarkets("Active")
              .sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
              .map((market) => (<MarketCard key={market.id} {...market} />))}
          </div>
        </TabsContent>

        {/* --- NEW: Ended Tab Content --- */}
        <TabsContent value="ended" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterMarkets("Resolved").map((market) => (
              <MarketCard key={market.id} {...market} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketplace;