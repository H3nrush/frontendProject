
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/guest/HomePage';
import MoviesPage from './pages/guest/MoviePage';
import MoviesDetails from './pages/guest/MoviesDetail';
import SeriesPage from './pages/guest/SeriePage';
import SeriesDetails from './pages/guest/SeriesDetails';
import Login from './pages/guest/Login';
import AdminMoviesCreate from './pages/admin/Movies/AdminMoviesCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Movies' element={<MoviesPage />} />
        <Route path='/Movie' element={<MoviesDetails />} />
        <Route path='/Series' element={<SeriesPage />} />
        <Route path='/Serie' element={<SeriesDetails />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/CreateMovie' element={<AdminMoviesCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
