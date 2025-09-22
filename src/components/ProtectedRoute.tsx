// src/components/ProtectedRoute.tsx
import { useAccount } from 'wagmi';
import { isAdmin } from '@/lib/auth';
import NotFound from '@/pages/NotFound';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for a loading state

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Get isConnected and isConnecting flags from useAccount
  const { address, isConnected, isConnecting } = useAccount();

  // Show a loading state while Wagmi is connecting the wallet
  if (isConnecting) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-4 max-w-2xl mx-auto">
          <Skeleton className="h-12 w-1/2 mx-auto" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  // Check for connection AND admin status *after* we know the connection is established
  const isAuthorized = isConnected && isAdmin(address);

  // If authorized, render the child component (the Admin page).
  // Otherwise, render the NotFound page to hide the route.
  return isAuthorized ? <>{children}</> : <NotFound />;
};

export default ProtectedRoute;