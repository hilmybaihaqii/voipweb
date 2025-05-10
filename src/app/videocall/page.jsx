'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VideoCallPage() {
  const searchParams = useSearchParams();
  const number = searchParams.get('number') || 'Unknown User';
  const router = useRouter();

  const [cameraOn, setCameraOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  // Auto-redirect setelah panggilan berakhir sesuaikan dengan VoIP
  useEffect(() => {
    if (callEnded) {
      const timeout = setTimeout(() => {
        router.push('/history');
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [callEnded, router]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Video Call</h1>
      <p className="text-lg">{number}</p>

      {!callEnded ? (
        <div className="w-full h-64 bg-zinc-800 rounded-xl my-6 max-w-xl flex items-center justify-center">
          {cameraOn ? (
            <p className="text-zinc-400">📷 Kamera Aktif</p>
          ) : (
            <p className="text-zinc-500 italic">Kamera Dimatikan</p>
          )}
        </div>
      ) : (
        <p className="text-red-500 mt-6">📴 Panggilan Berakhir</p>
      )}

      <div className="flex gap-6 mt-4">
        <button
          onClick={() => setMuted(!muted)}
          className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full"
        >
          {muted ? '🔇' : '🎤'}
        </button>
        <button
          onClick={() => setCameraOn(!cameraOn)}
          className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-full"
        >
          {cameraOn ? '📸' : '📷'}
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
