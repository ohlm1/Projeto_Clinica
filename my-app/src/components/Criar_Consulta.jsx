import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CriarConsulta = () => {
  const [formData, setFormData] = useState({
    paciente_id: '',
    data_hora: '',
    duracao: '',
    observacoes: '',
  });
  const [pacientes, setPacientes] = useState([]); // Lista de pacientes
  const [isLoading, setIsLoading] = useState(false); // Estado para controle de carregamento
  const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro
  const navigate = useNavigate();

  // Carregar a lista de pacientes (opcional, se necessário)
  useEffect(() => {
    fetch('http://127.0.0.1:5000/listar_pacientes')  // Alterar para o endpoint correto
      .then((response) => response.json())
      .then((data) => setPacientes(data))
      .catch((error) => setErrorMessage('Erro ao carregar a lista de pacientes.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de dados antes de enviar
    if (!formData.paciente_id || !formData.data_hora || !formData.duracao) {
      setErrorMessage('Todos os campos são obrigatórios!');
      return;
    }

    setIsLoading(true); // Ativa o carregamento

    fetch('http://127.0.0.1:5000/criar_consulta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/'); // Navega de volta para a lista de consultas
        } else {
          setErrorMessage('Erro ao criar consulta');
        }
      })
      .catch((error) => {
        setErrorMessage('Erro ao criar consulta');
      })
      .finally(() => {
        setIsLoading(false); // Desativa o carregamento
      });
  };

  return (
    <div>
      <h1>Criar Nova Consulta</h1>
      <form onSubmit={handleSubmit}>
        {/* Exibição de erro */}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        
        <div>
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
        
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="data_hora"
            value={formData.data_hora}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Duração (minutos):</label>
          <input
            type="number"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Criando...' : 'Criar Consulta'}
        </button>
      </form>
    </div>
  );
};

export default CriarConsulta;
