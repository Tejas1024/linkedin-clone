import React from 'react';
import PostItem from './PostItem';
import './Posts.css';

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <div className="no-posts">No posts to display</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;