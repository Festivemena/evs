'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const categories = [
  {
    id: 1,
    name: 'Business Venture of the Year',
    candidates: [
      { id: 1, name: 'Candidate A', image: '/DP-01.png' },
      { id: 2, name: 'Candidate B', image: '/DP-02.png' },
    ],
  },
  {
    id: 2,
    name: 'Student of the Year',
    candidates: [
      { id: 3, name: 'Candidate C', image: '/DP-03.png' },
      { id: 4, name: 'Candidate D', image: '/DP-01.png' },
    ],
  },
  {
    id: 3,
    name: 'Scholar of the Year',
    candidates: [
      { id: 5, name: 'Candidate E', image: '/DP-02.png' },
      { id: 6, name: 'Candidate F', image: '/DP-03.png' },
    ],
  },
  {
    id: 4,
    name: 'Sportsman of the Year',
    candidates: [
      { id: 7, name: 'Candidate G', image: '/DP-01.png' },
      { id: 8, name: 'Candidate H', image: '/DP-02.png' },
    ],
  },
  {
    id: 5,
    name: 'Best Dressed Male',
    candidates: [
      { id: 9, name: 'Candidate I', image: '/DP-03.png' },
      { id: 10, name: 'Candidate J', image: '/DP-01.png' },
    ],
  },
  {
    id: 6,
    name: 'Best Dressed Female',
    candidates: [
      { id: 11, name: 'Candidate K', image: '/DP-02.png' },
      { id: 12, name: 'Candidate L', image: '/DP-03.png' },
    ],
  },
];

export default function VotingSystem() {
  const router = useRouter();
  const [votes, setVotes] = useState({});
  const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

  const vote = (id) => {
    setVotes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleCategorySelect = (categoryId) => {
    router.push(`/vote/${categoryId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Vote for Your Favorite FYB Personality</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white/20 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-lg">{category.name}</span>
                    <Button onClick={() => handleCategorySelect(category.id)} variant="outline" className="border-white/50 text-white hover:bg-white/20">
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}