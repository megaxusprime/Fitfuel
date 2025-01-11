'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditProfile() {
  const router = useRouter();
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
        router.push('/dashboard');
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
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-lg font-bold text-gray-700 animate-pulse">Loading...</div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your personal information below.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="focus:ring-green-500 focus:border-green-500"
                  required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="focus:ring-green-500 focus:border-green-500"
                  required
              />
            </div>

            {/* Save Button */}
            <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white w-full py-2 font-semibold rounded-lg"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
  );
}
