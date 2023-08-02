import React from 'react';
import ReactDOM from 'react-dom/client';
import './statics/index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MovieDetail from './component/movieDetail';
import {MovieProvider} from './component/movieContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MovieProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path='/movie/:id' element = {<MovieDetail/>}/>
      </Routes>
    </BrowserRouter>
    </MovieProvider>
  </React.StrictMode>
);
