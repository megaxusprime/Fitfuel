'use client';

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageSquare, BookmarkIcon as BookmarkSimple, MoreHorizontal, ImageIcon } from 'lucide-react';
import Navbar from '@/components/ui/navbar';

const Post = ({ post, onLike, onBookmark, onComment, onEdit, onDelete }) => {
  const { id, author, content, image, time, likes, comments } = post;
  const [isLiked, setIsLiked] = useState(likes.some(like => like.userId === 'currentUserId'));
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    const updatedLikes = [...likes];
    if (isLiked) {
      updatedLikes.splice(updatedLikes.findIndex(like => like.userId === 'currentUserId'), 1);
    } else {
      updatedLikes.push({ userId: 'currentUserId' });
    }
    setIsLiked(!isLiked);
    onLike(id, updatedLikes);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(id);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = { userId: 'currentUserId', text: commentText, author: 'Current User' };
      onComment(id, newComment);
      setCommentText('');
    }
  };

  return (
      <Card className="mb-4">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex justify-between items-start mb-4 relative">
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
                    <AvatarFallback>{author?.name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-semibold">{author?.name || 'Anonymous'}</h3>
                <p className="text-sm text-gray-600">{content}</p>
              </div>
            </div>
            <div className="relative">
              <button
                  className="text-gray-600"
                  onClick={() => setShowOptions(!showOptions)}
              >
                <MoreHorizontal size={20} />
              </button>
              {showOptions && (
                  <div className="absolute right-0 mt-2 bg-white shadow rounded p-2 z-10">
                    <button onClick={() => onEdit(post)} className="text-blue-500 block mb-2">
                      Edit
                    </button>
                    <button onClick={() => onDelete(post.id)} className="text-red-500">
                      Delete
                    </button>
                  </div>
              )}
            </div>
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
          <div className="text-sm text-gray-500 mb-3">{time}</div>

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
  );
};

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null); // Default state null
  const [newPostContent, setNewPostContent] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pengguna/timeline-pengguna');

      // Periksa status response
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return; // Hentikan eksekusi jika response gagal
      }

      // Periksa apakah response kosong
      const text = await response.text();
      const data = text ? JSON.parse(text) : []; // Parse JSON hanya jika teks tidak kosong

      console.log('Fetched posts:', data); // Debugging

      // Perbarui state dengan data yang diambil
      setPosts(data.map(item => ({
        id: item.id,
        time: new Date(item.tanggal).toLocaleString(),
        content: item.catatanKemajuan,
        likes: item.likes || [],
        comments: item.comments || [],
        image: item.image || null,
        author: item.author || { name: 'User', avatar: 'https://github.com/shadcn.png' },
      })));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/pengguna/timeline-pengguna', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            catatanKemajuan: newPostContent,
            tanggal: new Date().toISOString(),
            likes: [],
            comments: [],
          }),
        });

        if (response.ok) {
          alert('Postingan berhasil dibuat!');
          setNewPostContent('');
          fetchPosts();
        } else {
          console.error('Failed to create post');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus postingan ini?')) return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/api/pengguna/timeline-pengguna/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Postingan berhasil dihapus');
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)); // Hapus postingan dari state
      } else {
        console.error('Gagal menghapus postingan');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleUpdatePost = async () => {
    if (!editPost) {
      console.error('Tidak ada postingan untuk diperbarui');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/api/pengguna/timeline-pengguna/${editPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          catatanKemajuan: editPost.content,
          tanggal: new Date().toISOString(), // Pastikan tanggal diperbarui jika diperlukan
        }),
      });

      if (response.ok) {
        alert('Postingan berhasil diperbarui');
        setEditPost(null); // Reset state editPost
        await fetchPosts(); // Panggil fetchPosts untuk memuat ulang data dari backend
      } else {
        console.error('Gagal memperbarui postingan');
      }
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
      <div className="min-h-screen flex flex-col max-w-screen overflow-hidden">
        <Navbar />

        {/* Modal for Editing Post */}
        {editPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="mb-4">Edit Postingan</h3>
                <Input
                    type="text"
                    value={editPost?.content || ""}
                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                />
                <div className="flex justify-end gap-4 mt-4">
                  <Button onClick={() => setEditPost(null)}>Cancel</Button>
                  <Button onClick={handleUpdatePost}>Save</Button>
                </div>
              </div>
            </div>
        )}

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
                    <Input
                        placeholder="Apa yang sedang anda pikirkan, User?"
                        className="flex-1"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <Button type="submit">Post</Button>
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
                    onLike={(postId, updatedLikes) => {
                      const updatedPosts = posts.map((post) =>
                          post.id === postId ? { ...post, likes: updatedLikes } : post
                      );
                      setPosts(updatedPosts);
                    }}
                    onBookmark={(postId) => console.log(`Post ${postId} bookmarked`)}
                    onComment={(postId, newComment) => {
                      const updatedPosts = posts.map((post) =>
                          post.id === postId
                              ? { ...post, comments: [...post.comments, newComment] }
                              : post
                      );
                      setPosts(updatedPosts);
                    }}
                    onEdit={(post) => setEditPost(post)}
                    onDelete={handleDeletePost}
                />
            ))}
          </div>
        </main>

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