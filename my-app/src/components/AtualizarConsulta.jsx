import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AtualizarConsulta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    fetch(`/buscar_consulta/${id}`)
      .then((response) => response.json())
      .then((data) => setConsulta(data));
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

    fetch(`/atualizar_consulta/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consulta),
    })
      .then((response) => response.json())
      .then(() => {
        navigate('/'); // Redirect to consulta list
      })
      .catch((error) => alert('Erro ao atualizar consulta'));
  };

  if (!consulta) return <div>Loading...</div>;

  return (
    <div>
      <h1>Atualizar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Paciente:</label>
          <input
            type="text"
            name="paciente_id"
            value={consulta.paciente_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data e Hora:</label>
          <input
            type="datetime-local"
            name="data_hora"
            value={consulta.data_hora}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duração:</label>
          <input
            type="number"
            name="duracao"
            value={consulta.duracao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={consulta.observacoes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Atualizar Consulta</button>
      </form>
    </div>
  );
};

export default AtualizarConsulta;
