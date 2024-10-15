import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistroPacientes from './components/RegistroPacientes';
import ListaPacientes from './components/ListaPacientes';
import NotFound from './components/NotFound'; // Create a NotFound component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListaPacientes />} />
        <Route path='/cadastro_paciente' element={<RegistroPacientes />} />
        <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
