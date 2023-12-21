import './style.scss';
import ReactPaginate from 'react-paginate';
import BlogCard from '../BlogCard';
import getFullImgUrl from '../../functions/getFullImgUrl';
import getFormattedDate from '../../functions/getformattedDate';
import useFetchPosts from '../../hooks/useFetchPosts';

const BlogArchive = () => {
  const { posts, setCurrentPage, lastPage } = useFetchPosts({
    perPage: 8,
    fetchType: 'pagination',
  });

  return (
    <>
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
