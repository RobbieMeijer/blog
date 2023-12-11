import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BlogCard from '../BlogCard';
import './style.scss';

const BlogArchive = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  // useEffect(() => {
  //   // TODO: create custom hook for this.
  //   const fetchPosts = async () => {
  //     const res = await axios.get(
  //       `https://api.dfghfhfyhyjtujtujtuj.nl/blogposts?page=${page}`
  //     );
  //     setPosts(res.data);
  //   };
  //   fetchPosts();
  // }, [page]);

  return (
    <div className="blog-archive">
      {/* {{posts?.map((post) => (
        <BlogCard
          key={post.id || null}
          imageSrc={''}
          date={''}
          title={post.title}
          body={post.content}
        />
      ))} } */}
      <BlogCard
        key={6}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-08'}
        title={'Blog title 3'}
        category={'Blog category 3'}
        text={'Blog text 3'}
      />
      <BlogCard
        key={5}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-07'}
        title={'Blog title 2'}
        category={'Blog category 2'}
        text={'Blog text 2'}
      />
      <BlogCard
        key={4}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-06'}
        title={'Blog title 1'}
        category={'Blog category 1'}
        text={'Blog text 1'}
      />
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
        date={'2024-01-07'}
        title={'Blog title 2'}
        category={'Blog category 2'}
        text={'Blog text 2'}
      />
      <BlogCard
        key={1}
        imageSrc={'https://placehold.co/272x162'}
        date={'2024-01-06'}
        title={'Blog title 1'}
        category={'Blog category 1'}
        text={'Blog text 1'}
      />

      {/* <ReactPaginate
        previousLabel={'Vorige pagina'}
        nextLabel={'Volgende pagina'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={10} // TODO: replace with actual page count.
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => setPage(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      /> */}
    </div>
  );
};

export default BlogArchive;
