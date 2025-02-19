'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function VotingSystem() {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    // Simulating a backend check
    const checkAuth = async () => {
      try {
        const response = await fetch('https://bevs.onrender.com/voters/searched'); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        if (data?.name) {
          router.push('/category'); // Redirects if authenticated
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#479d06] p-6">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Electronic Voting System</h2>
        <div className="text-white text-center">Please authenticate by using the Fingerprint Module</div>
      </div>
    </div>
  );
}
