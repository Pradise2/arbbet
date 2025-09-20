import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Volume2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MarketOption {
  name: string;
  price: number;
  color: string;
}

interface MarketCardProps {
  id: string;
  question: string;
  category: string;
  isFreeEntry?: boolean;
  options: MarketOption[];
  volume: string;
  timeRemaining: string;
  endTime: string;
}

const MarketCard = ({
  id,
  question,
  category,
  isFreeEntry = false,
  options,
  volume,
  timeRemaining,
}: MarketCardProps) => {
  const navigate = useNavigate();

  const handleTradeClick = () => {
    navigate(`/market/${id}`);
  };

  return (
    <Card className="group cursor-pointer shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          {isFreeEntry && (
            <Badge className="bg-gradient-success text-success-foreground text-xs font-semibold">
              FREE ENTRY
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {question}
        </h3>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          {options.slice(0, 2).map((option, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{option.name}</span>
                <span className="font-semibold text-primary">{option.price}%</span>
              </div>
              <Progress value={option.price} className="h-2" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Volume2 className="h-4 w-4" />
            <span>{volume}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={handleTradeClick}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Trade
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MarketCard;