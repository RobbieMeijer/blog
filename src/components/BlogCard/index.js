import './style.scss';

const BlogCard = ({ key, imageSrc, date, title, category, text }) => {
  return (
    <div key={key} className="blog-card">
      <div className="blog-card__image-container">
        <img src={imageSrc} alt="" className="blog-card__img" />
        <div className="blog-card__meta">
          <time className="blog-card__date" dateTime={date}>
            {date}
          </time>
          <span className="blog-card__category">{category}</span>
        </div>
      </div>
      <div className="blog-card__caption">
        <h2 className="blog-card__heading">{title}</h2>
        <p className="blog-card__paragraph">{text}</p>
      </div>
    </div>
  );
};

export default BlogCard;
