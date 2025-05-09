import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./../styles/LoginClients.css";
import Input from "../components/Input/Input";
import { useState } from "react";
import Loading from "../components/Loading/Loading";
import { useAuth } from "../contexts/AuthContext";

const LoginClients = () => {
  const navigate = useNavigate();
  const { loginWithCredentials } = useAuth();

  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!user || !password) {
      alert("Por favor, preencha todos os dados.");
      return;
    }

    setLoading(true);
    const result = await loginWithCredentials(user, password);
    setLoading(false);

    if (result.success) {
      console.log("Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/admin/panel");
      }, 1000);
    } else {
      alert(result.message || "Erro ao fazer login.");
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
      <h1>Login - Admins</h1>
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
