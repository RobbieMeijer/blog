import './style.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import showRequiredFieldsNotification from '../../functions/showRequiredFieldsNotification';
import someFieldsAreEmpty from '../../functions/someFieldsAreEmpty';

const BlogForm = () => {
  // State.
  const [form, setForm] = useState({
    title: '',
    content: '',
    categoryId: '',
    fileInput: null,
    imageName: '',
  });

  // Elements.
  const titleElement = useRef(null);
  const categoryIdElement = useRef(null);
  const fileInputElement = useRef(null);
  const contentElement = useRef(null);
  const renderCount = useRef(0);

  // Run check required fields.
  const initRequiredFieldsCheck = () => {
    showRequiredFieldsNotification([
      {
        fieldState: form.title,
        fieldElement: titleElement,
        fieldName: 'titel',
      },
      {
        fieldState: form.categoryId,
        fieldElement: categoryIdElement,
        fieldName: 'categorie',
      },
      {
        fieldState: form.fileInput,
        fieldElement: fileInputElement,
        fieldName: 'afbeelding',
      },
      {
        fieldState: form.content,
        fieldElement: contentElement,
        fieldName: 'bericht',
      },
    ]);
  };

  // Add handleSubmit function.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fallback: prevent form submit if any required field is empty.
      if (
        someFieldsAreEmpty([
          form.title,
          form.categoryId,
          form.fileInput,
          form.content,
        ])
      ) {
        initRequiredFieldsCheck();
        return;
      }

      // Set up form data.
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('category_id', form.categoryId);
      formData.append('image', form.fileInput, form.imageName);

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

      // Get result from response.
      const result = await response.text();

      // Reload page after successful submit, to reset form + to show new post.
      if (!!result) {
        window.location.reload();
      }
    } catch (error) {
      console.log('error', error);
      return;
    }
  };

  // Define upload image function.
  const uploadImg = async (target) => {
    // Define file.
    const file = await target?.files[0];

    if (!!file && file.type.includes('image/')) {
      // Set file input and image name in state if file is an image.
      setForm((prevForm) => ({
        ...prevForm,
        fileInput: file,
        imageName: file.name,
      }));
    } else {
      // Run required fields check again if not an image.
      initRequiredFieldsCheck();
    }
  };

  useEffect(() => {
    // Increment the render count.
    renderCount.current += 1;

    // Run the inner code after the second render.
    if (renderCount.current > 2) {
      initRequiredFieldsCheck();
    }
  }, [form.title, form.categoryId, form.fileInput, form.content]);

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
              value={form.title}
              onChange={({ target }) =>
                setForm((prevForm) => ({ ...prevForm, title: target?.value }))
              }
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
              value={form.categoryId}
              onChange={({ target }) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  categoryId: target?.value,
                }))
              }
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
            <legend className="blog-form__label blog-form__label-image">
              *Header afbeelding
            </legend>
            <div
              ref={fileInputElement}
              className="blog-form__image-upload-container"
            >
              <svg
                className="blog-form__image-upload-icon"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                width="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                />
              </svg>
              <label
                className="blog-form__image-upload-button"
                htmlFor="imageUploadInput"
              >
                Kies bestand
              </label>
              <input
                className="blog-form__image-upload-input"
                type="file"
                onChange={({ target }) => {
                  uploadImg(target);
                }}
                name="imageUploadInput"
                required
              />
            </div>
          </fieldset>
          <fieldset className="blog-form__form-group">
            <label className="blog-form__label" htmlFor="content">
              *Bericht
            </label>
            <textarea
              ref={contentElement}
              className="blog-form__content"
              value={form.content}
              onChange={({ target }) =>
                setForm((prevForm) => ({ ...prevForm, content: target?.value }))
              }
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
