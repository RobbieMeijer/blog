import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './style.css';

function BlogArchive() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // TODO: create custom hook for this.
    const fetchPosts = async () => {
      const res = await axios.get(
        `https://api.dfghfhfyhyjtujtujtuj.nl/blogposts?page=${page}`
      );
      setPosts(res.data);
    };
    fetchPosts();
  }, [page]);

  return (
    <div className="blog-archive">
      {posts.map((post) => (
        // TODO: create BlogCard component.
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      <ReactPaginate
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
      />
    </div>
  );
}

export default BlogArchive;
