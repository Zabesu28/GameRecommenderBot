import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getGenres = async (setGenres) => {
    try {
      const response = await axios.get(`${apiUrl}/api/genres`);
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

export const getPlatforms = async (setPlatforms) => {
    try {
      const response = await axios.get(`${apiUrl}/api/platforms`);
      setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

export const handleChat = async (setChatResponse, selectedGenre, selectedPlatform, query) => {
  setChatResponse("vide");
  if(!selectedGenre && !selectedPlatform){

  try {
    const response = await axios.post(`${apiUrl}/api/chat`, { message: query });
    setChatResponse(response.data.message);
  } catch (error) {
    console.error('Error fetching chat response:', error);
  }
}
else{
  try {
    const response = await axios.post(`${apiUrl}/api/chat/filter`, { genre: selectedGenre, platform: selectedPlatform, message: query });
    setChatResponse(response.data.message);
  } catch (error) {
    console.error('Error fetching chat response:', error);
  }
}
};