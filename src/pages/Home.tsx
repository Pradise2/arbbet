import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Trophy,
  ArrowRight,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Volume", value: "$2.4M", icon: DollarSign },
    { label: "Active Traders", value: "12,547", icon: Users },
    { label: "Markets Created", value: "1,256", icon: BarChart3 },
    { label: "Predictions Made", value: "45,892", icon: TrendingUp }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades instantly with our optimized AMM system"
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology with full transparency"
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "Track your performance and climb the leaderboards"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge className="bg-gradient-accent text-accent-foreground px-4 py-2">
              🚀 The Future of Prediction Markets
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Predict the Future,
              </span>
              <br />
              <span className="text-foreground">Earn from Knowledge</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trade on the outcomes of real-world events. From politics to sports, 
              crypto to entertainment - put your insights to work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
                onClick={() => navigate('/markets')}
              >
                Start Trading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6"
                onClick={() => navigate('/leaderboard')}
              >
                View Leaderboard
                <Trophy className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center shadow-card">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Policast</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for traders, by traders. Experience the next generation of prediction markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">
              Ready to Start <span className="bg-gradient-primary bg-clip-text text-transparent">Predicting</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of traders who are already earning from their predictions. 
              No fees on your first trade!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6"
                onClick={() => navigate('/markets')}
              >
                Browse Markets
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2"
                onClick={() => navigate('/portfolio')}
              >
                View Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;