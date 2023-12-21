import './style.scss';
import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard';
import Button from '../Button';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Add a state for the current page

  const fetchPosts = async () => {
    // TODO: create custom hook / re-usable function for this.
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
        token: `${process.env.REACT_APP_AUTH_TOKEN}`,
      },
    };

    try {
      const response = await fetch(
        `https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=4&sortBy=created_at&sortDirection=desc&ber`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      console.log('result: ', result);

      if (page === 1) {
        setPosts(result.data);
      } else {
        // Append new posts to existing posts
        setPosts((prevPosts) => [...prevPosts, ...result.data]);
      }
    } catch (error) {
      return console.log('error', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    console.log('page from useEffect: ', page);
    console.log('posts from useEffect: ', posts);
  }, [page]); // Call fetchPosts whenever the page changes

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number to load the next page
  };

  return (
    <div className="blog-preview">
      <div className="blog-preview__card-container">
        {posts?.map(({ id, img_url, created_at, title, category, content }) => (
          <BlogCard
            key={id}
            imageSrc={img_url}
            date={created_at}
            title={title}
            category={category.name}
            text={content}
          />
        ))}
      </div>
      <Button type="submit" text="Laad meer" onClick={loadMorePosts} />
    </div>
  );
};

export default BlogPreview;
