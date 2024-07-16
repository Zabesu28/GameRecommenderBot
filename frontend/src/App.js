import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  useEffect(() => {
    getGenres();
    getPlatforms();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games`);
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const getGenres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/genres`);
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const getPlatforms = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/platforms`);
      setPlatforms(response.data);
    } catch (error) {
      console.error('Error fetching platforms:', error);
    }
  };

  const handleChat = async () => {
    setChatResponse("vide");
    if(!selectedGenre && !selectedPlatform){

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: query });
      setChatResponse(response.data.message);
    } catch (error) {
      console.error('Error fetching chat response:', error);
    }
  }
  else{
    try {
      const response = await axios.post('http://localhost:5000/api/chat/filter', { genre: selectedGenre, platform: selectedPlatform, message: query });
      setChatResponse(response.data.message);
    } catch (error) {
      console.error('Error fetching chat response:', error);
    }
  }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chatbot de Recommandation de Jeux Vidéo</h1>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="chat-input"
        placeholder="Dites m'en plus sur vous"
      />
      
      <div className="selectors">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-select"
        >
          <option value="">Sélectionner un genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="platform-select"
        >
          <option value="">Sélectionner une plateforme</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.name}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleChat} className="chat-button">Chatbot</button>
      <ul className="chat-history">
        {games.map(game => (
          <li key={game.id} className="chat-message user-message">{game.title} - {game.genre}</li>
        ))}
        {chatResponse !== "vide" ? (
          <li className="chat-message bot-message" dangerouslySetInnerHTML={{ __html: chatResponse }}></li>
        ) : (
          <li className="chat-message bot-message">Chargement en cours...</li>
        )}
      </ul>
    </div>
  );
};

export default App;