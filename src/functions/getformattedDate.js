const getFormattedDate = (date) => {
  // Fallback.
  if (!date || typeof date !== 'string') return;

  // Return formatted date.
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

export default getFormattedDate;
