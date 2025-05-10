'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah halaman reload saat submit

    // Pastikan nomor telepon dan password diisi
    if (!phoneNumber || !password) {
      setError('Nomor Telepon dan Password harus diisi!');
      return; // Jika kosong, hentikan proses login
    }

    try {
      // Panggil API untuk memverifikasi nomor telepon dan password
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ phone: phoneNumber, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (data.success) {
        // Jika login berhasil, simpan session atau token (opsional) dan arahkan ke /number
        localStorage.setItem('userLoggedIn', 'true'); // Simpan status login
        router.push('/number'); // Arahkan ke halaman number setelah login berhasil
      } else {
        setError(data.message || 'Nomor tidak terdaftar atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan, coba lagi nanti');
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex justify-center items-center">
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label className="text-white">Phone</label>
            <input
              type="text"
              placeholder="Masukkan Nomor Telepon"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="p-3 bg-stone-800 text-white rounded-lg mb-4"
            />
          </div>
          <div>
            <label className="text-white">Password</label>
            <input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 bg-stone-800 text-white rounded-lg mb-4"
            />
          </div>
          <button type="submit" className="bg-[#21a181] text-white py-2 px-4 rounded-lg">Login</button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Tampilkan pesan error */}
      </div>
    </div>
  );
}
