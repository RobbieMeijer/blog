const getFormattedDate = (date) => {
  // Fallback.
  if (!date) {
    return;
  }

  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export default getFormattedDate;
