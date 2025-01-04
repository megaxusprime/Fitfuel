'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/ui/navbar';

const CaloriesCalculator = () => {
  const [formData, setFormData] = useState({
    id: null, // Tambahkan id untuk mengidentifikasi data yang sedang diedit
    tanggal: '',
    makanan: '',
    kalori: '',
    jumlah: ''
  });

  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

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

  useEffect(() => {
    fetchRiwayat();
  }, []);

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
          ? `http://localhost:8080/api/asupan/${id}` // Endpoint edit jika id ada
          : 'http://localhost:8080/api/asupan'; // Endpoint tambah baru

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
        throw new Error('Gagal menyimpan asupan.');
      }

      alert(id ? 'Asupan berhasil diperbarui!' : 'Asupan berhasil dicatat!');
      setFormData({ id: null, tanggal: '', makanan: '', kalori: '', jumlah: '' });
      await fetchRiwayat(); // Refresh riwayat
    } catch (err) {
      setError('Gagal menyimpan asupan.');
      console.error('Error saving asupan:', err);
    }
  };

  const handleEdit = (item) => {
    console.log('Editing item:', item); // Debug: pastikan item.id ada
    setFormData({
      id: item.id, // Ini digunakan untuk URL
      tanggal: item.tanggal.slice(0, 10),
      makanan: item.makanan,
      kalori: item.kalori,
      jumlah: item.jumlah,
    });
  };


  const handleDelete = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus asupan ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/asupan/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus asupan.');
      }

      alert('Asupan berhasil dihapus!');
      await fetchRiwayat(); // Refresh riwayat
    } catch (err) {
      setError('Gagal menghapus asupan.');
      console.error('Error deleting asupan:', err);
    }
  };

  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-white">
          <div className="container mx-auto p-4">
            <Card className="bg-green-400 p-6 mb-4">
              <h3 className="text-3xl font-bold text-white mb-4">Input/Edit Asupan Kalori</h3>
              <form onSubmit={handleInputAsupan}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Tanggal</label>
                  <Input
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleChange}
                      className="bg-white"
                      required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Nama Makanan</label>
                  <Input
                      type="text"
                      name="makanan"
                      value={formData.makanan}
                      onChange={handleChange}
                      placeholder="Contoh: Nasi Goreng"
                      className="bg-white"
                      required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Kalori</label>
                  <Input
                      type="number"
                      name="kalori"
                      value={formData.kalori}
                      onChange={handleChange}
                      placeholder="Contoh: 250"
                      className="bg-white"
                      required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-white">Jumlah</label>
                  <Input
                      type="number"
                      name="jumlah"
                      value={formData.jumlah}
                      onChange={handleChange}
                      placeholder="Contoh: 1"
                      className="bg-white"
                      required
                  />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {formData.id ? 'Perbarui Asupan' : 'Catat Asupan'}
                </button>
              </form>
            </Card>

            <Card className="bg-green-400 p-6">
              <h3 className="text-3xl font-bold text-white mb-4">Riwayat Asupan Kalori</h3>
              {loading ? (
                  <p>Memuat...</p>
              ) : error ? (
                  <p className="text-red-500">{error}</p>
              ) : (
                  <ul className="list-disc pl-4 bg-white rounded p-4">
                    {riwayat.map((item) => (
                        <li key={item.id} className="flex justify-between items-center">
                          <div>
                            Makanan: {item.makanan}, Kalori: {item.kalori}, Jumlah: {item.jumlah},
                            Tanggal: {formatDate(item.tanggal)}
                          </div>
                          <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="text-blue-500 hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                    ))}
                  </ul>
              )}
            </Card>
          </div>
        </main>
        <footer className="bg-black text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2024 FitFuel. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
};

export default CaloriesCalculator;
