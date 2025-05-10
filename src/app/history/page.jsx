import Link from 'next/link';

export default function History() {


  return (
    <div className="min-h-screen bg-black font-sans flex lg:items-center justify-center px-4">
      <div className="max-w-4xl w-full py-6">
        {/* Call History */}
        <div className="bg-zinc-900 rounded-2xl shadow border border-stone-800">
          <div className="bg-[#21a181] px-5 py-3 rounded-t-2xl">
            <h2 className="text-lg font-semibold text-white">Riwayat Panggilan</h2>
          </div>
          <div className="p-5 space-y-4">
            {callHistory.map((call, index) => (
              <div key={index} className="flex items-center gap-3 border-b border-stone-800 pb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-200">{call.number}</p>
                  <p className="text-xs text-gray-300">{call.time}</p>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  call.status === "Diterima" ? "bg-green-400/30 text-green-200" :
                  "bg-red-400/30 text-red-200"
                }`}>
                  {call.status}
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 flex justify-center">
            <Link href="/number" className="text-[#21a181] text-sm flex items-center gap-1 hover:underline font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Kembali ke Dial Pad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
