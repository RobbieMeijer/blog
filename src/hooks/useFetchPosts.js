import { useState, useEffect } from 'react';

const useFetchPosts = ({ perPage, fetchType }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchPosts = async () => {
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
      // Fallback: check if required fields are not empty and of correct type and correct value.
      if (
        !perPage ||
        !fetchType ||
        typeof perPage !== 'number' ||
        typeof fetchType !== 'string' ||
        !['loadmore', 'pagination'].includes(fetchType)
      ) {
        console.log('Invalid input');
        return;
      }

      // Fetch posts data.
      const response = await fetch(
        `https://frontend-case-api.sbdev.nl/api/posts?page=${currentPage}&perPage=${perPage}&sortBy=created_at&sortDirection=desc&ber`,
        requestOptions
      );

      // Throw error if response is not ok.
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Get json formatted data from response.
      const result = await response.json();
      const { data: posts, last_page } = result;

      // Save posts in state, depending on fetch type.
      switch (fetchType) {
        case 'loadmore':
          // Set first posts in state.
          if (1 === currentPage) {
            setPosts(posts);
          } else {
            // Append new posts to existing posts in state.
            setPosts((prevPosts) => [...prevPosts, ...posts]);
          }
          break;
        case 'pagination':
          setPosts(posts);
          break;
        default:
          break;
      }

      // Set last page in state, if last page is equel to current page, load more button is not required.
      setLastPage(last_page);
    } catch (error) {
      console.log('error', error);
    }
  };

  const loadMorePosts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // Initial fetch.
    fetchPosts();
  }, [currentPage]);

  return {
    posts,
    currentPage,
    setCurrentPage,
    lastPage,
    loadMorePosts,
  };
};

export default useFetchPosts;
