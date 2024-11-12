import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyles.css'; // Adicionando o CSS de estilo

const CriarConsulta = () => {
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_hora: '',
    duracao: '',
    observacoes: '',
  });
  const [pacientes, setPacientes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://127.0.0.1:5000/api/pacientes')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao carregar lista de pacientes');
      })
      .then((data) => setPacientes(data))
      .catch(() => setErrorMessage('Erro ao carregar lista de pacientes'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form
    if (!formData.paciente_id || !formData.data_hora || !formData.duracao) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/criar_consulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // On success, navigate to consultas page
        navigate('/consultas');
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Erro ao criar consulta');
      }
    } catch (error) {
      setErrorMessage('Erro ao criar consulta');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="form-container">
      <h1>Criar Nova Consulta</h1>

      {errorMessage && <div style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente:</label>
          <select
            name="paciente_id"
            value={formData.paciente_id}
            onChange={handleChange}
          >
            <option value="">Selecione o Paciente</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="data_hora"
            value={formData.data_hora}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Duração (minutos):</label>
          <input
            type="number"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Criar Consulta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarConsulta;
