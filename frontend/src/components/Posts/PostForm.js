import React, { useState } from 'react';
import { postsAPI } from '../../services/api';
import './Posts.css';

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await postsAPI.createPost({ content });
      setContent('');
      onPostCreated(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          rows="3"
          maxLength="1000"
          required
        />
        <div className="post-form-actions">
          <span className="char-count">{content.length}/1000</span>
          <button type="submit" disabled={loading || !content.trim()}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;