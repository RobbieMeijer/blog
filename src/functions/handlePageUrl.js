const handlePageUrl = (selectedPage) => {
  // Fallback.
  if (!selectedPage) return;

  // Define url and set page query parameter.
  const url = new URL(window.location.href);
  url.searchParams.set('page', selectedPage);
  window.history.pushState(null, '', url);
};

export default handlePageUrl;
