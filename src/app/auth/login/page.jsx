'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { handleLogin } from '@/lib/API';
import { useAuth } from '@/lib/AuthProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const { login, userData } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await handleLogin(email, password, login);
      console.log('this is the response to the page', res);

      if (res?.data.success) {
        router.push('/movies');
      } else {
        console.error('Login failed:', res || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
              className="border-teal-600 data-[state=checked]:bg-emerald-500"
            />
            <label htmlFor="remember" className="text-sm text-teal-300">
              Remember me
            </label>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2bd17e] font-bold text-[16px]"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
      <p className="my-4 text-gray-400">
        New here?{' '}
        <Link href={'/auth/signup'} className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default page;
