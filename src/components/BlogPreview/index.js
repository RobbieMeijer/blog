import { useEffect, useState } from 'react';
import BlogCard from '../BlogCard';
import Button from '../Button';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
    };

    fetch(
      'https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=10&sortBy=title&sortDirection=asc&searchPhrase=test&ber&categoryId=1',
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        setPosts(result);
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div className="blog-preview">
      <div className="blog-preview__card-container">
        {posts?.map((post) => (
          <BlogCard
            key={post.id}
            imageSrc={post.image}
            date={post.date}
            title={post.title}
            category={post.category}
            text={post.content}
          />
        ))}
      </div>
      <Button type="submit" text="Laad meer" onClick={() => null} />
    </div>
  );
};

export default BlogPreview;
