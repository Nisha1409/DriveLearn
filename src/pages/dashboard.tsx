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
    <main className="relative max-w-4xl mx-auto p-6 sm:p-8 space-y-6 bg-white shadow-lg rounded-lg">
      {/* Logout button at top-right */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-200"
      >
        Logout
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-center">📘 AI Tutor</h1>

      <textarea
        placeholder="Ask your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200 text-sm sm:text-base md:text-lg"
        rows={4}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <VoiceInput setQuestion={setQuestion} />

      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Ask Question'}
      </button>

      <ResponseDisplay answer={answer} isLoading={isLoading} />
    </main>
  );
}
