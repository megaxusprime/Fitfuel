'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/ui/navbar';

// Fungsi formatDate
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CaloriesCalculator = () => {
  const [formData, setFormData] = useState({
    id: null,
    tanggal: '',
    makanan: '',
    kalori: '',
    jumlah: ''
  });

  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

      const response = await fetch('http://localhost:8080/api/asupan', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Gagal memuat riwayat asupan.');
      }

      const data = await response.json();
      setRiwayat(data);
    } catch (err) {
      setError(err?.message || 'Gagal memuat riwayat asupan.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputAsupan = async (e) => {
    e.preventDefault();
    const { id, tanggal, makanan, kalori, jumlah } = formData;

    if (!tanggal || !makanan || !kalori || !jumlah) {
      alert('Mohon lengkapi semua data!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        tanggal: new Date(tanggal).toISOString(),
        makanan,
        kalori: parseFloat(kalori),
        jumlah: parseFloat(jumlah),
      };

      const endpoint = id
          ? `http://localhost:8080/api/asupan/${id}`
          : 'http://localhost:8080/api/asupan';

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan data.');
      }

      alert(id ? 'Data berhasil diperbarui!' : 'Data berhasil dicatat!');
      setFormData({ id: null, tanggal: '', makanan: '', kalori: '', jumlah: '' });
      await fetchRiwayat();
    } catch (err) {
      setError('Gagal menyimpan data.');
      console.error('Error saving data:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      tanggal: item.tanggal.slice(0, 10),
      makanan: item.makanan,
      kalori: item.kalori,
      jumlah: item.jumlah,
    });
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, tanggal: '', makanan: '', kalori: '', jumlah: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/asupan/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data.');
      }

      alert('Data berhasil dihapus!');
      await fetchRiwayat();
    } catch (err) {
      setError('Gagal menghapus data.');
      console.error('Error deleting data:', err);
    }
  };

  if (!isClient) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />
        <header className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 py-10 text-center">
          <h1 className="text-4xl font-bold text-white">Calories Calculator</h1>
          <p className="text-white text-lg mt-2">Track and manage your daily calorie input effectively.</p>
        </header>
        <main className="flex-1 container mx-auto py-8 px-4 space-y-8">
          <Card className="p-6 shadow-md bg-white">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              {formData.id ? 'Edit Calories' : 'Input Calories'}
            </h3>
            <form onSubmit={handleInputAsupan} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date</label>
                <Input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Food Name</label>
                <Input
                    type="text"
                    name="makanan"
                    value={formData.makanan}
                    onChange={handleChange}
                    placeholder="e.g., Nasi Goreng"
                    required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Calories</label>
                <Input
                    type="number"
                    name="kalori"
                    value={formData.kalori}
                    onChange={handleChange}
                    placeholder="e.g., 250"
                    required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Amount</label>
                <Input
                    type="number"
                    name="jumlah"
                    value={formData.jumlah}
                    onChange={handleChange}
                    placeholder="e.g., 1"
                    required
                />
              </div>
              <div className="flex gap-4">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  {formData.id ? 'Update' : 'Input'}
                </button>
                {formData.id && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                )}
              </div>
            </form>
          </Card>

          <Card className="p-6 shadow-md bg-white">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Calorie History</h3>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="space-y-4">
                  {riwayat.map((item) => (
                      <li
                          key={item.id}
                          className="flex justify-between items-center border-b pb-4"
                      >
                        <div>
                          <p className="text-gray-800">
                            <strong>Food:</strong> {item.makanan}
                          </p>
                          <p className="text-gray-600">
                            <strong>Calories:</strong> {item.kalori}, <strong>Amount:</strong> {item.jumlah}, <strong>Date:</strong> {formatDate(item.tanggal)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                              onClick={() => handleEdit(item)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                          >
                            Edit
                          </button>
                          <button
                              onClick={() => handleDelete(item.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                  ))}
                </ul>
            )}
          </Card>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2024 FitFuel. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
};

export default CaloriesCalculator;
