import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, XCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../web/contents/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../web/contents/components/card';

const statusMessages = {
    'invalid-params': {
        title: 'Invalid Parameters',
        description: 'The payment process failed due to missing or invalid parameters.',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
    },
    'invalid-txref': {
        title: 'Invalid Transaction Reference',
        description: 'The transaction reference provided is invalid or malformed.',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
    },
    'payment-not-found': {
        title: 'Payment Not Found',
        description: 'We could not locate the payment record in our system.',
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50'
    },
    'amount-mismatch': {
        title: 'Amount Mismatch',
        description: 'The payment amount does not match the expected amount.',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
    },
    'success': {
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
        icon: CheckCircle2,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
    },
    'failed': {
        title: 'Payment Failed',
        description: 'The payment process could not be completed. Please try again.',
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50'
    },
    'error': {
        title: 'System Error',
        description: 'An unexpected error occurred. Please contact support if this persists.',
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-50'
    }
};

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const paymentStatus = searchParams.get('status');
        setStatus(paymentStatus);
    }, [searchParams]);

    if (!status || !statusMessages[status]) {
        return null;
    }

    const { title, description, icon: Icon, color, bgColor } = statusMessages[status];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
                <Card className="shadow-lg">
                    <CardHeader className="space-y-1 pb-8">
                        <CardTitle className="text-2xl font-bold text-center text-gray-900">
                            Payment Status
                        </CardTitle>
                        <p className="text-center text-gray-500 text-sm">
                            Transaction ID: {searchParams.get('txref') || 'N/A'}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className={`rounded-lg p-6 ${bgColor}`}>
                            <div className="flex items-center space-x-4">
                                <Icon className={`h-8 w-8 ${color}`} />
                                <div>
                                    <h3 className={`font-semibold ${color}`}>{title}</h3>
                                    <p className="text-gray-600 mt-1">{description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4">
                            <Button 
                                variant="default" 
                                className="w-full h-11 font-medium"
                                onClick={() => navigate('/dashboard')}
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Return to Dashboard
                            </Button>
                            
                            {status !== 'success' && (
                                <Button 
                                    variant="outline" 
                                    className="w-full h-11 font-medium"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                            )}
                        </div>

                        {status !== 'success' && (
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Need help? <a href="/support" className="text-blue-600 hover:text-blue-800">Contact our support team</a>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PaymentStatus;