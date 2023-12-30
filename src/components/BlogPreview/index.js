import './style.scss';
import BlogCard from '../BlogCard';
import Button from '../Button';
import getFullImgUrl from '../../functions/getFullImgUrl';
import getFormattedDate from '../../functions/getformattedDate';
import useFetchPosts from '../../hooks/useFetchPosts';

const BlogPreview = () => {
  // Custom hook to fetch posts.
  const { posts, currentPage, lastPage, loadMorePosts } = useFetchPosts({
    perPage: 4,
    fetchType: 'loadmore',
  });

  return (
    <div className="blog-preview">
      <div className="blog-preview__card-container">
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
      {lastPage !== currentPage && (
        <Button type="button" text="Laad meer" onClick={loadMorePosts} />
      )}
    </div>
  );
};

export default BlogPreview;
