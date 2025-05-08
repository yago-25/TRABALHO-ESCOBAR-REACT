import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./../styles/LoginClients.css";
import Input from "../components/Input/Input";
import { useState } from "react";
import { api } from "../services/api";
import Loading from "../components/Loading/Loading";

const LoginClients = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!user || !password) {
      alert("Por favor, preencha todos os dados.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/login", {
        usuario: user,
        senha: password,
      });
      console.log(response, "response");
    } catch (e) {
      console.log("Erro ao fazer login: ", e);
      alert("Erro ao fazer Login.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="div-login-clients">
      <h1>Login - Clientes</h1>
      <div className="div-inputs">
        <div className="div-separe-inputs">
          <div id="div-labels">
            <label htmlFor="">Usuário</label>
            <Input
              width={300}
              placeholder="Insira seu Usuário"
              type="text"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>
          <div id="div-labels">
            <label htmlFor="">Senha</label>
            <Input
              width={300}
              placeholder="Insira sua Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <div>
          <Button width={200} placeholder="Entrar" onClick={handleLogin} />
        </div>
        <p>
          Não tem uma conta?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Criar
          </span>
        </p>
      </div>
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Voltar
      </span>
    </div>
  );
};

export default LoginClients;
