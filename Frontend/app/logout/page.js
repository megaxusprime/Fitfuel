'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Pastikan Button ada di komponen Anda
import { useAuth } from '@/contexts/AuthContext'; // Context untuk logout

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        await fetch('http://localhost:8080/api/pengguna/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      localStorage.removeItem('token'); // Hapus token
      logout(); // Update status logout
      router.push('/login'); // Redirect ke halaman login
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard'); // Atau halaman lain yang sesuai
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">Anda yakin ingin logout?</h2>
          <p className="mb-6 text-gray-600">Jika Anda logout, Anda perlu login kembali untuk mengakses akun Anda.</p>
          <div className="flex justify-center gap-4">
            <Button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Ya, Logout
            </Button>
            <Button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
  );
}
