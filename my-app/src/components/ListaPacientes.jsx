import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaPacientes.css';

const ListaPacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPacientes = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/pacientes');
                if (!response.ok) {
                    throw new Error('Erro ao buscar pacientes');
                }
                const data = await response.json();
                setPacientes(data);
            } catch (error) {
                console.error(error);
                setError('Erro ao buscar pacientes. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const handleEdit = (id) => {
        navigate(`/atualizar-paciente/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Tem certeza que deseja deletar este paciente?');
    
        if (!confirmDelete) return; // Sai da função se não confirmar
    
        try {
            const response = await fetch(`http://localhost:5000/api/delete_paciente/${id}`, { method: 'DELETE' });
    
            if (!response.ok) {
                const errorMessage = await response.text(); // Captura a mensagem de erro do servidor
                throw new Error(errorMessage || 'Erro ao deletar paciente');
            }
    
            setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== id));
        } catch (error) {
            console.error(error);
            alert(`Ocorreu um erro ao deletar o paciente: ${error.message}`);
        }
    };
    
    
    const handleRegister = () => {
        navigate('/cadastro_paciente');
    };

    return (
        <div>
            <h1>Listar Pacientes</h1>
            <button onClick={handleRegister}>Cadastrar Paciente</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table id="pacientes-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.id}>
                            <td>{paciente.id}</td>
                            <td>{paciente.nome}</td>
                            <td>{paciente.CPF}</td>
                            <td>{new Date(paciente.data_nascimento).toLocaleDateString('pt-BR')}</td>
                            <td>{paciente.telefone}</td>
                            <td>{paciente.email}</td>
                            <td>
                                {paciente.endereco ? (
                                    `${paciente.endereco.logradouro}, ${paciente.endereco.linha_de_endereco1}, ${paciente.endereco.numero}`
                                ) : (
                                    'Nenhum endereço cadastrado'
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(paciente.id)}>Editar</button>
                                <button onClick={() => handleDelete(paciente.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPacientes;
