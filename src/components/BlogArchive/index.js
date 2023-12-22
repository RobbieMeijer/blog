import './style.scss';
import ReactPaginate from 'react-paginate';
import BlogCard from '../BlogCard';
import getFullImgUrl from '../../functions/getFullImgUrl';
import getFormattedDate from '../../functions/getformattedDate';
import useFetchPosts from '../../hooks/useFetchPosts';
import { useEffect, useState } from 'react';

const BlogArchive = () => {
  // State.
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Custom hook to fetch posts.
  const { posts, setCurrentPage, lastPage } = useFetchPosts({
    perPage: 8,
    fetchType: 'pagination',
    category: selectedCategory,
  });

  // Filter posts by category.
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // setCurrentPage(1); // Reset to the first page when category changes
  };

  useEffect(() => {
    console.log('selectedCategory: ', selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="blog-archive__filters">
        <label htmlFor="category">Filter op categorie:</label>
        <select
          id="category"
          value={selectedCategory || ''}
          onChange={({ target }) => handleCategoryChange(target?.value)}
        >
          <option value="">All Categories</option>
          <option value="1">Tech</option>
          <option value="2">Nieuws</option>
          <option value="3">Sports</option>
          <option value="4">Lokaal</option>
        </select>
      </div>
      <div className="blog-archive">
        {posts?.map(
          ({
            id,
            img_url: relativeImgPath,
            created_at: date,
            title,
            category,
            content,
          }) => (
            <BlogCard
              key={id}
              imageSrc={getFullImgUrl(relativeImgPath)}
              date={getFormattedDate(date)}
              title={title}
              category={category.name}
              text={content}
            />
          )
        )}
      </div>
      <div className="blog-archive__pagination-container">
        <ReactPaginate
          previousLabel={'<- Vorige pagina'}
          nextLabel={'Volgende pagina ->'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          containerClassName={'blog-archive__pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default BlogArchive;
