import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegistroPacientes from './components/RegistroPacientes';
import ListaPacientes from './components/ListaPacientes'; // Importando o componente ListaPacientes
<<<<<<< HEAD
=======
import AtualizarPaciente from './components/AtualizarPaciente';
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e

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
<<<<<<< HEAD
=======
        <AtualizarPaciente/>
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
      </main>
    </div>
  );
}

export default App;
