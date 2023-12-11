import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.scss';
import BlogCard from '../BlogCard';
import Button from '../Button';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   // TODO: create custom hook for this.
  //   const fetchPosts = async () => {
  //     const res = await axios.get(
  //       `https://api.sfxvdfgthryhyrthjtrdthdt.nl/blogposts?page=${page}&limit=4` // TODO: replace with API URL.
  //     );
  //     setPosts((prevPosts) => [...prevPosts, ...res.data]);
  //   };
  //   fetchPosts();
  // }, [page, posts]);

  return (
    <div className="blog-preview">
      {/* {posts.map((post) => (
        // TODO: create BlogCard component.
        <div className="blog-card" key={post.id}>
          <h2 className="blog-card__heading">{post.title}</h2>
          <p className="blog-card__paragraph">{post.content}</p>
        </div>
      ))} */}
      <BlogCard
        key={3}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-08'}
        title={'Blog title 3'}
        category={'Blog category 3'}
        text={'Blog text 3'}
      />
      <BlogCard
        key={2}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-08'}
        title={'Blog title 2'}
        category={'Blog category 2'}
        text={'Blog text 2'}
      />
      <BlogCard
        key={1}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-08'}
        title={'Blog title 1'}
        category={'Blog category 1'}
        text={'Blog text 1'}
      />
      {/* <button
        className="blog__btn"
        // onClick={() => setPage(page + 1)}
      >
        Load more
      </button> */}
      <Button type="submit" text="Bericht aanmaken" onClick={() => null} />
    </div>
  );
};

export default BlogPreview;
