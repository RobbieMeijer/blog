import axios from 'axios';

export const getFullFilePath = async (relativePath) => {
  const apiUrl = 'https://dfgokgndfolgdtdfgdggg.nl'; // TODO: replace with API URL

  // TODO: needs to be refactored.
  try {
    const response = await axios.get(`${apiUrl}/storage${relativePath}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching file: ${error}`);
    return null;
  }
};
