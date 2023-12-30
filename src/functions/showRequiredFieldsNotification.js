const showRequiredFieldsNotification = (fields = []) => {
  // Loop through every required field.
  fields.forEach(({ fieldState, fieldElement, fieldName }) => {
    // Clear existing error message and red border.
    fieldElement.current?.classList?.remove('required-field');
    fieldElement.current?.nextSibling?.remove();

    // Show notification.
    if ('' === fieldState || null === fieldState) {
      fieldElement.current?.classList.add('required-field');
      fieldElement.current?.insertAdjacentHTML(
        'afterend',
        `<p class="notification">${fieldName} is leeg.</p>`
      );
    }
  });
};

export default showRequiredFieldsNotification;
