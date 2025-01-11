'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/ui/navbar';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';

const recipes = [
    {
        name: 'Mixed Green Salad',
        description: 'A healthy salad with mixed greens.',
        image: '/images/green_salad.svg',
        ingredients: ['Lettuce', 'Spinach', 'Cucumber', 'Tomatoes', 'Olive Oil'],
        steps: ['Wash vegetables', 'Cut into pieces', 'Mix and serve'],
    },
    {
        name: 'Whey Protein Shake',
        description: 'A low-carb, high-protein shake.',
        image: '/images/protein_shake.svg',
        ingredients: ['Whey protein powder', 'Almond milk', 'Ice cubes'],
        steps: ['Add ingredients to blender', 'Blend until smooth', 'Serve immediately'],
    },
    {
        name: 'Mie Shirataki',
        description: 'A low-carb alternative to traditional noodles.',
        image: '/images/mie-shirataki.jpg',
        ingredients: ['Shirataki noodles', 'Soy sauce', 'Vegetables'],
        steps: ['Boil noodles', 'Stir-fry with vegetables', 'Add soy sauce and serve'],
    },
    {
        name: 'Sheet Pan Chicken Fajitas',
        description: 'A flavorful chicken fajitas dish cooked on a sheet pan.',
        image: '/images/sheetpan-chicken-fajitas.jpg',
        ingredients: ['Chicken breasts', 'Bell peppers', 'Onions', 'Fajita seasoning', 'Olive oil'],
        steps: ['Preheat oven to 400°F', 'Slice chicken and vegetables', 'Toss with seasoning and oil', 'Spread on sheet pan', 'Bake for 25 minutes'],
    },
    {
        name: 'Seared Salmon With Charred Green Beans',
        description: 'A nutritious salmon dish served with green beans.',
        image: '/images/seared-salmon.jpg',
        ingredients: ['Salmon fillets', 'Green beans', 'Garlic', 'Olive oil', 'Salt and pepper'],
        steps: ['Heat pan with olive oil', 'Sear salmon for 3-4 minutes each side', 'Char green beans with garlic', 'Serve together'],
    },
    {
        name: 'Sautéed Broccoli with Peanut Sauce',
        description: 'Broccoli sautéed and served with a rich peanut sauce.',
        image: '/images/sauteed.jpg',
        ingredients: ['Broccoli florets', 'Peanut butter', 'Soy sauce', 'Garlic', 'Lime juice'],
        steps: ['Steam broccoli', 'Mix peanut butter, soy sauce, garlic, and lime juice', 'Sauté broccoli and drizzle with sauce'],
    },
    {
        name: 'Salmon-Stuffed Avocados',
        description: 'Avocado halves filled with a flavorful salmon mixture.',
        image: '/images/salmon-avocado.jpg',
        ingredients: ['Avocados', 'Canned salmon', 'Greek yogurt', 'Dill', 'Lemon juice'],
        steps: ['Cut avocados in half and remove pits', 'Mix salmon, yogurt, dill, and lemon juice', 'Stuff avocado halves with salmon mixture'],
    },
    {
        name: 'Cherry Tomato & Garlic Pasta',
        description: 'A simple yet delicious pasta with cherry tomatoes and garlic.',
        image: '/images/cherry.jpg',
        ingredients: ['Spaghetti', 'Cherry tomatoes', 'Garlic', 'Olive oil', 'Basil', 'Parmesan cheese'],
        steps: ['Cook spaghetti according to package', 'Sauté garlic and cherry tomatoes in olive oil', 'Toss with spaghetti', 'Garnish with basil and parmesan'],
    },
    {
        name: 'Kale & Avocado Salad with Blueberries & Edamame',
        description: 'A nutrient-packed salad with kale, avocado, blueberries, and edamame.',
        image: '/images/kale.jpg',
        ingredients: ['Kale', 'Avocado', 'Blueberries', 'Edamame', 'Lemon juice', 'Olive oil'],
        steps: ['Massage kale with lemon juice and olive oil', 'Add avocado slices, blueberries, and edamame', 'Toss and serve'],
    },
    {
        name: 'Air Fryer Squash Soup',
        description: 'A creamy and rich squash soup made with an air fryer.',
        image: '/images/squash-soup.jpg',
        ingredients: ['Butternut squash', 'Onion', 'Garlic', 'Chicken stock', 'Cream'],
        steps: ['Roast squash in air fryer', 'Sauté onion and garlic', 'Blend squash, onion, garlic, and chicken stock', 'Add cream and simmer'],
    },
    {
        name: 'Apple',
        description: 'A healthy and simple snack made from fresh apples.',
        image: '/images/apple.jpg',
        ingredients: ['Apple'],
        steps: ['Wash apple', 'Slice into pieces if desired', 'Serve fresh'],
    },
    {
        name: 'Spinach Ravioli with Artichokes & Olives',
        description: 'A rich and savory ravioli dish with artichokes and olives.',
        image: '/images/spinach.jpg',
        ingredients: ['Spinach ravioli', 'Artichoke hearts', 'Olives', 'Garlic', 'Olive oil', 'Parmesan cheese'],
        steps: ['Cook ravioli according to package', 'Sauté garlic, artichokes, and olives in olive oil', 'Toss with cooked ravioli', 'Garnish with parmesan cheese'],
    },
];


export default function RecipePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const recipeName = searchParams.get('name');
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        if (recipeName) {
            const foundRecipe = recipes.find((r) => r.name.toLowerCase() === recipeName.toLowerCase());
            setRecipe(foundRecipe || null);
        }
    }, [recipeName]);

    if (!recipe) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Recipe Not Found</h1>
                    <p className="text-gray-600 mt-4">We couldn't find a recipe for "{recipeName}".</p>
                    <Button
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => router.back()}
                    >
                        Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-6 md:p-12">
                {/* Back Button */}
                <Button
                    className="mb-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    onClick={() => router.back()}
                >
                    Back
                </Button>

                {/* Recipe Details */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/3">
                            {recipe.image ? (
                                <Image
                                    src={recipe.image}
                                    alt={recipe.name}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                                    <p className="text-gray-500">No Image Available</p>
                                </div>
                            )}
                        </div>

                        {/* Recipe Info Section */}
                        <div className="md:w-2/3 p-6">
                            <h1 className="text-3xl font-bold text-gray-800 text-center">{recipe.name}</h1>
                            <p className="text-gray-600 mt-2 text-center">{recipe.description}</p>
                        </div>
                    </div>
                </div>

                {/* Ingredients Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Ingredients</h2>
                    <ul className="list-disc space-y-2 text-gray-700 text-left ml-6">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Steps Section */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Steps</h2>
                    <ol className="list-decimal space-y-4 text-gray-700 text-left ml-6">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="mb-2">{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
