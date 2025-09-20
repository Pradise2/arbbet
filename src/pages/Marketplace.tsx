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

  const categories = ["ALL", "POLITICS", "SPORTS", "CRYPTO", "ENTERTAINMENT"];

  const mockMarkets = [
    {
      id: "1",
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      category: "CRYPTO",
      isFreeEntry: true,
      options: [
        { name: "Yes", price: 68, color: "success" },
        { name: "No", price: 32, color: "destructive" }
      ],
      volume: "$125,420",
      timeRemaining: "23 days",
      endTime: "2024-12-31T23:59:59Z"
    },
    {
      id: "2",
      question: "Who will win the 2024 US Presidential Election?",
      category: "POLITICS",
      options: [
        { name: "Democrat", price: 52, color: "accent" },
        { name: "Republican", price: 48, color: "destructive" }
      ],
      volume: "$2,340,123",
      timeRemaining: "45 days",
      endTime: "2024-11-05T23:59:59Z"
    },
    {
      id: "3",
      question: "Will the next iPhone support 8K video recording?",
      category: "TECH",
      isFreeEntry: true,
      options: [
        { name: "Yes", price: 75, color: "success" },
        { name: "No", price: 25, color: "destructive" }
      ],
      volume: "$89,320",
      timeRemaining: "12 days",
      endTime: "2024-10-15T23:59:59Z"
    },
    {
      id: "4",
      question: "Will Taylor Swift release a new album in 2024?",
      category: "ENTERTAINMENT",
      options: [
        { name: "Yes", price: 84, color: "success" },
        { name: "No", price: 16, color: "destructive" }
      ],
      volume: "$67,890",
      timeRemaining: "67 days",
      endTime: "2024-12-31T23:59:59Z"
    },
    {
      id: "5",
      question: "Will the Lakers make the NBA playoffs this season?",
      category: "SPORTS",
      options: [
        { name: "Yes", price: 43, color: "success" },
        { name: "No", price: 57, color: "destructive" }
      ],
      volume: "$156,780",
      timeRemaining: "89 days",
      endTime: "2025-04-15T23:59:59Z"
    },
    {
      id: "6",
      question: "Will OpenAI release GPT-5 before 2025?",
      category: "TECH",
      isFreeEntry: true,
      options: [
        { name: "Yes", price: 29, color: "success" },
        { name: "No", price: 71, color: "destructive" }
      ],
      volume: "$234,567",
      timeRemaining: "78 days",
      endTime: "2024-12-31T23:59:59Z"
    }
  ];

  const filteredMarkets = mockMarkets.filter(market => {
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Prediction Markets
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Trade on the outcomes of future events. Put your knowledge to work and earn from accurate predictions.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === category 
                    ? "bg-gradient-primary hover:opacity-90" 
                    : "hover:bg-accent"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Market Sorting Tabs */}
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .sort((a, b) => parseFloat(b.volume.replace(/[$,]/g, '')) - parseFloat(a.volume.replace(/[$,]/g, '')))
              .map((market) => (
                <MarketCard key={market.id} {...market} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="newest" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .reverse()
              .map((market) => (
                <MarketCard key={market.id} {...market} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ending-soon" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .sort((a, b) => parseInt(a.timeRemaining) - parseInt(b.timeRemaining))
              .map((market) => (
                <MarketCard key={market.id} {...market} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredMarkets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No markets found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;