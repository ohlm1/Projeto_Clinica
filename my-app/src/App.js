import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegistroPacientes from './components/RegistroPacientes';
import ListaPacientes from './components/ListaPacientes'; // Importando o componente ListaPacientes

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bem-vindo ao sistema de gerenciamento de pacientes!
        </p>
      </header>
      <main>
        <RegistroPacientes />
        <ListaPacientes /> {/* Renderizando a lista de pacientes */}
      </main>
    </div>
  );
}

export default App;
