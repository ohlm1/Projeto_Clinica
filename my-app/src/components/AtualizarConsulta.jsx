import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './formStyles.css';

const AtualizarConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState(null); // Para armazenar os dados da consulta
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Para exibir o carregamento

  useEffect(() => {
    // Carregar a consulta
    fetch(`http://127.0.0.1:5000/buscar_consulta/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar consulta');
        }
        return response.json();
      })
      .then((data) => {
        data.data_hora = data.data_hora.slice(0, 16); // Ajuste de formato de data
        setConsulta(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => setIsLoading(false)); // Certifique-se de que o loading seja removido
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta({
      ...consulta,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/atualizar_consulta/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consulta),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar consulta');
        }
        return response.json();
      })
      .then(() => {
        navigate('/consultas');
      })
      .catch((error) => setErrorMessage(error.message));
  };

  // Se está carregando, exibe o carregamento
  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="form-container">
      <h1>Atualizar Consulta</h1>
      {errorMessage && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente:</label>
          {/* O campo de paciente fica apenas como texto, pois o ID já está registrado */}
          <input
            type="text"
            name="paciente_id"
            value={consulta.paciente_id} // Valor do ID do paciente
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="data_hora"
            value={consulta.data_hora}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duração (minutos):</label>
          <input
            type="number"
            name="duracao"
            value={consulta.duracao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={consulta.observacoes}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '3px', border: '1px solid #ccc' }}
          />
        </div>
        <div className="button-container">
          <button type="submit">Atualizar Consulta</button>
          <button type="button" onClick={() => navigate('/consultas')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AtualizarConsulta;
