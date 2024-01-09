import './style.scss';
import { useMemo, useRef, useState } from 'react';
import Button from '../Button';
import showRequiredFieldsNotification from '../../functions/showRequiredFieldsNotification';
import someFieldsAreEmpty from '../../functions/someFieldsAreEmpty';
import blogIconCamera from '../../assets/blog-icon-camera.svg';

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
  const imageUploadContainerElement = useRef(null);
  const contentElement = useRef(null);

  // Run check all required fields.
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
        fieldElement: imageUploadContainerElement,
        fieldName: 'afbeelding',
      },
      {
        fieldState: form.content,
        fieldElement: contentElement,
        fieldName: 'bericht',
      },
    ]);
  };

  // Run check title field.
  const checkTitleField = useMemo(() => {
    showRequiredFieldsNotification([
      {
        fieldState: form.title,
        fieldElement: titleElement,
        fieldName: 'titel',
      },
    ]);
  }, [form.title]);

  // Run check category field.
  const checkCategoryField = useMemo(() => {
    showRequiredFieldsNotification([
      {
        fieldState: form.categoryId,
        fieldElement: categoryIdElement,
        fieldName: 'categorie',
      },
    ]);
  }, [form.categoryId]);

  // Run check image field.
  const checkImageField = useMemo(() => {
    showRequiredFieldsNotification([
      {
        fieldState: form.fileInput,
        fieldElement: imageUploadContainerElement,
        fieldName: 'afbeelding',
      },
    ]);
  }, [form.fileInput]);

  // Run check message field.
  const checkMessageField = useMemo(() => {
    showRequiredFieldsNotification([
      {
        fieldState: form.content,
        fieldElement: contentElement,
        fieldName: 'bericht',
      },
    ]);
  }, [form.content]);

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
    // Define file and file condition.
    const file = await target?.files[0];
    const fileIsImage = file?.type?.includes('image/');

    // When selected file is an image.
    if (!!file && fileIsImage) {
      // Set file input and image name in state if file is an image.
      setForm((prevForm) => ({
        ...prevForm,
        fileInput: file,
        imageName: file.name,
      }));
    } else {
      showRequiredFieldsNotification([
        {
          fieldState: form.fileInput,
          fieldElement: imageUploadContainerElement,
          fieldName: 'afbeelding',
        },
      ]);
    }

    // Define file name html and dom selector.
    const fileNameHtml = `<span class="filename">${file?.name}</span>`;
    const fileNameElement =
      imageUploadContainerElement.current.querySelector('.filename');

    // Reset file name html.
    fileNameElement?.remove();

    // Apply name of selected image, next to button.
    imageUploadContainerElement.current.insertAdjacentHTML(
      'beforeend',
      fileNameHtml
    );
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
              ref={imageUploadContainerElement}
              className="blog-form__image-upload-container"
            >
              <img
                src={blogIconCamera}
                alt="icon camera"
                className="blog-form__image-upload-icon"
                aria-hidden="true"
                focusable="false"
              />
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
