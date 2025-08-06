import React from 'react';
import { Link } from 'react-router-dom';
import './Posts.css';

const PostItem = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="post-item">
      <div className="post-header">
        <Link to={`/profile/${post.author.username}`} className="post-author">
          {post.author.first_name} {post.author.last_name} (@{post.author.username})
        </Link>
        <span className="post-date">{formatDate(post.created_at)}</span>
      </div>
      <div className="post-content">
        {post.content}
      </div>
    </div>
  );
};

export default PostItem;