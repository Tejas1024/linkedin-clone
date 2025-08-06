import React, { useState, useEffect } from 'react';
import { postsAPI } from '../services/api';
import PostForm from '../components/Posts/PostForm';
import PostList from '../components/Posts/PostList';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="home-container">
      <h1>Home Feed</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <PostList posts={posts} />
    </div>
  );
};

export default Home;