'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FoodSearch() {
  const [searchType, setSearchType] = useState('riwayat'); // 'riwayat' atau 'rekomendasi'
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      alert('Masukkan kata kunci untuk pencarian.');
      return;
    }

    setIsLoading(true);
    try {
      const endpoint =
          searchType === 'riwayat'
              ? `http://localhost:8080/api/food-search/history`
              : `http://localhost:8080/api/food-search/recommended`;

      const response = await fetch(`${endpoint}?keyword=${encodeURIComponent(searchKeyword)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Gagal mengambil hasil pencarian');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mencari:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (type) => {
    setSearchType(type); // Ubah filter
    setSearchKeyword(''); // Reset keyword pencarian
    setSearchResults([]); // Reset hasil pencarian
  };

  return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
                onClick={() => router.back()}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <h1 className="text-3xl font-extrabold text-gray-800">Food Search</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
                onClick={() => handleFilterChange('riwayat')}
                className={`px-6 py-3 rounded-full transition font-semibold ${
                    searchType === 'riwayat'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
            >
              Food History
            </button>
            <button
                onClick={() => handleFilterChange('rekomendasi')}
                className={`px-6 py-3 rounded-full transition font-semibold ${
                    searchType === 'rekomendasi'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-300 text-black hover:bg-gray-400'
                }`}
            >
              Recommended Foods
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-4 mb-8">
            <input
                type="text"
                placeholder={`Search ${searchType === 'riwayat' ? 'food history' : 'recommended foods'}...`}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-green-300 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              Search
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
              <div className="text-center text-gray-500">
                <p className="animate-pulse">Loading results...</p>
              </div>
          )}

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!isLoading && searchResults.length === 0 && (
                <div className="text-gray-500 text-center col-span-full">
                  No results found.
                </div>
            )}
            {searchResults.map((item, index) => (
                <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.makanan || item.namaMakanan}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <strong>Calories:</strong> {item.kalori} kkal
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Category:</strong> {item.kategori}
                  </p>

                  {/* View Recipe Button */}
                  {searchType === 'rekomendasi' && (
                      <button
                          onClick={() =>
                              router.push(`/resep?name=${encodeURIComponent(item.makanan || item.namaMakanan)}`)
                          }
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
                      >
                        View Recipe
                      </button>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}
