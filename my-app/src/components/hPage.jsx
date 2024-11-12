import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [showPatients, setShowPatients] = useState(false);
  const navigate = useNavigate();  // Use the useNavigate hook for navigation

  // Function to toggle the display of patients list
  const togglePatientsList = () => {
    setShowPatients(!showPatients);
  };

  // Function to navigate to the patients page
  const handleRedirect = () => {
    navigate('/pacientes');  // Redirect to the /pacientes route
  };

  return (
    <div>
      <header>
        <h1>Projeto Clínica</h1>
        <nav>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        <section id="sobre">
          <h2>Sobre Nós</h2>
          <p>Projeto de uma clínica de fisioterapia.</p>
        </section>

        <section id="servicos">
          <h2>Serviços</h2>
          <p>Oferecemos diversos serviços para atender suas necessidades.</p>
          <button className="botao-redondo" onClick={handleRedirect}>Listar Pacientes</button>
          {showPatients && (
            <div className="lista-pacientes" id="lista-pacientes">
              {/* You can populate this with dynamic patient data */}
            </div>
          )}
        </section>

        <section id="contato">
          <h2>Contato</h2>
          <p>Entre em contato conosco através do e-mail: contato@meuprojeto.com</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024. Todos os direitos reservados.</p>
      </footer>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        header {
          background: #333;
          color: #fff;
          padding: 3px 0;
          text-align: center;
        }
        nav {
          margin: 5px 0;
        }
        nav a {
          margin: 0 15px;
          color: #28a745;
          text-decoration: none;
        }
        nav a:hover {
          text-decoration: underline;
        }
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        section {
          max-width: 600px;
          height: 200px;
          margin-bottom: 20px;
          text-align: center;
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
        }
        h2 {
          color: #28a745;
        }
        p {
          color: #333;
        }
        .botao-redondo {
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 15px;
          width: 120px;
          height: 40px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
          transition: background-color 0.3s;
        }
        .botao-redondo:hover {
          background-color: #218838;
        }
        .lista-pacientes {
          margin-top: 20px;
          text-align: left;
        }
        footer {
          background: #333;
          color: #fff;
          text-align: center;
          padding: 10px 0;
          position: relative;
          width: 100%;
          bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
