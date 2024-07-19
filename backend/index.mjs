import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let apikey = process.env.API_KEY;
let apiGameKey = process.env.API_GAMES_KEY;

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
            key: apiGameKey
          }
        }
      );
  
      const genres = rawgResponse.data.results;
      console.log(genres);
      res.json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/platforms', async (req, res) => {
    try {
      const rawgResponse = await axios.get(
        'https://api.rawg.io/api/platforms',
        {
          params: {
            key: apiGameKey
          }
        }
      );
  
      const plateformes = rawgResponse.data.results;
      res.json(plateformes);
    } catch (error) {
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
    let context = "Toi gpt, tu es dans la peau passionné de jeu vidéo et tu veux recommander les jeux qui corresponderont le plus aux attentes de la personne."
    const genre = req.body.genre;
    const platform = req.body.platform;
    const commentaire = req.body.message;
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
              role: "system",
              content: `Base toi sur cette exemple : ${exemple}`,
            },
            {
              role: "system",
              content: `Limite toi au jeu de ce genre : ${genre}. Dans le cas ou il n'y a pas de genre, alors base toi que sur le message de l'utilisateur`,
            },
            {
              role: "system",
              content: `Limite toi aux jeux de la plateforme suivante : ${platform}. Dans le cas ou il n'y a pas de plateforme, alors base toi que sur le message de l'utilisateur`,
            },
            {
              role: "user",
              content: `${context} Recommande moi un ou plusieurs jeux qui correspond à ce type de personne : ${commentaire}.`,
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
            'Authorization': `Bearer ${apikey}`
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

export default app;