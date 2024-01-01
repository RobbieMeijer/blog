import './style.scss';
import ReactPaginate from 'react-paginate';
import BlogCard from '../BlogCard';
import getFullImgUrl from '../../functions/getFullImgUrl';
import getFormattedDate from '../../functions/getformattedDate';
import useFetchPosts from '../../hooks/useFetchPosts';

const BlogArchive = () => {
  // Custom hook to fetch posts.
  const {
    posts,
    setCurrentPage,
    lastPage,
    sortDirection,
    setSortDirection,
    postsPerPage,
    setPostsPerPage,
  } = useFetchPosts({
    perPage: 8,
    fetchType: 'pagination',
  });

  return (
    <>
      <div className="blog-archive__filters">
        <div className="blog-archive__filter-group">
          <label
            className="blog-archive__filter-label"
            htmlFor="sortPostsDirection"
          >
            Sorteer op:
          </label>
          <select
            className="blog-archive__filter-dropdown"
            name="sortPostsDirection"
            value={sortDirection}
            onChange={({ target }) => {
              setSortDirection(target?.value);
            }}
          >
            <option value="desc">Nieuw - oud</option>
            <option value="asc">Oud - nieuw</option>
          </select>
        </div>
        <div className="blog-archive__filter-group">
          <label className="blog-archive__filter-label" htmlFor="postsPerPage">
            Posts per pagina:
          </label>
          <select
            className="blog-archive__filter-dropdown"
            name="postsPerPage"
            value={postsPerPage}
            onChange={({ target }) => {
              setPostsPerPage(target?.value);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select>
        </div>
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
