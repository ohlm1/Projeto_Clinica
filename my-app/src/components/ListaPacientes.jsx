import React, { useEffect, useState } from 'react';
<<<<<<< HEAD

const ListaPacientes = () => {
    const [pacientes, setPacientes] = useState([]);
=======
import { useNavigate } from 'react-router-dom'; // Atualizando a importação para useNavigate
import './ListaPacientes.css';

const ListaPacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate(); // Usando useNavigate
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
<<<<<<< HEAD
                const response = await fetch('/listar_pacientes');
=======
                const response = await fetch('http://localhost:5000/api/pacientes');
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
                if (!response.ok) {
                    throw new Error('Erro ao buscar pacientes');
                }
                const data = await response.json();
                setPacientes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPacientes();
    }, []);

<<<<<<< HEAD
    return (
        <div>
            <h1>Listar Pacientes</h1>
=======
    const handleEdit = (id) => {
        // Redireciona para a página de edição do paciente
        navigate(`/atualizar-paciente/${id}`); // Usando navigate para redirecionar
    };

    const handleRegister = () => {
        // Redireciona para a página de cadastro de paciente
        navigate('/cadastro_paciente'); // Usando navigate para redirecionar
    };

    return (
        <div>
            <h1>Listar Pacientes</h1>
            <button onClick={handleRegister}>Cadastrar Paciente</button> {/* Botão para cadastrar paciente */}
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
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
<<<<<<< HEAD
=======
                        <th>Ações</th> {/* Coluna para ações */}
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
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
<<<<<<< HEAD
=======
                            <td>
                                <button onClick={() => handleEdit(paciente.id)}>Editar</button>
                                
                            </td>
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPacientes;
