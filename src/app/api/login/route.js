// File: app/api/login/route.js
import { NextResponse } from 'next/server';

const usersDatabase = [
  { phone: '+6281234567890', password: 'password123' }, // Contoh pengguna di database
  { phone: '+6282345678901', password: 'password456' }, // Contoh pengguna lainnya
];

// API route untuk memverifikasi nomor telepon dan password
export async function POST(req) {
  const { phone, password } = await req.json(); // Mengambil data dari body request

  // Validasi jika data phone dan password ada
  const user = usersDatabase.find(
    (user) => user.phone === phone && user.password === password
  );

  if (user) {
    // Jika ditemukan user, kirim response success
    return NextResponse.json({ success: true });
  } else {
    // Jika user tidak ditemukan, kirim response gagal
    return NextResponse.json({ success: false, message: 'Invalid phone or password' });
  }
}
