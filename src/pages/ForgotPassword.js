import React, { useState } from 'react';
import { Button, Input } from '../components/components';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendResetLink = async () => {
        setIsLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) setMessage(data.message);
            else setError(data.error);
        } catch {
            setError('Unable to connect to server.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendResetLink();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-black mb-6">Forgot Password</h2>
                {message && <p className="mb-4 text-green-600">{message}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-black">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-0"
                        />
                    </div>
                    <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isLoading} loading={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
