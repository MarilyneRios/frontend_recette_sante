# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Procédure 

1/  Premières commandes

  cd frontend
  npm install
  npm run dev

2/ vite.config.js

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
        '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
        },
        },
    },
    })

**Toutes les requêtes commençant par ‘/api’** seront redirigées vers **http://localhost:3001**. 
L’option **changeOrigin** est définie sur true, => **l’origine de la requête sera modifiée pour correspondre à l’origine de la cible**.


3/  npm i react-bootstrap react-icons :

**react-bootstrap** : C’est une **bibliothèque de composants d’interface utilisateur pour React basée sur Bootstrap**, un framework populaire pour le développement front-end. Elle vous permet d’utiliser des composants Bootstrap préconstruits dans votre application React.

**react-icons** : C’est une **bibliothèque qui fournit des icônes de plusieurs bibliothèques d’icônes populaires**, comme Font Awesome et Material Design, sous forme de composants React.


4/ npm install bootstrap


5/ Dans le fichier main.jsx

import 'bootstrap/dist/css/bootstrap.min.css'; => importer le fichier CSS principal de Bootstrap . Cela permet d’**utiliser les styles de Bootstrap** dans l'application Vite React.

6/ mkdir components

7/ touch Header.jsx

ps: La différence entre Header.jsx et Header.js :
 - Header.js : C’est un fichier **JavaScript standard**. 
 - Header.jsx : C’est un fichier **JavaScript XML (JSX)**. JSX est une extension de la syntaxe JavaScript qui **permet d’écrire des structures ressemblant à du HTML dans votre code JavaScript**.



8/ npm install react-router-bootstrap
# frontend_recette_sante
