'use client';

import { useEffect, useState } from 'react';
import VoiceInput from '@/components/dashb/VoiceInput';
import ResponseDisplay from '@/components/dashb/ResponseDisplay';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [manualQuestion, setManualQuestion] = useState('');
  const [voiceTranscript, setVoiceTranscript] = useState('');
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

    const questionToSend = manualQuestion || voiceTranscript; // Prioritize manual input

    if (!questionToSend.trim()) {
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
      const res = await axios.post('/api/ask', { question: questionToSend, userId });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-8 sm:px-12 md:px-20 lg:px-32 xl:px-40 bg-gradient-to-b from-[#f9f6e7] to-white w-full">
      <main className="relative max-w-5xl w-full bg-white shadow-lg p-8 rounded-lg mt-12 sm:mt-16 space-y-6">

        <h1 className="text-3xl sm:text-4xl font-bold text-center">📘 AI Tutor</h1>

        {/* Input + Send Button */}
        <div className="flex items-center border rounded-md p-3 bg-gray-100">
          <textarea
            placeholder="Ask your question here..."
            value={manualQuestion}
            onChange={(e) => setManualQuestion(e.target.value)}
            className="flex-grow resize-none border-none bg-transparent outline-none focus:ring-0 text-base sm:text-lg h-10"
            rows={1}
          />
          <button onClick={handleAsk} className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition-all">
            <PaperAirplaneIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Voice Input Component */}
        <VoiceInput setVoiceTranscript={setVoiceTranscript} />

        {/* Transcript Display */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md text-gray-700">
          <p className="text-sm sm:text-base whitespace-pre-wrap font-medium">
            {voiceTranscript || "Your voice input will appear here..."}
          </p>
        </div>

        <ResponseDisplay answer={answer} isLoading={isLoading} />
      </main>
    </div>
  );
}
