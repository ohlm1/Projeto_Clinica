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
                const response = await fetch('http://127.0.0.1:5000/api/pacientes');
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
        if (!confirmDelete) return;  // Exit if not confirmed

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/delete_paciente/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Erro ao deletar paciente');
            }

            // Remove the deleted patient from the state
            setPacientes(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error during fetch:', error);  // Log the error
            alert(`Ocorreu um erro ao deletar o paciente: ${error.message}`);
        }
    };

    const handleDesativate = async (id) => {
        const confirmDeactivate = window.confirm('Tem certeza que deseja inativar este paciente?');
        if (!confirmDeactivate) return;  // Exit if not confirmed
    
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/inativar_paciente/${id}`, { method: 'PUT' });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Erro ao inativar paciente');
            }
    
            // Atualizar o status do paciente para "inativo" localmente
            setPacientes(prev => 
                prev.map(p => p.id === id ? { ...p, status: 'inativo' } : p)
            );
        } catch (error) {
            console.error('Error during fetch:', error);
            alert(`Ocorreu um erro ao inativar o paciente: ${error.message}`);
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
                        <th>Status</th>
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
                                    'Endereço não disponível'
                                )}
                            </td>
                            <td>
                                {paciente.status}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(paciente.id)}>Editar</button>
                                <button onClick={() => handleDelete(paciente.id)}>Deletar</button>
                                <button onClick={() => handleDesativate(paciente.id)}> Inativar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPacientes;
