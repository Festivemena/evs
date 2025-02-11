'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const candidates = [
  { id: 1, name: 'Vitalis', image: '/DP-01.png' },
  { id: 2, name: 'Jahswill', image: '/DP-02.png' },
  { id: 3, name: 'David', image: '/DP-03.png' },
  { id: 4, name: 'Vitalis', image: '/DP-01.png' },
  { id: 5, name: 'Jahswill', image: '/DP-02.png' },
  { id: 6, name: 'David', image: '/DP-03.png' },
];

export default function VotingSystem() {
  const [votes, setVotes] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  const totalVotes = Object.values(votes).reduce((acc, val) => acc + val, 0);

  const vote = (id) => {
    setVotes((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Vote for Your Favorite FYB Personality</h2>
        <div>Please authenticate by using the Fingerprint Module</div>
        <div></div>
      </div>
    </div>
  );
}
