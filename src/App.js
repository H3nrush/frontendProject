

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/guest/HomePage';
import MoviesPage from './pages/guest/MoviesPage';
import MoviesDetails from './pages/guest/MoviesDetails';
import Login from './pages/guest/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Movies' element={<MoviesPage />} />
        <Route path='/Serie' element={<MoviesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
