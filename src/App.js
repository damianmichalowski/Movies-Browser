import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './common/Navigation';
import { MoviesPage } from "./features/MoviesPage";
import { PeoplePage } from "./features/PeoplePage";

const App = () => (
  <HashRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Navigate to="movies" replace />} />
      <Route path="movies" element={<MoviesPage />} />
      <Route path="people" element={<PeoplePage />} />
      <Route path="movies/:id" />
      <Route path="people/:id" />
    </Routes>
  </HashRouter>
);

export default App;
