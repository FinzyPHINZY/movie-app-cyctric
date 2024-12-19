'use client';

import { useAuth } from '@/lib/AuthProvider';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { userData } = useAuth();
  const token = userData?.token;

  if (token) {
    router.push('/movies');
  } else {
    router.push('/auth/login');
  }

  return (
    <div className=" flex flex-col justify-center items-center h-full text-white">
      <Loader />

      <p>Loading...</p>
    </div>
  );
}
