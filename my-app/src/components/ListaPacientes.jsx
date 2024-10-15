import React, { useEffect, useState } from 'react';

const ListaPacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('/listar_pacientes');
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

    return (
        <div>
            <h1>Listar Pacientes</h1>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPacientes;
