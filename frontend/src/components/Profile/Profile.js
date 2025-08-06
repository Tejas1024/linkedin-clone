import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { authAPI, postsAPI } from '../../services/api';
import PostList from '../Posts/PostList';
import './Profile.css';

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [username]);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getUserProfile(username);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await postsAPI.getUserPosts(username);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{profile.first_name} {profile.last_name}</h1>
        <p className="profile-username">@{profile.username}</p>
        <p className="profile-email">{profile.email}</p>
        {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        <div className="profile-stats">
          <span>{profile.posts_count} posts</span>
          <span>Joined {new Date(profile.date_joined).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="profile-posts">
        <h2>Posts by {profile.first_name}</h2>
        <PostList posts={posts} />
      </div>
    </div>
  );
};

export default Profile;