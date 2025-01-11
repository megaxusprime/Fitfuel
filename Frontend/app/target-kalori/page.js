'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/ui/navbar';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

export default function TargetKalori() {
    const form = useForm({
        defaultValues: {
            targetKalori: " ",
        },
    });

    const [currentKalori, setCurrentKalori] = useState(null);
    const [targetKalori, setTargetKalori] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [isLocked, setIsLocked] = useState(false);

    // Fungsi untuk memuat ulang Current Calorie
    const fetchCurrentCalorie = async () => {
        const token = await localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8080/api/target-kalori/sum/kalori', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentKalori(data.kalori);

                // Simpan Current Calorie ke localStorage untuk persistensi
                localStorage.setItem('currentKalori', data.kalori);
            } else {
                console.error('Gagal memuat current calorie.');
            }
        } catch (error) {
            console.error('Error fetching current calorie:', error);
        }
    };

    // Load data dari localStorage dan muat ulang Current Calorie saat halaman dimuat
    useEffect(() => {
        const savedTarget = localStorage.getItem('targetKalori');
        const savedCurrent = localStorage.getItem('currentKalori');
        const savedStatus = localStorage.getItem('statusMessage');
        const savedLockState = localStorage.getItem('isLocked');

        if (savedTarget) setTargetKalori(Number(savedTarget));
        if (savedCurrent) setCurrentKalori(Number(savedCurrent));
        if (savedStatus) setStatusMessage(savedStatus);
        setIsLocked(savedLockState === 'true');

        // Muat ulang Current Calorie dari backend
        fetchCurrentCalorie();
    }, []);

    const handleSubmitForm = async (values) => {
        if (isLocked) {
            alert('Target kalori sudah terkunci. Tekan tombol "Reset Target" untuk mengubahnya.');
            return;
        }

        const token = await localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');

        try {
            const response = await fetch('http://localhost:8080/api/target-kalori/sum/kalori', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const currentKalori = data.kalori;

                setTargetKalori(values.targetKalori);
                setCurrentKalori(currentKalori);
                setIsLocked(true);

                // Simpan data ke localStorage
                localStorage.setItem('targetKalori', values.targetKalori);
                localStorage.setItem('currentKalori', currentKalori);
                localStorage.setItem('isLocked', 'true');

                if (currentKalori > values.targetKalori) {
                    const message = 'Kalori anda sudah melebihi target.';
                    setStatusMessage(message);
                    localStorage.setItem('statusMessage', message);
                } else if (currentKalori < values.targetKalori) {
                    const message = 'Kalori anda masih dibawah target.';
                    setStatusMessage(message);
                    localStorage.setItem('statusMessage', message);
                } else {
                    const message = 'Kalori anda tepat dengan target.';
                    setStatusMessage(message);
                    localStorage.setItem('statusMessage', message);
                }
            } else {
                const errorData = await response.json();
                form.setError('targetKalori', { message: errorData.message || 'Gagal mengambil data.' });
            }
        } catch (err) {
            console.error('Error during target kalori submission:', err);
            form.setError('targetKalori', { message: 'Terjadi kesalahan tak terduga. Silakan coba lagi.' });
        }
    };

    const handleResetTarget = () => {
        // Hapus data dari localStorage terlebih dahulu
        localStorage.removeItem('targetKalori');
        localStorage.removeItem('currentKalori');
        localStorage.removeItem('statusMessage');
        localStorage.removeItem('isLocked');

        // Reset state setelah localStorage dihapus
        setTimeout(() => {
            setTargetKalori(0);
            setCurrentKalori(null);
            setStatusMessage('');
            setIsLocked(false);
        }, 50); // Timeout kecil untuk memastikan state ter-update
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-center py-10 rounded-b-lg shadow-md">
                <h1 className="text-4xl font-bold text-white mb-2">Daily Calorie Target</h1>
                <p className="text-gray-100 text-lg">
                    Set your daily calorie goal and track your progress effectively.
                </p>
            </section>

            {/* Main Content */}
            <div className="flex-1 grid md:grid-cols-2 gap-8 mt-12 px-4 md:px-16">
                {/* Form Section */}
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-green-600">Set Your Target</h2>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="targetKalori"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 font-semibold">
                                            Target Kalori
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Masukkan target kalori harian"
                                                {...field}
                                                className="border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md"
                                                disabled={isLocked} // Input terkunci saat target terkunci
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!isLocked ? (
                                <Button
                                    type="submit"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition duration-200"
                                >
                                    Save Target
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleResetTarget}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-200"
                                >
                                    Reset Target
                                </Button>
                            )}
                        </form>
                    </Form>
                </div>

                {/* Result Section */}
                <div className="p-6 bg-green-50 rounded-lg shadow-lg">
                    {currentKalori !== null ? (
                        <div>
                            <h3 className="text-xl font-bold text-green-600 mb-4">Your Progress</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-700 text-lg font-medium">Current Calorie:</span>
                                <p className="text-xl text-gray-800 font-bold">{currentKalori}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-gray-700 text-lg font-medium">Target Calorie:</span>
                                <p className="text-xl text-gray-800 font-bold">{targetKalori}</p>
                            </div>
                            <p
                                className={`mt-4 text-lg font-semibold ${
                                    statusMessage.includes('melebihi')
                                        ? 'text-red-500'
                                        : statusMessage.includes('di bawah')
                                            ? 'text-yellow-500'
                                            : 'text-green-500'
                                }`}
                            >
                                {statusMessage}
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-700">No Data Available</h3>
                            <p className="text-gray-600">Enter a target to start tracking your progress.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">© 2024 FitFuel. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}