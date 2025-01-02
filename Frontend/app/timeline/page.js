'use client'

import React, { useState, useEffect } from 'react'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, MessageSquare, BookmarkIcon as BookmarkSimple, MoreHorizontal, ImageIcon } from 'lucide-react'
import Navbar from '@/components/ui/navbar'

// Post Component
const Post = ({ post, onLike, onBookmark, onComment }) => {
  const { author, content, image, time, likes, comments } = post
  const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === 'currentUserId')) // Set current user like status
  const [isBookmarked, setIsBookmarked] = useState(false)  // You can implement bookmark state if needed
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    const updatedLikes = [...likes]
    if (isLiked) {
      updatedLikes.splice(updatedLikes.findIndex(like => like.userId === 'currentUserId'), 1) // Remove like if already liked
    } else {
      updatedLikes.push({ userId: 'currentUserId', avatar: 'userAvatarUrl', name: 'Current User' }) // Add like if not already liked
    }
    setIsLiked(!isLiked)
    onLike(post.id, updatedLikes)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onBookmark(post.id)
  }

  const handleComment = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      const newComment = { userId: 'currentUserId', text: commentText, avatar: 'userAvatarUrl', author: 'Current User' }
      onComment(post.id, newComment)
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
              {author?.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>  // Menampilkan huruf pertama jika avatar tidak ada
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{author?.name || 'Anonymous'}</h3>
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
            <span>{likes.length}</span> {/* Display number of likes */}
          </button>
          <button className="flex items-center gap-2 text-gray-600">
            <MessageSquare size={20} />
            <span>{comments.length}</span> {/* Display number of comments */}
          </button>
          <button
            className={`flex items-center gap-2 ${isBookmarked ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={handleBookmark}
          >
            <BookmarkSimple size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm mb-2">{comments.length} Komentar</div>
            {comments.map((comment, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold">{comment.author}</span>: {comment.text}
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
  const [posts, setPosts] = useState([])
  const [newPostContent, setNewPostContent] = useState('')
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pengguna/timeline-pengguna') // Update URL to /api/pengguna/timeline
        if (response.ok) {
          const data = await response.json()
          setPosts(data.map(item => ({
            id: item.id,
            time: new Date(item.tanggal).toLocaleString(),
            content: item.catatanKemajuan,
            likes: item.likes || [],
            comments: item.comments || [],
            image: item.image || null,
            author: item.author || { name: 'User', avatar: 'https://github.com/shadcn.png' }
          })))
        } else {
          console.error('Failed to fetch posts')
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
  useEffect(() => {
    // Fetch posts from backend

    fetchPosts()
  }, [])

  const handleNewPost = async (e) => {
    e.preventDefault()
    if (newPostContent.trim()) {
      try {
      const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/api/pengguna/timeline-pengguna', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            catatanKemajuan: newPostContent,
            tanggal: new Date(),
            beratBadan: 70, // Set default weight or get from input if needed
            likes: [],
            comments: [],
          }),
        })

        if (response.ok) {
          fetchPosts()
        } else {
          console.error('Failed to create post')
        }
      } catch (error) {
        console.error('Error creating post:', error)
      }
    }
  }

  const handleLike = (postId, updatedLikes) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: updatedLikes } : post
    )
    setPosts(updatedPosts)
    const token = localStorage.getItem('token')
    // Update likes on the server
    fetch(`http://localhost:8080/api/pengguna/timeline-pengguna/${postId}/likes`, {
      method: 'POST',
      body: JSON.stringify({ likes: updatedLikes }),
      headers: { 'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`},
    })
  }

  const handleBookmark = (postId) => {
    // Handle bookmark (currently no backend interaction)
  }

  const handleComment = (postId, newComment) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    )
    setPosts(updatedPosts)
const token = localStorage.getItem('token')
    // Update comments on the server
    fetch(`http://localhost:8080/api/pengguna/timeline-pengguna/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment: newComment }),
      headers: { 'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`},
    })
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
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onComment={handleComment}
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
