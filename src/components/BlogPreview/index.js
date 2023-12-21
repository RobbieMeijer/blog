import './style.scss';
import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard';
import Button from '../Button';
import getFullImgUrl from '../../functions/getFullImgUrl';
import getFormattedDate from '../../functions/getformattedDate';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add a state for the current page.
  const [lastPage, setLastPage] = useState(1); // Add a state for the last page.

  const fetchPosts = async () => {
    // TODO: create custom hook / re-usable function for this.

    // Define request options.
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
      // Fetch posts data.
      const response = await fetch(
        `https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}&perPage=4&sortBy=created_at&sortDirection=desc&ber`,
        requestOptions
      );

      // Throw error if response is not ok.
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Get json formatted data from response.
      const result = await response.json();
      const { data: posts, last_page } = result; // Destructure properties from result.
      console.log('result: ', result);

      if (1 === currentPage) {
        // Set first posts in state.
        setPosts(posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...posts]); // Append new posts to existing posts in state.
      }

      // Set last page in state, if last page is equel to current page, load more button is not required.
      setLastPage(last_page);
    } catch (error) {
      return console.log('error', error);
    }
  };

  // Increment the page number to load the next page of posts.
  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchPosts();
    console.log('page from useEffect: ', currentPage);
    console.log('posts from useEffect: ', posts);
  }, [currentPage]); // Call fetchPosts whenever the page changes.

  return (
    <div className="blog-preview">
      <div className="blog-preview__card-container">
        {posts?.map(
          ({
            id,
            img_url: relativeImgPath,
            created_at,
            title,
            category,
            content,
          }) => (
            <BlogCard
              key={id}
              imageSrc={getFullImgUrl(relativeImgPath)}
              date={getFormattedDate(created_at)}
              title={title}
              category={category.name}
              text={content}
            />
          )
        )}
      </div>
      {lastPage !== currentPage && ( // Only show load more button if there are more pages to load.
        <Button type="submit" text="Laad meer" onClick={loadMorePosts} />
      )}
    </div>
  );
};

export default BlogPreview;
