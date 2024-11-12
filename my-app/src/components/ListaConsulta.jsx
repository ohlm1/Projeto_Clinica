import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Consultas.css';

const ConsultasList = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch consultas da API
  useEffect(() => {
    fetch('http://127.0.0.1:5000/listar_consultas') // URL da API
      .then((response) => response.json())
      .then((data) => {
        setConsultas(data);
        // Agora, buscar os pacientes de todos os IDs que aparecerem nas consultas
        const pacienteIds = data.map(consulta => consulta.paciente_id);
        fetchPacientes(pacienteIds);
      })
      .catch(() => {
        setErrorMessage('Erro ao carregar as consultas.');
        setIsLoading(false);
      });
  }, []);

  // Buscar pacientes pelo ID
  const fetchPacientes = (pacienteIds) => {
    const uniqueIds = [...new Set(pacienteIds)];

    // Carregar pacientes com base nos IDs
    Promise.all(uniqueIds.map(id =>
      fetch(`http://127.0.0.1:5000/api/paciente/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setPacientes((prev) => ({
            ...prev,
            [data.id]: data, // Armazena o paciente pelo ID
          }));
        })
        .catch(() => {
          setErrorMessage('Erro ao carregar os pacientes.');
        })
    ))
    .finally(() => setIsLoading(false));
  };

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR'); // Formato de data em pt-BR
  };

  // Função para excluir consulta
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta consulta?')) {
      setIsLoading(true); // Ativa o carregamento enquanto a consulta está sendo deletada

      fetch(`http://127.0.0.1:5000/deletar_consulta/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setConsultas(consultas.filter((consulta) => consulta.id !== id));
            setSuccessMessage('Consulta deletada com sucesso!');
            setErrorMessage(''); // Limpar mensagens de erro
          } else {
            setErrorMessage('Erro ao deletar consulta.');
          }
          setIsLoading(false); // Desativa o carregamento
        })
        .catch((error) => {
          setErrorMessage('Erro ao deletar consulta.');
          setIsLoading(false); // Desativa o carregamento em caso de erro
        });
    }
  };

  return (
    <div>
      <h1>Listar Consultas</h1>
      <Link to="/criar_consulta">Criar Nova Consulta</Link>

      {/* Exibir mensagens de sucesso ou erro */}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/* Indicador de carregamento */}
      {isLoading && <div>Carregando...</div>}

      {/* Tabela de consultas */}
      {!isLoading && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Data e Hora</th>
              <th>Duração (minutos)</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.length === 0 ? (
              <tr>
                <td colSpan="6">Nenhuma consulta encontrada.</td>
              </tr>
            ) : (
              consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td>{consulta.id}</td>
                  <td>
                    {pacientes[consulta.paciente_id] ? 
                      pacientes[consulta.paciente_id].nome : 'Carregando...'}
                  </td>
                  <td>{formatDate(consulta.data_hora)}</td>
                  <td>{consulta.duracao}</td>
                  <td>{consulta.observacoes}</td>
                  <td>
                    <Link to={`/atualizar_consulta/${consulta.id}`}>Editar</Link>
                    <button
                      onClick={() => handleDelete(consulta.id)}
                      disabled={isLoading} // Desabilita o botão enquanto a operação está em andamento
                    >
                      {isLoading ? 'Deletando...' : 'Deletar'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConsultasList;
