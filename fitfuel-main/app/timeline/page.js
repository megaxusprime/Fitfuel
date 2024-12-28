'use client'

import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageSquare, BookmarkIcon as BookmarkSimple, MoreHorizontal, ImageIcon } from 'lucide-react'
import Navbar from '@/components/ui/navbar'

// Post Component
const Post = ({ author, content, image, time, likes, comments, onLike, onBookmark, onComment }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike()
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark()
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      onComment(commentText)
      setCommentText('')
    }
  }

  return (
    <Card className="mb-4">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <Image
                src={author.avatar}
                alt={author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Avatar>
            <div>
              <h3 className="font-semibold">{author.name}</h3>
              <p className="text-sm text-gray-600">{content}</p>
            </div>
          </div>
          <button className="text-gray-600">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Post Image */}
        {image && (
          <div className="relative md:h-[600px] h-[300px] mb-4 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Post Meta */}
        <div className="text-sm text-gray-500 mb-3">
          {time}
        </div>

        {/* Post Actions */}
        <div className="flex gap-4 mb-3">
          <button 
            className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button className="flex items-center gap-2 text-gray-600">
            <MessageSquare size={20} />
          </button>
          <button 
            className={`flex items-center gap-2 ${isBookmarked ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={handleBookmark}
          >
            <BookmarkSimple size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Likes */}
        {likes && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex -space-x-2">
              {likes.avatars.map((avatar, i) => (
                <Avatar key={i} className="h-6 w-6 border-2 border-white">
                  <Image
                    src={avatar}
                    alt="User who liked"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {likes.text}
            </p>
          </div>
        )}

        {/* Comments */}
        {comments && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm mb-2">{comments.count} Komentar</div>
            {comments.items.map((comment, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold">{comment.author}</span>{' '}
                {comment.text}
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleComment} className="mt-3 flex gap-2">
          <Input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Post</Button>
        </form>
      </div>
    </Card>
  )
}

export default function Timeline() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Rakha Bayu Pratama",
        avatar: "https://i.pravatar.cc/40"
      },
      content: "Hari ini lari cukup 20 km dulu, lanjut makan tapi gak minum protein tambahan dulu.",
      image: "/images/post-1.svg",
      time: "2 jam yang lalu",
      likes: {
        avatars: ["https://i.pravatar.cc/38", "https://i.pravatar.cc/38"],
        text: "Rudi, Ari, Andika Pratama, others..."
      },
      comments: {
        count: 2,
        items: [
          { author: "Tyo Pirmansyah", text: "semangat terus mas" },
          { author: "Rudi", text: "Bisa jadi referensi nih makananya. Gas terus!!!" }
        ]
      }
    },
    {
      id: 2,
      author: {
        name: "Jonathan Fanosara T",
        avatar: "https://i.pravatar.cc/40"
      },
      content: "Awali hari dengan energi positif dan nutrisi yang kaya! Siapa nih yang suka smoothie bowl kayak gini? Apa menu sehat kalian hari ini?? #GoodVibesOnly #HealthyEats",
      image: "/images/post-2.svg",
      time: "10 jam yang lalu",
      likes: {
        avatars: ["https://i.pravatar.cc/38", "https://i.pravatar.cc/38"],
        text: "You, Dendi Sutomo, Indah, others..."
      },
      comments: {
        count: 4,
        items: [
          { author: "Indah", text: "Hari ini menu ku edamame rebus ditambah infused water lemon hehe.." },
          { author: "Fauzan", text: "Enak banget makananya." },
          { author: "Ayu Tri", text: "Hari ini makan omelette sayuran ditambah pancake pisang." },
          { author: "Yuda Yunanda", text: "Lagi suka makan grilled chicken steak ditemani susu oat, trus malemnya makan mango sticky rice dan jus jeruk segar." }
        ]
      }
    }
  ])

  const [newPostContent, setNewPostContent] = useState('')

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: { ...post.likes, text: `You and ${post.likes.text}` } }
        : post
    ))
  }

  const handleBookmark = (postId) => {
    // In a real app, you might want to store this information in a user's profile
    console.log(`Post ${postId} bookmarked`)
  }

  const handleComment = (postId, commentText) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: {
              count: post.comments.count + 1,
              items: [...post.comments.items, { author: "You", text: commentText }]
            }
          }
        : post
    ))
  }

  const handleNewPost = (e) => {
    e.preventDefault()
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: {
          name: "You",
          avatar: "https://i.pravatar.cc/40"
        },
        content: newPostContent,
        time: "Just now",
        likes: {
          avatars: [],
          text: "Be the first to like this"
        },
        comments: {
          count: 0,
          items: []
        }
      }
      setPosts([newPost, ...posts])
      setNewPostContent('')
    }
  }

  return (
    <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Create Post */}
      <div className="border-b">
        <div className="container mx-auto p-4">
          <Card className="p-4">
            <form onSubmit={handleNewPost}>
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Apa yang sedang anda pikirkan, User?"
                      className="flex-1"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <Button type="submit" variant="outline" size="icon">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Timeline */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto p-4">
          {posts.map((post) => (
            <Post 
              key={post.id} 
              {...post} 
              onLike={() => handleLike(post.id)}
              onBookmark={() => handleBookmark(post.id)}
              onComment={(commentText) => handleComment(post.id, commentText)}
            />
          ))}
        </div>
      </main>

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
  )
}
