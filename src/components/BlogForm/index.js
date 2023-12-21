import { useState } from 'react'; // Add import statement for React library
import './style.scss';
import Button from '../Button';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageName, setImageName] = useState('');
  const [fileInput, setFileInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fallback: check if required fields are not empty.
      if (
        '' !== title ||
        '' !== content ||
        '' !== categoryId ||
        null !== fileInput ||
        '' !== imageName
      ) {
        console.log('All fields are required');
        return;
      }

      // Set up form data.
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category_id', categoryId);
      formData.append('image', fileInput, imageName);

      // Define request options.
      const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
          token: `${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      };

      // Fetch posts data.
      const response = await fetch(
        'https://frontend-case-api.sbdev.nl/api/posts',
        requestOptions
      );

      // Throw error if response is not ok.
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Get result from response.
      const result = await response.text();
      console.log('result: ', result);
    } catch (error) {
      console.log('error', error);
    }
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
            <label className="blog-form__label" htmlFor="categoryId">
              Categorie
            </label>
            <select
              className="blog-form__category"
              value={categoryId}
              onChange={({ target }) => {
                setCategoryId(target?.value);
                console.log('categoryId: ', categoryId);
              }}
              name="categoryId"
              required
            >
              <option value="">Geen categorie</option>
              <option value="1">Tech</option>
              <option value="2">Nieuws</option>
              <option value="3">Sports</option>
              <option value="4">Lokaal</option>
            </select>
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="image">
              Header afbeelding
            </label>
            <input
              className="blog-form__image-input"
              type="file"
              onChange={({ target }) => {
                setFileInput(target?.files[0]);
                setImageName(target?.files[0]?.name);
              }}
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
