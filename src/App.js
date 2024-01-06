
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/guest/HomePage';
import MoviesPage from './pages/guest/MoviesPage';
import MoviesDetails from './pages/guest/MoviesDetails';
import Login from './pages/guest/Login';
import CreateAccount from './pages/guest/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/Movies' element={<MoviesPage />} />
        <Route path='/Movie/Details/:id' element={<MoviesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
