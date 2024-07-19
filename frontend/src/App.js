import React, { useState, useEffect } from "react";
import "./App.css";
import { getGenres, getPlatforms, handleChat } from "./api";

const App = () => {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  useEffect(() => {
    getGenres(setGenres);
    getPlatforms(setPlatforms);
  }, []);

  const handleButtonClick = () => {
    handleChat(setChatResponse, selectedGenre, selectedPlatform, query);
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

      <button onClick={handleButtonClick} className="chat-button">
        Chatbot
      </button>
      <ul className="chat-history">
        {chatResponse !== "vide" ? (
          <li
            className="chat-message bot-message"
            dangerouslySetInnerHTML={{ __html: chatResponse }}
          ></li>
        ) : (
          <li className="chat-message bot-message">Chargement en cours...</li>
        )}
      </ul>
    </div>
  );
};

export default App;
