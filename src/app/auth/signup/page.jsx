'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { handleSignup } from '@/lib/API';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await handleSignup(email, password, name);
      console.log('this is the response to the page', res);

      if (res?.success) {
        router.push('/movies');
      } else {
        console.error('Sign up failed:', res || 'Unknown error');
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
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>
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

          <Button className="w-full bg-[#2bd17e] font-bold text-[16px]">
            Proceed{' '}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
