import './style.scss';
import { useMemo, useRef, useState } from 'react';
import Button from '../Button';

const BlogForm = () => {
  // States.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageName, setImageName] = useState('');
  const [fileInput, setFileInput] = useState(null);

  // Elements.
  const titleElement = useRef(null);
  const categoryIdElement = useRef(null);
  const fileInputElement = useRef(null);
  const contentElement = useRef(null);

  // Check required form fields and show notification if empty.
  const showRequiredFieldsNotification = ({
    fieldState,
    fieldElement,
    fieldName,
  }) => {
    // Clear existing error message and red border.
    fieldElement.current?.classList?.remove('required-field');
    fieldElement.current?.nextSibling?.remove();

    console.log('fieldState: ', fieldState);
    console.log('fieldName: ', fieldName);
    // Check field state.
    if ('' === fieldState || null === fieldState) {
      fieldElement.current?.classList.add('required-field');
      fieldElement.current?.insertAdjacentHTML(
        'afterend',
        `<p class="notification">${fieldName} is leeg.</p>`
      );
    }
  };

  // Add handleSubmit function.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fallback: prevent form submit if any required field is empty.
      if (
        '' === title ||
        '' === content ||
        '' === categoryId ||
        null === fileInput ||
        '' === imageName
      ) {
        console.log('All fields are required');
        showRequiredFieldsNotification({
          fieldState: title,
          fieldElement: titleElement,
          fieldName: 'titel',
        });
        showRequiredFieldsNotification({
          fieldState: categoryId,
          fieldElement: categoryIdElement,
          fieldName: 'categorie',
        });
        showRequiredFieldsNotification({
          fieldState: fileInput,
          fieldElement: fileInputElement,
          fieldName: 'afbeelding',
        });
        showRequiredFieldsNotification({
          fieldState: content,
          fieldElement: contentElement,
          fieldName: 'bericht',
        });

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

      // Reload page after successful submit, to reset form + to show new post.
      if (!!result) {
        window.location.reload();
      }
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
              *Berichtnaam
            </label>
            <input
              ref={titleElement}
              className="blog-form__title"
              type="text"
              value={title}
              onChange={({ target }) => {
                setTitle(target?.value);
                showRequiredFieldsNotification({
                  fieldState: title,
                  fieldElement: titleElement,
                  fieldName: 'titel',
                });
              }}
              placeholder="Geen titel"
              name="title"
              required
            />
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="categoryId">
              *Categorie
            </label>
            <select
              ref={categoryIdElement}
              className="blog-form__category"
              value={categoryId}
              onChange={({ target }) => {
                setCategoryId(target?.value);
                showRequiredFieldsNotification({
                  fieldState: categoryId,
                  fieldElement: categoryIdElement,
                  fieldName: 'categorie',
                });
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
              *Header afbeelding
            </label>
            <input
              ref={fileInputElement}
              className="blog-form__image-input"
              type="file"
              onChange={({ target }) => {
                setFileInput(target?.files[0]);
                setImageName(target?.files[0]?.name);
                showRequiredFieldsNotification({
                  fieldState: fileInput,
                  fieldElement: fileInputElement,
                  fieldName: 'afbeelding',
                });
              }}
              name="image"
              required
            />
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="content">
              *Bericht
            </label>
            <textarea
              ref={contentElement}
              className="blog-form__content"
              value={content}
              onChange={({ target }) => {
                setContent(target?.value);
                showRequiredFieldsNotification({
                  fieldState: content,
                  fieldElement: contentElement,
                  fieldName: 'bericht',
                });
              }}
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
