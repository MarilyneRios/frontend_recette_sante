import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,  createRoutesFromElements,  Route, RouterProvider  } from 'react-router-dom';
//Redux
import store from './store';
import { Provider } from 'react-redux';
// les screens
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
//import ProfileScreen from './screens/ProfileScreen.jsx';
//import CreateRecipeScreen from './screens/CreateRecipeScreen.jsx';
//import AddRecipeFavoriteScreen from './screens/AddRecipeFavoriteScreen.jsx';
import './index.css'

// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
      {/* Toutes les routes qui doivent être privées 
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen/>} />
        <Route path='/addRecipeFavorite' element={<AddRecipeFavoriteScreen/>} />
        <Route path='/createRecipe' element={<CreateRecipeScreen/>} />
      </Route>*/}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
</Provider>
)
