'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import io from 'socket.io-client';

const socket = io('https://bevs.onrender.com'); // Adjust based on backend URL

export default function VotingSystem() {
  const [categories, setCategories] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch candidates data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://bevs.onrender.com/candidates');
        const data = await res.json();
        
        if (!res.ok) throw new Error('Failed to fetch candidates');

        // Process categories
        const uniqueCategories = [...new Set(data.map((c) => c.category || 'Unknown'))];
        setCategories(uniqueCategories.map((name, index) => ({ _id: index.toString(), name })));
        
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    socket.on('voteUpdate', (updatedVotes) => setVotes(updatedVotes));

    return () => socket.off('voteUpdate');
  }, []);

  // Handle voting action
  const handleVote = useCallback(async () => {
    if (!selectedCandidate || !voterId) return;

    try {
      const response = await fetch('https://bevs.onrender.com/voters/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterId, candidateId: selectedCandidate }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error casting vote');

      alert('Vote cast successfully!');
      setIsPopupOpen(false);
    } catch (error) {
      alert(error.message);
      console.error('Error voting:', error);
    }
  }, [selectedCandidate, voterId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#479d06] p-6">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Vote for Your Favorite Candidate</h2>
        
        <input
          type="text"
          placeholder="Enter Voter ID"
          className="w-full p-2 mb-4 rounded-lg text-black"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
        />

        <div className="space-y-4">
          {candidates.map((candidate) => (
            <motion.div
              key={candidate._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white/20 rounded-xl flex justify-between items-center"
            >
              <span className="text-white text-lg">{candidate.name} ({candidate.category || 'Unknown'})</span>
              <Button
                onClick={() => {
                  setSelectedCandidate(candidate._id);
                  setIsPopupOpen(true);
                }}
                variant="outline"
                className="border-white/50 text-white hover:bg-white/20"
              >
                Vote
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          onConfirm={handleVote}
        />
      )}
    </div>
  );
}

function Popup({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
        <h3 className="text-lg font-semibold">Confirm Your Vote</h3>
        <p className="text-gray-700 my-4">Are you sure you want to vote for this candidate?</p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-blue-600 text-white">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}