import { useState } from 'react';
import axios from 'axios';
import './style.css';
import Button from '../Button';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const blogPost = { title, content, category };
  //   await axios.post('https://api.cgnbfnfghnfhnryfh.nl/blogposts', blogPost); // TODO: replace with API URL.
  //   setTitle('');
  //   setContent('');
  //   setCategory('');
  // };

  return (
    // <form className="blog-form__form" onSubmit={handleSubmit}>
    <div className="blog-form">
      <h2 className="blog-form__heading">Plaats een blog bericht</h2>
      <form className="blog-form__form">
        <div className="blog-form__form-group">
          <label className="blog-form__label" htmlFor="title">
            Berichtnaam
          </label>
          <input
            className="blog-form__title"
            type="text"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="Geen titel"
            name="title"
            required
          />
        </div>
        <div className="blog-form__form-group">
          <label className="blog-form__label" htmlFor="category">
            Categorie
          </label>
          <select
            className="blog-form__category"
            value={category}
            // onChange={(e) => setCategory(e.target.value)}
            name="category"
            required
          >
            <option value="">Geen categorie</option>
            <option value="technology">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="travel">Reizen</option>
          </select>
        </div>
        <div className="blog-form__form-group">
          <label className="blog-form__label" htmlFor="image">
            Header afbeelding
          </label>
          <input
            className="blog-form__image"
            type="file"
            // onChange={(e) => setImage(e.target.files[0])}
            name="image"
            required
          />
        </div>
        <div className="blog-form__form-group">
          <label className="blog-form__label" htmlFor="content">
            Bericht
          </label>
          <textarea
            className="blog-form__content"
            value={content}
            // onChange={(e) => setContent(e.target.value)}
            name="content"
            required
          />
        </div>
        <Button type="submit" text="Bericht aanmaken" onClick={() => null} />
      </form>
    </div>
  );
};

export default BlogForm;
