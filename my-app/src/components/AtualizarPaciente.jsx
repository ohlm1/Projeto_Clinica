import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './formStyles.css'; // Importa o CSS

const AtualizarPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = useState({
        nome: '',
        data_nascimento: '',
        CPF: '',
        telefone: '',
        email: ''
    });

    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/paciente/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar paciente');
                }
                const data = await response.json();
                setPaciente(data);
            } catch (error) {
                console.error(error);
                setErro('Paciente não encontrado');
            }
        };

        fetchPaciente();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaciente((prevPaciente) => ({
            ...prevPaciente,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/paciente/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paciente),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar paciente');
            }

            const result = await response.json();
            setMensagem(result.message);
            setErro(''); // Limpa o erro em caso de sucesso
        } catch (error) {
            console.error(error);
            setErro('Erro ao atualizar paciente');
            setMensagem('');
        }
    };

    return (
        <div className="form-container">
            <h1>Atualizar Paciente</h1>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={paciente.nome}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            name="data_nascimento"
                            value={paciente.data_nascimento}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="CPF"
                            value={paciente.CPF}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Telefone:
                        <input
                            type="text"
                            name="telefone"
                            value={paciente.telefone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={paciente.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="button-container">
                    <button type="submit">Atualizar</button>
                    <Link to="/">
                        <button type="button">Voltar para a Listagem</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AtualizarPaciente;
