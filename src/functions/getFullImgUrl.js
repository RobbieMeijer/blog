const getFullImgUrl = (relativePath) => {
  // Fallback.
  if (!relativePath) {
    return;
  }

  // Return full image url.
  return `https://frontend-case-api.sbdev.nl/storage/${relativePath}`;
};

export default getFullImgUrl;
