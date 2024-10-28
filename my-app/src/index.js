import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistroPacientes from './components/RegistroPacientes';
import ListaPacientes from './components/ListaPacientes';
<<<<<<< HEAD
import NotFound from './components/NotFound'; // Create a NotFound component
=======
import NotFound from './components/NotFound';
import AtualizarPaciente from './components/AtualizarPaciente';
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListaPacientes />} />
        <Route path='/cadastro_paciente' element={<RegistroPacientes />} />
<<<<<<< HEAD
        <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
=======
        <Route path='/atualizar-paciente/:id' element={<AtualizarPaciente />} />
        <Route path='*' element={<NotFound />} />
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
