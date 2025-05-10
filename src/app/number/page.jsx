'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Number() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [callType, setCallType] = useState('');
  const [callHistory, setCallHistory] = useState(
    // Mengambil riwayat panggilan dari localStorage jika ada
    JSON.parse(localStorage.getItem('callHistory')) || []
  );

  const userInfo = {
    name: "Ahmad Santoso",
    phone: "+62 812-3456-7890",
    status: "available",
    email: "ahmad.santoso@example.com",
  };

  // Fungsi untuk menangani klik pada angka
  const handleNumberClick = (num) => {
    setPhoneNumber(prev => prev + num);
  };

  // Fungsi untuk menghapus nomor yang sedang dimasukkan
  const handleClearNumber = () => {
    setPhoneNumber('');
  };

  // Fungsi untuk memulai panggilan (voice/video)
  const handleCall = (type) => {
    setCallType(type);
    setShowCallDialog(true);
  };

  // Fungsi untuk mengonfirmasi panggilan
  const handleConfirmCall = () => {
    setShowCallDialog(false);
    // Menambahkan panggilan ke dalam history
    const newCall = {
      number: phoneNumber,
      time: new Date().toLocaleString(),
      status: 'Diterima',
      type: callType
    };

    const updatedHistory = [...callHistory, newCall];
    setCallHistory(updatedHistory);
    localStorage.setItem('callHistory', JSON.stringify(updatedHistory)); // Menyimpan riwayat ke localStorage

    router.push('/call');
  };

  // Fungsi untuk mengonfirmasi panggilan video
  const handleConfirmVideoCall = () => {
    setShowCallDialog(false);
    const newCall = {
      number: phoneNumber,
      time: new Date().toLocaleString(),
      status: 'Diterima',
      type: 'video'
    };

    const updatedHistory = [...callHistory, newCall];
    setCallHistory(updatedHistory);
    localStorage.setItem('callHistory', JSON.stringify(updatedHistory)); // Menyimpan riwayat ke localStorage

    router.push('/videocall');
  }

  // Fungsi logout
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Navbar */}
      <nav className="bg-zinc-900 border-b border-stone-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-[#21a181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-white font-bold text-xl">VoIP Connect</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className={`h-2 w-2 rounded-full ${userInfo.status === 'available' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
              <span className="text-gray-300 text-sm capitalize">{userInfo.status}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white flex items-center space-x-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
          {/* Dial Pad */}
          <div className="bg-zinc-900 rounded-2xl shadow border border-stone-800">
            <div className="bg-[#21a181] px-5 py-3 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-white">Dial Pad</h2>
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter number..."
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21a181] text-white bg-transparent"
                  value={phoneNumber}
                  readOnly
                />
                <button
                  onClick={handleClearNumber}
                  className="p-2 bg-stone-800 rounded hover:bg-stone-700"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-5">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className="p-4 bg-stone-800 rounded-lg hover:bg-stone-700 text-white text-lg font-semibold transition"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleCall('voice')}
                  className="flex-1 font-semibold bg-[#21a181] hover:bg-[#1b8569] text-white py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Voice Call
                </button>
                <button
                  onClick={() => handleCall('video')}
                  className="flex-1 font-semibold bg-[#21a181] hover:bg-[#1b8569] text-white py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video Call
                </button>
              </div>

              <div className="mt-5 flex justify-center">
                <Link href="/history" className="text-[#21a181] text-sm flex items-center gap-1 hover:underline font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Call History
                </Link>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-zinc-900 rounded-2xl shadow border border-stone-800">
            <div className="bg-[#21a181] px-5 py-3 rounded-t-2xl">
              <h2 className="text-lg font-semibold text-white">User Information</h2>
            </div>

            <div className="px-5 py-5 flex flex-col items-center border-b border-stone-800">
              <div className="bg-[#4cc9a5] rounded-full p-5 mb-2">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white">{userInfo.name}</h3>
              <div className="flex items-center mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                <span className="text-gray-300 text-sm capitalize">{userInfo.status}</span>
              </div>
            </div>

            <div className="p-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="bg-[#21a181] bg-opacity-10 p-2 rounded">
                  <svg className="w-4 h-4 text-[#21a181]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-300">Phone Number</p>
                  <p className="text-base font-medium text-gray-200">{userInfo.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Confirmation Dialog */}
      {showCallDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl border border-stone-700 p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              {callType === 'video' ? 'Start Video Call?' : 'Start Voice Call?'}
            </h3>
            <p className="text-gray-300 mb-6">
              You are about to call: <span className="font-medium text-white">{phoneNumber || 'Unknown number'}</span>
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCallDialog(false)}
                className="flex-1 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              {callType === 'video' ? (
                <button
                  onClick={handleConfirmVideoCall}
                  className="flex-1 py-2 bg-[#21a181] hover:bg-[#1b8569] text-white rounded-lg transition flex items-center justify-center gap-2"
                >


                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Video Call
                </button>
              ) : (
                <button
                  onClick={handleConfirmCall}
                  className="flex-1 py-2 bg-[#21a181] hover:bg-[#1b8569] text-white rounded-lg transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Call
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
