'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/ui/navbar';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/pengguna/profil`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            username: data.username || 'Tidak ada username',
            email: data.email || 'Tidak ada email',
            name: data.name || 'Tidak ada nama pengguna',
          });
        } else {
          const errorData = await response.text();
          setError(errorData || 'Gagal mengambil data profil.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Terjadi kesalahan saat mengambil data profil.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (!isClient) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navigation */}
        <Navbar />

        {/* User Welcome Section */}
        <section className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 p-8">
          <div className="container mx-auto flex justify-between items-center flex-col md:flex-row">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage src="https://github.com/shadcn.png" alt={profile?.username || "User"} />
                <AvatarFallback>{profile?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome, {profile?.name || "User"}!</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-white text-green-600">Healthy Living</Badge>
                  <Badge variant="secondary" className="bg-white text-green-600">Calorie Tracking</Badge>
                </div>
                <p className="text-white/90 mt-2">Track your daily calorie intake and stay on target with your health goals.</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Link href="/edit-profil">
                <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-md">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <main className="container mx-auto py-12 space-y-12">
          {/* Recommended Foods */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Recommended Foods</h2>
              <p className="text-gray-600 mt-2">Explore healthy food options to meet your daily calorie goals.</p>
              <div className="flex justify-center gap-4 w-full mt-4">
                <Link href="/calories-calculator">
                  <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-100">
                    Add to Diary
                  </Button>
                </Link>
                <Link href="/recommended-food" passHref>
                  <Button className="bg-green-500 text-white hover:bg-green-600 w-full">
                    View All
                  </Button>
                </Link>
              </div>
            </div>


            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Mixed Green Salad',
                  calories: 180,
                  tag: 'Vegetarian',
                  image: '/images/green_salad.svg'
                },
                {
                  name: 'Whey Protein Shake',
                  calories: 120,
                  tag: 'Low Carb',
                  image: '/images/protein_shake.svg'
                },
                {
                  name: 'Apple',
                  calories: 80,
                  tag: 'Fiber Rich',
                  image: '/images/apple.jpg'
                }
              ].map((food, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition rounded-lg overflow-hidden">
                    <CardContent className="p-6">
                      <div className="relative h-48 mb-4">
                        <Image
                            src={food.image}
                            alt={food.name}
                            fill
                            className="object-cover rounded-md"
                        />
                      </div>
                      <Badge className="bg-green-500 text-white mb-2">{food.tag}</Badge>
                      <h3 className="font-semibold text-lg text-gray-800">{food.name}</h3>
                      <p className="text-sm text-gray-600">{food.calories} Calories</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p className="text-sm">© 2024 FitFuel. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Indonesia</span>
              <Image
                  src="/images/indonesia.svg"
                  alt="Indonesia flag"
                  width={24}
                  height={24}
              />
            </div>
          </div>
        </footer>
      </div>
  );
}
