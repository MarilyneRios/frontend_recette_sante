# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Procédure 
  **npm create vite@latest**
  y
  react
  javascript

**1/  Premières commandes**

  cd frontend
  npm install
  npm run dev

**2/ vite.config.js**

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


**3/  npm i react-bootstrap react-icons :**

**react-bootstrap** : C’est une **bibliothèque de composants d’interface utilisateur pour React basée sur Bootstrap**, un framework populaire pour le développement front-end. Elle vous permet d’utiliser des composants Bootstrap préconstruits dans votre application React.

**react-icons** : C’est une **bibliothèque qui fournit des icônes de plusieurs bibliothèques d’icônes populaires**, comme Font Awesome et Material Design, sous forme de composants React.


**4/ npm install bootstrap**


**5/ Dans le fichier main.jsx**

import 'bootstrap/dist/css/bootstrap.min.css'; => importer le fichier CSS principal de Bootstrap . Cela permet d’**utiliser les styles de Bootstrap** dans l'application Vite React.

**6/ mkdir components**

**7/ touch Header.jsx**

Ensuite faire l'import dans App 

ps: La différence entre Header.jsx et Header.js :
 - Header.js : C’est un fichier **JavaScript standard**. 
 - Header.jsx : C’est un fichier **JavaScript XML (JSX)**. JSX est une extension de la syntaxe JavaScript qui **permet d’écrire des structures ressemblant à du HTML dans votre code JavaScript**.


**8/ mkdir screens puis HomeScreen.jsx**

Ensuite faire l'import dans App


**9/ Hero.jsx dans Components:***

Voir le text de l'écran d'accueil, mise en page : zone de texte btn se connecter ou s'inscrire

**10/ npm install react-router-bootstrap**

Composants Bootstrap  compatibles avec react-router.

**11/ npm install react-router-dom**

Composants de routage nécessaires pour créer une application à page unique avec navigation.

**12/ createBrowserRouter,  createRoutesFromElements,  Route dans main.jsx**

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,  createRoutesFromElements,  Route, RouterProvider  } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';


// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

**13/ Outlet dans App.jsx**

Point de rendu pour les composants de route. 
Lorsqu’une route est activée => le composant correspondant est rendu à l’endroit où se trouve le composant Outle (dans le fichier App.jsx).

**14/ LinkContainer**

Une intégration de react-router avec react-bootstrap. 
LinkContainer est un composant qui enveloppe n’importe quel composant React Bootstrap et le transforme en un lien qui peut être utilisé pour la navigation. 
Il est similaire au composant Link de react-router-dom, mais il est conçu pour fonctionner avec les composants React Bootstrap.

**15/ FormContainer.jsx**

Pour la mise en forme des formulaires.

**16/ redux**

npm i @reduxjs/toolkit react-redux

**@reduxjs/toolkit**  simplifie l’utilisation de la configuration du **store**, la définition des **réducteurs**, la logique de mise à jour immuable puis génère automatiquement les actions et les créateurs d’actions correspondants.

**react-redux** :  Il permet à vos composants React de **lire des données à partir d’un magasin Redux**.

**16/ touch store.js**

//////////////////////////////////////////////////////////////
  import { configureStore } from '@reduxjs/toolkit';

  const store = configureStore({
  
      reducer: {  },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(), 
      devTools: true, 
  });

  export default store;
//////////////////////////////////////////////////////////////
 
Sans main.jsx:

import store from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
</Provider>
)

//////////////////////////////////////////////////////////////

**17/ mkdir slices et touch authSlice.js**

**18/ Pour montrer les erreur** 
npm install  react-toastify

**19/ Loader.jsx**

**20/ quand user connecté, HomeScreen change**
///////////////////////////////////////////////////////////////////////////////////
import React from "react"; // N'oubliez pas d'importer React si vous utilisez JSX
import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {!userInfo ? (
        <Hero />
      ) : (
        <h1>Utilisateur connecté</h1> 
      )}
    </div>
  );
};

export default HomeScreen;
///////////////////////////////////////////////////////////////////////////////////

**21/ ProfileScreen, modif main et PrivateRoute**

**22/ CreateRecipeScreen et updateRecipeScreen**