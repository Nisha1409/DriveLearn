'use client';

import { useEffect, useState } from 'react';
import VoiceInput from '@/components/dashb/VoiceInput';
import ResponseDisplay from '@/components/dashb/ResponseDisplay';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in. Redirecting to login page.');
      router.push('/login');
    }
    router.prefetch('/login');
  }, [router]);

  const handleAsk = async () => {
    setError('');
    setIsLoading(true);

    if (!question.trim()) {
      setError('Please enter a question!');
      setIsLoading(false);
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('User not logged in. Please log in again.');
      router.push('/login');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('/api/ask', { question, userId });
      setAnswer(res.data.answer);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data || err.message);
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.replace('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-12 md:px-16 lg:px-24 bg-gradient-to-b from-[#f9f6e7] to-white">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-200 shadow-md"
      >
        Logout
      </button>

      <main className="max-w-xl w-full bg-white shadow-lg p-6 rounded-lg mt-20 sm:mt-28">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">📘 AI Tutor</h1>

        <textarea
          placeholder="Ask your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 text-sm sm:text-base md:text-lg"
          rows={4}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <VoiceInput setQuestion={setQuestion} />

        <button
          onClick={handleAsk}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Ask Question'}
        </button>

        <ResponseDisplay answer={answer} isLoading={isLoading} />
      </main>
    </div>
  );
}
