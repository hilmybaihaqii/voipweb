'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VoiceCallPage() {
  const searchParams = useSearchParams();
  const number = searchParams.get('number') || 'Unknown Number';
  const router = useRouter();

  const [muted, setMuted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  // Auto redirect after call ends
  useEffect(() => {
    if (callEnded) {
      const timeout = setTimeout(() => {
        router.push('/history');
      }, 1000); // tunggu 1 detik sebelum redirect
      return () => clearTimeout(timeout);
    }
  }, [callEnded, router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Voice Call</h1>
      <p className="text-lg">{number}</p>
      <p className="text-sm text-zinc-400 mt-1">
        {callEnded ? 'Call Ended' : 'Calling... (00:00)'}
      </p>

      <div className="flex gap-6 mt-10">
        <button
          onClick={() => setMuted(!muted)}
          className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full"
        >
          {muted ? '🔇' : '🎤'}
        </button>
        <button
          onClick={() => setCallEnded(true)}
          className="bg-red-600 hover:bg-red-500 p-4 rounded-full text-white"
        >
          🔴 End Call
        </button>
      </div>
    </div>
  );
}
