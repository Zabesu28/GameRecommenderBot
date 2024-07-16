const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const games = [
  { id: 1, title: 'Super Mario Odyssey', genre: 'Platformer' },
  { id: 2, title: 'The Legend of Zelda: Breath of the Wild', genre: 'Action-Adventure' },
  { id: 3, title: 'Red Dead Redemption 2', genre: 'Action-Adventure' },
  { id: 4, title: 'FIFA 22', genre: 'Sports' },
  { id: 5, title: 'Cyberpunk 2077', genre: 'RPG' },
  { id: 6, title: 'Xenoblade Chronicles', genre: 'JRPG' },
];

// Route GET pour obtenir la liste des jeux
app.get('/api/games', (req, res) => {
  res.json(games);
});

app.get('/api/genres', async (req, res) => {
    try {
      const rawgResponse = await axios.get(
        'https://api.rawg.io/api/genres',
        {
          params: {
            key: '7c91604c2e8046eba54b666f6a76edc3'
          }
        }
      );
  
      const genres = rawgResponse.data.results;
      res.json(genres);
    } catch (error) {
      console.error('Error calling RAWG API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/platforms', async (req, res) => {
    try {
      const rawgResponse = await axios.get(
        'https://api.rawg.io/api/platforms',
        {
          params: {
            key: '7c91604c2e8046eba54b666f6a76edc3'
          }
        }
      );
  
      const plateformes = rawgResponse.data.results;
      res.json(plateformes);
    } catch (error) {
      console.error('Error calling RAWG API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.post('/api/chat', async (req, res) => {
    let exemple = ` Exemple :
    <h2>Xenoblade chronicles<h2>
        <b>Plateforme : </b><p></p>
        <br>
        <b>Genre :</b> <p></p> 
        <br>
        <b>Description :</b> <p></p>
        <br>
        <a>En savoir + (si le lien est fonctionnel)</a>
        <br>`
    let context = "Toi gpt, tu es un dans la peau passionné de jeu vidéo et tu veux recommander les jeux qui correspondent le plus aux utilisateurs."
    const genre = req.body.message;
    try {
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
        messages: [
            {
                role: "system",
                content: `${context}`,
            },
            {
              role: "user",
              content: `Recommande moi un ou plusieurs jeux pour ce type de personne ${genre}. ${exemple}`,
            },
          ],
          model: "gpt-4o",
          temperature: 0.7,
          top_p: 1,
          n: 1,
          stop: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-PGSAsbTLz5CM9hfUHjUIT3BlbkFJ0anlqEWnGRZFpelq4JN2`
          }
        }
      );
      const botMessage = response.data.choices[0].message.content;
      res.json({ message: botMessage });
    } catch (error) {
    //   console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/chat/filter', async (req, res) => {
    let exemple = ` Exemple :
    <h2>Xenoblade chronicles<h2>
        <b>Plateforme : </b><p></p>
        <br>
        <b>Genre :</b> <p></p> 
        <br>
        <b>Description :</b> <p></p>
        <br>
        <a>En savoir + (si le lien est fonctionnel)</a>
        <br>`
    let context = "Toi gpt, tu es un dans la peau passionné de jeu vidéo et tu veux recommander les meilleurs jeux aux utilistateurs."
    const genre = req.body.genre;
    console.log(genre)
    const platform = req.body.platform;
    const commentaire = req.body.commentaire;
    var listGame = '';
    const rawgResponse = await axios.get(
        'https://api.rawg.io/api/games',
        {
          params: {
            key: '7c91604c2e8046eba54b666f6a76edc3',
            genres : [genre]
          }
        });
    for (let game of rawgResponse.data.results){
        listGame = listGame + '/' + game.name;
        console.log(listGame);
    }
    try {
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
        messages: [
            {
              role: "user",
              content: `${context} Pioche 3 ou 4 jeux dans la liste suivantes et explique les : ${listGame} . ${exemple}`,
            },
          ],
          model: "gpt-4o",
          temperature: 0.7,
          top_p: 1,
          n: 1,
          stop: null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sk-proj-PGSAsbTLz5CM9hfUHjUIT3BlbkFJ0anlqEWnGRZFpelq4JN2`
          }
        }
      );
      const botMessage = response.data.choices[0].message.content;
      res.json({ message: botMessage });
    } catch (error) {
    //   console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});