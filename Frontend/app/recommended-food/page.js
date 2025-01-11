import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';

export default function CaloriesCalculator() {
    return (
        <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
            {/* Navigation */}
            <Navbar />

            {/* Recommended Foods */}
            <section className="md:p-10 p-8">
                <div className="flex md:flex-row flex-col-reverse justify-between md:items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Recommended Foods</h2>
                    </div>
                    <Image src="/images/recommend_food.svg" width={180} height={180} alt="recommend_food" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            name: 'Mixed Green Salad',
                            calories: 180,
                            tag: 'Vegetarian',
                            image: '/images/green_salad.svg',
                        },
                        {
                            name: 'Whey Protein Shake',
                            calories: 120,
                            tag: 'Low Carb',
                            image: '/images/protein_shake.svg',
                        },
                        {
                            name: 'Mie Shirataki',
                            calories: 60,
                            tag: 'Low Carb',
                            image: '/images/mie-shirataki.jpg',
                        },
                        {
                            name: 'Sheet Pan Chicken Fajitas',
                            calories: 310,
                            tag: 'Fiber Rich',
                            image: '/images/sheetpan-chicken-fajitas.jpg',
                        },
                        {
                            name: 'Seared Salmon With Charred Green Beans',
                            calories: 285,
                            tag: 'Fiber Rich',
                            image: '/images/seared-salmon.jpg',
                        },
                        {
                            name: 'Sautéed Broccoli with Peanut Sauce',
                            calories: 154,
                            tag: 'Fiber Rich',
                            image: '/images/sauteed.jpg',
                        },
                        {
                            name: 'Salmon-Stuffed Avocados',
                            calories: 293,
                            tag: 'Fiber Rich',
                            image: '/images/salmon-avocado.jpg',
                        },
                        {
                            name: 'Cherry Tomato & Garlic Pasta',
                            calories: 385,
                            tag: 'Fiber Rich',
                            image: '/images/cherry.jpg',
                        },
                        {
                            name: 'Kale & Avocado Salad with Blueberries & Edamame',
                            calories: 376,
                            tag: 'Vegetarian',
                            image: '/images/kale.jpg',
                        },
                        {
                            name: 'Air Fryer Squash Soup',
                            calories: 280,
                            tag: 'Fiber Rich',
                            image: '/images/squash-soup.jpg',
                        },
                        {
                            name: 'Apple',
                            calories: 80,
                            tag: 'Fiber Rich',
                            image: '/images/apple.jpg',
                        },
                        {
                            name: 'Spinach Ravioli with Artichokes & Olives',
                            calories: 454,
                            tag: 'Vegetarian',
                            image: '/images/spinach.jpg',
                        },
                    ].map((food, index) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <div className="relative h-64 mb-4">
                                    <Image
                                        src={food.image}
                                        alt={food.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                                <Badge className="mb-2">{food.tag}</Badge>
                                <h3 className="font-semibold">{food.name}</h3>
                                <p className="text-sm text-gray-600">{food.calories} Calories</p>
                                <div className="flex justify-between items-center mt-4">
                                    <Link href={`/resep?name=${encodeURIComponent(food.name)}`} passHref>
                                        <Button
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                                        >
                                            View Recipe
                                        </Button>
                                    </Link>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <p className="text-sm">© 2024 FitFuel. Seluruh hak cipta dilindungi undang-undang.</p>
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
