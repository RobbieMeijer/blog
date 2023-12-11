import { useState } from 'react'; // Add import statement for React library
import './style.scss';
import Button from '../Button';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category_id', category);
    formData.append('image', image);

    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
      },
      body: formData,
      redirect: 'follow',
    };

    fetch('https://frontend-case-api.sbdev.nl/api/posts', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <aside className="blog__sidebar">
      <div className="blog-form">
        <h2 className="blog-form__heading">Plaats een blog bericht</h2>
        <form className="blog-form__form">
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="title">
              Berichtnaam
            </label>
            <input
              className="blog-form__title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target?.value)}
              placeholder="Geen titel"
              name="title"
              required
            />
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="category">
              Categorie
            </label>
            <select
              className="blog-form__category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              required
            >
              <option value="">Geen categorie</option>
              <option value="technology">Tech</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="travel">Reizen</option>
            </select>
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="image">
              Header afbeelding
            </label>
            <input
              className="blog-form__image-input"
              type="file"
              onChange={({ target }) => setImage(target?.files[0])}
              name="image"
              required
            />
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="content">
              Bericht
            </label>
            <textarea
              className="blog-form__content"
              value={content}
              onChange={({ target }) => setContent(target?.value)}
              name="content"
              required
            />
          </fieldset>
          <fieldset className="blog-form__form-group">
            <Button
              type="submit"
              text="Bericht aanmaken"
              onClick={(e) => handleSubmit(e)}
            />
          </fieldset>
        </form>
      </div>
    </aside>
  );
};

export default BlogForm;
