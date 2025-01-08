// WalletComponent.jsx
import React, { useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
} from '../contents/components/card';
import { Alert, AlertDescription } from '../contents/components/alert';
import {
  ChevronRight,
} from 'lucide-react';
import Header from '../../components/header';

const WalletComponent = () => {
    const { user } = useClerk();
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [withdrawError, setWithdrawError] = useState('');

    useEffect(() => {
        fetchBalance();
    }, [user?.id]);

    const fetchBalance = async () => {
        if (!user?.id) {
            setError('User ID not found');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/accept/balance/${user.id}`);
            
            if (response.status === 404) {
                setBalance({
                    availableBalance: 0,
                    totalEarnings: 0
                });
                return;
            }
            
            if (!response.ok) {
                throw new Error(`Failed to fetch balance: ${response.statusText}`);
            }
            
            const data = await response.json();
            setBalance(data);
        } catch (err) {
            console.error('Error fetching balance:', err);
            setError('Unable to fetch wallet balance. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async () => {
        setIsWithdrawing(true);
        setWithdrawError('');
    };

    const handleWithdrawSubmit = async () => {
        if (!withdrawAmount || !phoneNumber) {
            setWithdrawError('Please fill in all fields');
            return;
        }

        const amount = parseFloat(withdrawAmount);
        if (amount > balance?.availableBalance) {
            setWithdrawError('Insufficient balance');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/accept/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    phoneNumber,
                    userId: user.id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to process withdrawal');
            }

            // Reset form and refresh balance
            setWithdrawAmount('');
            setPhoneNumber('');
            setIsWithdrawing(false);
            fetchBalance();
            
            // Show success message
            setError({ type: 'success', message: 'Withdrawal initiated successfully!' });
            
        } catch (err) {
            setWithdrawError(err.message);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    return (
        <div className='ad-waitlist min-h-screen'>
            <Header />

            <div className="w-full bg-white rounded-lg shadow-md container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="bg-gradient-to-br from-[#FF4500]/10 to-[#FF4500]/5">
                            <CardContent>
                                {loading ? (
                                    <div className="text-3xl font-bold text-muted-foreground animate-pulse">
                                        Loading...
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-3xl font-bold text-[#FF4500]">
                                            {formatCurrency(balance?.availableBalance)}
                                        </div>
                                        {!isWithdrawing ? (
                                            <motion.button
                                                onClick={handleWithdraw}
                                                disabled={!balance?.availableBalance}
                                                className={`mt-4 w-full flex items-center justify-center gap-1 px-3 py-2 
                                                ${balance?.availableBalance ? 'bg-[#FF4500] hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}
                                                text-white font-bold rounded-md transition-all duration-300`}
                                                whileHover={balance?.availableBalance ? { scale: 1.05 } : {}}
                                                whileTap={balance?.availableBalance ? { scale: 0.95 } : {}}
                                            >
                                                Withdraw
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.button>
                                        ) : (
                                            <div className="mt-4 space-y-4">
                                                <input
                                                    type="number"
                                                    value={withdrawAmount}
                                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                                    placeholder="Enter amount"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                                <input
                                                    type="tel"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    placeholder="Enter MoMo number"
                                                    className="w-full p-2 border rounded-md"
                                                />
                                                {withdrawError && (
                                                    <Alert className="bg-red-100 border-red-400">
                                                        <AlertDescription className="text-red-700">
                                                            {withdrawError}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                                <div className="flex gap-2">
                                                    <motion.button
                                                        onClick={handleWithdrawSubmit}
                                                        className="flex-1 bg-[#FF4500] hover:bg-orange-500 text-white font-bold py-2 rounded-md"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Confirm
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => {
                                                            setIsWithdrawing(false);
                                                            setWithdrawError('');
                                                        }}
                                                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-md"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Cancel
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WalletComponent;





































// import React, { useState, useEffect } from 'react';
// import { useClerk } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription
// } from '../contents/components/card';
// import { Alert, AlertDescription } from '../contents/components/alert';
// import {
//   BadgeDollarSign,
//   ArrowUpRight,
//   Wallet2,
//   Globe,
//   ChevronRight,
//   Clock
// } from 'lucide-react';
// import Header from '../../components/header'

// const WalletComponent = () => {
//     const { user } = useClerk();
//     const navigate = useNavigate();
//     const [balance, setBalance] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

//     useEffect(() => {
//         const fetchBalance = async () => {
//         if (!user?.id) {
//             setError('User ID not found');
//             setLoading(false);
//             return;
//         }

//         try {
//             // Fixed URL by removing duplicate 'api'
//             const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/accept/balance/${user.id}`);
            
//             if (response.status === 404) {
//             // Initialize balance for new users
//             setBalance({
//                 availableBalance: 0,
//                 totalEarnings: 0
//             });
//             return;
//             }
            
//             if (!response.ok) {
//             throw new Error(`Failed to fetch balance: ${response.statusText}`);
//             }
            
//             const data = await response.json();
//             setBalance(data);
//         } catch (err) {
//             console.error('Error fetching balance:', err);
//             setError('Unable to fetch wallet balance. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//         };

//         fetchBalance();
//     }, [user?.id]);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 2
//         }).format(amount || 0);
//     };

//     if (error) {
//         return (
//         <Alert variant="destructive" className="max-w-3xl mx-auto mt-8">
//             <AlertDescription>{error.message}</AlertDescription>
//         </Alert>
//         );
//     }

//     const timeframeOptions = [
//         { value: '7d', label: '7 Days' },
//         { value: '30d', label: '30 Days' },
//         { value: '90d', label: '90 Days' }
//     ];

//     const handleWithdraw = async () => {
//         // Implement withdrawal logic here
//         console.log('Withdrawal requested');
//     };

//     const handleViewAllTransactions = () => {
//         // Implement view all transactions logic here
//         console.log('View all transactions requested');
//     };

//     return (
//         <div className='ad-waitlist min-h-screen'>
//             <Header />

//             <div className="w-full bg-white rounded-lg shadow-md container mx-auto px-4 py-8 md:py-16">
//                 {/* Header Section */}
//                 <div className="p-4 border-b border-gray-100">
//                     <div className="flex items-center justify-between mb-8">
//                         <div className="flex items-center gap-3">
//                             <Wallet2 className="h-8 w-8 text-[#FF4500]" />
//                             <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
//                         </div>
//                         <div className="flex gap-3">
//                             <motion.button
//                                 className="flex items-center gap-2 text-blue-950 font-bold bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
//                                 onClick={() => navigate('/projects')}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 <Globe className="w-5 h-5 text-[#FF4500]" />
//                                 My Websites
//                             </motion.button>
//                             <select
//                                 value={selectedTimeframe}
//                                 onChange={(e) => setSelectedTimeframe(e.target.value)}
//                                 className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4500]"
//                             >
//                                 {timeframeOptions.map(option => (
//                                     <option key={option.value} value={option.value}>
//                                     {option.label}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="flex items-center gap-5 mb-4">
//                         <h3 className="text-2xl font-bold bg-blue-600 bg-clip-text text-transparent">
//                             {formatCurrency(balance?.totalEarnings)}
//                         </h3>
//                         <h4 className="text-sm font-medium text-gray-600">
//                             Total Lifetime Earnings
//                         </h4>
//                     </div>
//                 </div>

//                 {/* Cards Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
//                     {/* Available Balance Card */}
//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <Card className="bg-gradient-to-br from-[#FF4500]/10 to-[#FF4500]/5">
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <BadgeDollarSign className="h-5 w-5 text-[#FF4500]" />
//                                     Available Balance
//                                 </CardTitle>
//                                 <CardDescription>Ready to withdraw</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 {loading ? (
//                                     <div className="text-3xl font-bold text-muted-foreground animate-pulse">
//                                         Loading...
//                                     </div>
//                                 ) : (
//                                     <div className="text-3xl font-bold text-[#FF4500]">
//                                         {formatCurrency(balance?.availableBalance)}
//                                     </div>
//                                 )}
//                                 <motion.button
//                                     onClick={handleWithdraw}
//                                     disabled={!balance?.availableBalance}
//                                     className={`mt-4 w-full flex items-center justify-center gap-1 px-3 py-2 
//                                     ${balance?.availableBalance ? 'bg-[#FF4500] hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'}
//                                     text-white font-bold rounded-md transition-all duration-300`}
//                                     whileHover={balance?.availableBalance ? { scale: 1.05 } : {}}
//                                     whileTap={balance?.availableBalance ? { scale: 0.95 } : {}}
//                                 >
//                                     Withdraw
//                                     <ChevronRight className="w-4 h-4" />
//                                 </motion.button>
//                             </CardContent>
//                         </Card>
//                     </motion.div>

//                     {/* Recent Earnings Card */}
//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <ArrowUpRight className="h-5 w-5 text-green-500" />
//                                     Recent Earnings
//                                 </CardTitle>
//                                 <CardDescription>Last {selectedTimeframe} earnings</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 {loading ? (
//                                     <div className="text-3xl font-bold text-muted-foreground animate-pulse">
//                                         Loading...
//                                     </div>
//                                 ) : (
//                                     <div className="text-3xl font-bold text-green-500">
//                                         {formatCurrency(balance?.recentEarnings)}
//                                     </div>
//                                 )}
//                                 <div className="mt-4 text-sm text-gray-500">
//                                     <div className="flex items-center gap-2">
//                                         <ArrowUpRight className="h-4 w-4 text-green-500" />
//                                         <span>+{formatCurrency(balance?.lastPayment)} last payment</span>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </motion.div>

//                     {/* Transaction History Card */}
//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ duration: 0.2 }}
//                     >
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <Clock className="h-5 w-5" />
//                                     Recent Activity
//                                 </CardTitle>
//                                 <CardDescription>Latest transactions</CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 {loading ? (
//                                     <div className="text-sm text-muted-foreground animate-pulse">
//                                         Loading transactions...
//                                     </div>
//                                 ) : balance?.recentTransactions?.length > 0 ? (
//                                     <div className="space-y-3">
//                                         {balance.recentTransactions.slice(0, 3).map((transaction, index) => (
//                                             <div key={index} className="flex items-center justify-between text-sm">
//                                                 <span className="text-gray-600">{transaction.type}</span>
//                                                 <span className={`font-medium ${
//                                                     transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
//                                                 }`}>
//                                                     {formatCurrency(transaction.amount)}
//                                                 </span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <div className="text-sm text-gray-500">
//                                         No recent transactions to display
//                                     </div>
//                                 )}
//                                 <motion.button
//                                     onClick={handleViewAllTransactions}
//                                     className="mt-4 w-full flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-md transition-all duration-300"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     View All Transactions
//                                     <ChevronRight className="w-4 h-4" />
//                                 </motion.button>
//                             </CardContent>
//                         </Card>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WalletComponent;