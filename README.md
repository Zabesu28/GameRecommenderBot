# GameRecommenderBot

GameRecommenderBot est un chatbot interactif capable de recommander des jeux vidéo personnalisés en fonction des préférences des utilisateurs. Ce projet utilise des technologies modernes telles que Webpack, Babel, React et Express.js.

## Table des Matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Technologies Utilisées](#technologies-utilisées)

## Installation

1. Clonez le dépôt Git :

    ```bash
    git clone https://github.com/votre-utilisateur/GameRecommenderBot.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd GameRecommenderBot
    ```

3. Installez les dépendances pour le backend et le frontend :

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

## Configuration

1. Créez un fichier `.env` dans le répertoire `backend` avec les variables suivantes :

    ```
    API_KEY=your_openai_api_key
    API_GAMES_KEY=rawg_api_key (https://rawg.io/apidocs)
    ```

2. Créez un fichier `.env.development` dans le répertoire `frontend` avec les variables suivantes :

    ```
    REACT_APP_API_URL=http://localhost:5000
    REACT_APP_ENV=development
    ```

3. Créez un fichier `.env.development` dans le répertoire `backend` avec les variables suivantes :

    ```
    NODE_ENV=development
    ```

4. Assurez-vous que les fichiers `.env` et `.env.development` contiennent les valeurs correctes pour votre environnement.


## Utilisation

### Lancer le Projet 

1. Démarrez le serveur Express.js depuis le répertoire `backend` :

    ```bash
    npm run start:dev
    ```

Si ca ne fonctionne pas, alors...

### Lancer le Backend

1. Démarrez le serveur Express.js depuis le répertoire `backend` :

    ```bash
    cd backend
    npm start
    ```

### Lancer le Frontend

1. Compilez et servez le frontend depuis le répertoire `frontend` :

    ```bash
    cd frontend
    npm start
    ```

2. Ouvrez votre navigateur et allez à `http://localhost:5000` pour accéder à l'application.

## Technologies Utilisées

- **Bundler** : Webpack
- **Transpileur** : Babel
- **Framework/Library** :
  - Frontend : React
  - Backend : Express.js
- **Requêtes HTTP** : Axios
- **Environnement d'exécution** : Node.js
- **API** : OpenAi (https://openai.com) && RAWG (https://rawg.io/apidocs)
