import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogPost = { title, content };
    await axios.post('https://api.cgnbfnfghnfhnryfh.nl/blogposts', blogPost); // TODO: replace with API URL.
    setTitle('');
    setContent('');
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <input
        className="blog-form__title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="blog-form__content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="blog__btn blog-form__btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default BlogForm;
