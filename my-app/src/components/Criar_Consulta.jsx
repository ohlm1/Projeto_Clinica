import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './formStyles.css';

const API_BASE_URL = 'http://127.0.0.1:5000';

const CriarConsulta = () => {
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_hora: '',
    duracao: '',
    observacoes: '',
  });
  const [pacientes, setPacientes] = useState([]);
  const [isLoadingPacientes, setIsLoadingPacientes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingPacientes(true);
    fetch(`${API_BASE_URL}/api/pacientes`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro ao carregar lista de pacientes');
      })
      .then((data) => setPacientes(data))
      .catch(() => setErrorMessage('Erro ao carregar lista de pacientes'))
      .finally(() => setIsLoadingPacientes(false));
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

    // Validações
    if (!formData.paciente_id || !formData.data_hora || !formData.duracao) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }
    if (new Date(formData.data_hora) < new Date()) {
      setErrorMessage('A data e hora devem ser futuras!');
      return;
    }
    if (formData.duracao <= 0) {
      setErrorMessage('A duração deve ser maior que zero!');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/criar_consulta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/consultas');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Erro ao criar consulta');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Criar Nova Consulta</h1>

      {errorMessage && (
        <div
          style={{
            color: errorMessage.includes('Erro ao carregar') ? 'orange' : 'red',
            marginBottom: '15px',
          }}
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Paciente:</label>
          {isLoadingPacientes ? (
            <p>Carregando pacientes...</p>
          ) : (
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
          )}
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Criando...' : 'Criar Consulta'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarConsulta;
