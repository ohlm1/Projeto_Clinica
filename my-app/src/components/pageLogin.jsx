import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Alterado para useNavigate
import axios from "axios";
import './LoginFisioterapeuta.css';

const LoginFisioterapeuta = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();  // Hook useNavigate para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        nome_usuario: nomeUsuario,
        senha: senha,
      });

      if (response.status === 200) {
        setMensagem("Login bem-sucedido!");
        // Redireciona para a homepage
        navigate("/home");  // Usando navigate em vez de history.push
      }
    } catch (error) {
      setMensagem(error.response?.data?.msg || "Erro no login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login do Fisioterapeuta</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome_usuario">Nome de Usuário</label>
          <input
            type="text"
            id="nome_usuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginFisioterapeuta;
