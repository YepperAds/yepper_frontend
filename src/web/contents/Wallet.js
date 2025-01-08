import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../contents/components/card';
import { Alert, AlertDescription } from '../contents/components/alert';
import { BadgeDollarSign, ArrowUpRight, ArrowDownRight, Wallet2 } from 'lucide-react';

const WalletComponent = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Replace with actual user ID from your auth system
        const userId = "your-user-id";
        const response = await fetch(`/api/balance/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        
        const data = await response.json();
        setBalance(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto mt-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-8">
        <Wallet2 className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">My Wallet</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Available Balance Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeDollarSign className="h-5 w-5" />
              Available Balance
            </CardTitle>
            <CardDescription>Current available funds</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-3xl font-bold text-muted-foreground animate-pulse">
                Loading...
              </div>
            ) : (
              <div className="text-3xl font-bold">
                ${balance?.availableBalance.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total Earnings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-green-500" />
              Total Earnings
            </CardTitle>
            <CardDescription>Lifetime earnings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-3xl font-bold text-muted-foreground animate-pulse">
                Loading...
              </div>
            ) : (
              <div className="text-3xl font-bold text-green-500">
                ${balance?.totalEarnings.toFixed(2)}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownRight className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Last 30 days summary</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-muted-foreground animate-pulse">
                Loading recent activities...
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No recent activities to display
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletComponent;