import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistroPacientes from './components/RegistroPacientes';
import ListaPacientes from './components/ListaPacientes';
import NotFound from './components/NotFound';
import AtualizarPaciente from './components/AtualizarPaciente';
import HomePage from './components/hPage';
import ListaConsulta from './components/ListaConsulta';
import AtualizarConsulta from './components/AtualizarConsulta';
import CriarConsulta from './components/Criar_Consulta';
import LoginFisioterapeuta from './components/pageLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/pacientes' element={<ListaPacientes />} />
        <Route path='/cadastro_paciente' element={<RegistroPacientes />} />
        <Route path='/atualizar-paciente/:id' element={<AtualizarPaciente />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/consultas' element={<ListaConsulta />} />
        <Route path='/atualizar_consulta/:id' element={<AtualizarConsulta />} />
        <Route path='/criar_consulta' element={<CriarConsulta />} />
        <Route path='/' element={<LoginFisioterapeuta />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
