const showRequiredFieldsNotification = (fields = []) => {
  // Loop through every required field.
  fields?.forEach(({ fieldState, fieldElement, fieldName }) => {
    // Clear existing error message and red border.
    fieldElement.current?.classList?.remove('required-field');
    fieldElement.current?.nextSibling?.remove();

    // Define conditional notification text based on field name.
    const notificationText = () => {
      //Fallback.
      if (!fieldName) {
        return 'Dit veld is leeg.';
      }

      switch (fieldName) {
        case 'categorie':
        case 'afbeelding':
          return `Selecteer een ${fieldName}.`;
        default:
          return `${fieldName} is leeg.`;
      }
    };

    // Show notification.
    if ('' === fieldState || null === fieldState) {
      fieldElement.current?.classList.add('required-field');
      fieldElement.current?.insertAdjacentHTML(
        'afterend',
        `<p class="notification">${notificationText()}</p>`
      );
    }
  });
};

export default showRequiredFieldsNotification;
