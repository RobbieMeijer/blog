import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // TODO: create custom hook for this.
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://api.sfxvdfgthryhyrthjtrdthdt.nl/blogposts?page=${page}&limit=4` // TODO: replace with API URL.
      );
      setPosts((prevPosts) => [...prevPosts, ...res.data]);
    };
    fetchPosts();
  }, [page, posts]);

  return (
    <div className="blog-preview">
      {posts.map((post) => (
        // TODO: create BlogCard component.
        <div className="blog-card" key={post.id}>
          <h2 className="blog-card__heading">{post.title}</h2>
          <p className="blog-card__paragraph">{post.content}</p>
        </div>
      ))}
      <button
        className="blog__btn blog-preview__btn"
        onClick={() => setPage(page + 1)}
      >
        Load more
      </button>
    </div>
  );
}

export default BlogPreview;
