import React, { useState } from 'react';
<<<<<<< HEAD
=======
import { Link, useNavigate } from 'react-router-dom';
import './formStyles.css'; // Importa o CSS
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e

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
<<<<<<< HEAD
=======
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegação
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e

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
<<<<<<< HEAD
                setFormData({
=======
                setFormData({ // Limpa o formulário após o sucesso
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
                    nome: '',
                    data_nascimento: '',
                    email: '',
                    telefone: '',
                    CPF: '',
                    logradouro: '',
                    linha_de_endereco1: '',
                    numero: '',
<<<<<<< HEAD
                }); // Limpa o formulário após o sucesso
            } else {
                const errorData = await response.json();
                console.error('Erro ao registrar paciente:', errorData);
            }
        } catch (error) {
=======
                });
                navigate('/'); // Redireciona para a lista de pacientes após o registro
            } else {
                const errorData = await response.json();
                setErrorMessage(`Erro ao registrar paciente: ${errorData.message || 'Erro desconhecido'}`);
                console.error('Erro ao registrar paciente:', errorData);
            }
        } catch (error) {
            setErrorMessage('Erro na requisição. Tente novamente mais tarde.');
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
            console.error('Erro na requisição:', error);
        }
    };

    return (
<<<<<<< HEAD
        <div className="container" style={styles.container}>
            <h2 style={styles.title}>Registro de Novos Pacientes</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome Completo:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="data_nascimento">Data de Nascimento:</label>
                <input
                    type="date"
                    id="data_nascimento"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="telefone">Telefone:</label>
                <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="CPF">CPF:</label>
                <input
                    type="text"
                    id="CPF"
                    name="CPF"
                    value={formData.CPF}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="logradouro">Logradouro:</label>
                <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="linha_de_endereco1">Linha de Endereço 1:</label>
                <input
                    type="text"
                    id="linha_de_endereco1"
                    name="linha_de_endereco1"
                    value={formData.linha_de_endereco1}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="numero">Número:</label>
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Registrar Paciente</button>
=======
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
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
            </form>
        </div>
    );
};

<<<<<<< HEAD
// Estilos em linha
const styles = {
    container: {
        width: '90%',
        maxWidth: '700px',
        padding: '2rem',
        background: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        margin: 'auto',
    },
    title: {
        color: '#00796b',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '1.5rem',
        lineHeight: '1.2',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        borderRadius: '0.5rem',
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#00796b',
        color: '#ffffff',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        fontSize: '1.125rem',
        cursor: 'pointer',
        width: '100%',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
};

=======
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
export default RegistroPacientes;
