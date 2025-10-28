import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/components';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setIsLoading(true);
        setMessage('');
        setError('');
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 2000);
            } else setError(data.error);
        } catch {
            setError('Unable to connect to server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
            <div className="w-full max-w-md">
                <h2 className="text-3xl font-bold text-black mb-6">Reset Password</h2>
                {message && <p className="mb-4 text-green-600">{message}</p>}
                {error && <p className="mb-4 text-red-600">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="password"
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-0"
                    />
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-black focus:outline-none focus:ring-0"
                    />
                    <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isLoading} loading={isLoading}>
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
