import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './formStyles.css'; // Importa o CSS

const RegistroPacientes = () => {
    const [formData, setFormData] = useState({
        nome: '',
        data_nascimento: '',
        email: '',
        telefone: '',
        CPF: '',
        logradouro: '',
        linha_de_endereco1: '',
        numero: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/paciente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Envia os dados como JSON
            });

            if (response.ok) {
                console.log('Paciente registrado com sucesso!');
                setFormData({ // Limpa o formulário após o sucesso
                    nome: '',
                    data_nascimento: '',
                    email: '',
                    telefone: '',
                    CPF: '',
                    logradouro: '',
                    linha_de_endereco1: '',
                    numero: '',
                });
                navigate('/'); // Redireciona para a lista de pacientes após o registro
            } else {
                const errorData = await response.json();
                setErrorMessage(`Erro ao registrar paciente: ${errorData.message || 'Erro desconhecido'}`);
                console.error('Erro ao registrar paciente:', errorData);
            }
        } catch (error) {
            setErrorMessage('Erro na requisição. Tente novamente mais tarde.');
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="title">Registro de Novos Pacientes</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe mensagem de erro se houver */}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome Completo:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="data_nascimento">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="data_nascimento"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="CPF">CPF:</label>
                    <input
                        type="text"
                        id="CPF"
                        name="CPF"
                        value={formData.CPF}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="logradouro">Logradouro:</label>
                    <input
                        type="text"
                        id="logradouro"
                        name="logradouro"
                        value={formData.logradouro}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="linha_de_endereco1">Linha de Endereço 1:</label>
                    <input
                        type="text"
                        id="linha_de_endereco1"
                        name="linha_de_endereco1"
                        value={formData.linha_de_endereco1}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="button-container">
                    <button type="submit">Registrar Paciente</button>
                    <Link to="/">
                        <button type="button">Voltar para a Listagem</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default RegistroPacientes;
