
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/guest/HomePage';
import MoviesDetails from './pages/guest/MoviesDetails';
import Login from './pages/guest/Login';
import CreateAccount from './pages/guest/CreateAccount';
import Profile from './pages/guest/profile/Profile';
import Reply from './pages/guest/Reply';
import Action from './pages/guest/genres/Action';
import Fantasy from './pages/guest/genres/Fantasy';
import Gang from './pages/guest/genres/Gang';
import Historic from './pages/guest/genres/Historic';
import Horror from './pages/guest/genres/Horror';
import Mystry from './pages/guest/genres/Mystry';
import ScienceFiction from './pages/guest/genres/ScienceFiction';
import UpdateUser from './pages/guest/profile/update';
import MoviesPage from './pages/admin/MoviesPage';
import AdminMoviesCreate from './pages/admin/AdminMoviesCreate';
import FeedBacks from './pages/admin/FeedBacks';
import EditeMovies from './pages/admin/EditeMovies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/CreateMovies' element={<AdminMoviesCreate />} />
        <Route path='/EditMovies/EditeMovie/:id' element={<EditeMovies />} />
        <Route path='/FeedBacks' element={<FeedBacks />} />
        <Route path='/EditMovies' element={<MoviesPage />} />
        <Route path='/MyProfile' element={<Profile />}/>
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/Movie/Details/:id' element={<MoviesDetails />} />
        <Route path='/Movie/Reply' element={<Reply />} />
        <Route path='/Movies/Genres/Action' element={<Action />} />
        <Route path='/Movies/Genres/Fantasy' element={<Fantasy />} />
        <Route path='/Movies/Genres/Gang' element={<Gang />} />
        <Route path='/Movies/Genres/Historic' element={<Historic />} />
        <Route path='/Movies/Genres/Horror' element={<Horror />} />
        <Route path='/Movies/Genres/Mystry' element={<Mystry />} />
        <Route path='/Movies/Genres/ScienceFiction' element={<ScienceFiction />} />
        <Route path='/MyProfile/Settings/Update' element={<UpdateUser />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
