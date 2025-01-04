'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditProfile() {
  const router = useRouter(); // Inisialisasi useRouter
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token tidak ditemukan, silakan login kembali.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/pengguna/profil', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || '',
            email: data.email || '',
          });
        } else {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            alert(errorData.message || 'Gagal memuat data profil');
          } else {
            alert('Gagal memuat data profil. Server tidak memberikan respons yang valid.');
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert('Terjadi kesalahan saat memuat data profil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token tidak ditemukan, silakan login kembali.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/pengguna/profil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Profil berhasil diperbarui');
        router.push('/dashboard'); // Navigasi ke halaman dashboard
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          alert(errorData.message || 'Gagal memperbarui profil');
        } else {
          alert('Gagal memperbarui profil. Server tidak memberikan respons yang valid.');
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Terjadi kesalahan saat memperbarui profil.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
            />
          </div>
          <Button type="submit" className="bg-black hover:bg-black/90 w-full">
            Save Changes
          </Button>
        </form>
      </div>
  );
}
