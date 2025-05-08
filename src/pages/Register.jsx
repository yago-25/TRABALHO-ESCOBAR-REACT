import { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { api } from "../services/api";
import { messageAlert } from "../utils/messageAlert";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!user || !password || !confirmPassword) {
      messageAlert({
        type: "error",
        message: "Por favor, preencha todos os campos."
      });
      return;
    }

    if (password !== confirmPassword) {
      messageAlert({
        type: "error",
        message: "As senhas não coincidem."
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/registrar', {
        usuario: user,
        senha: password,
        confirma: confirmPassword
      });

      if (response.data._id) {
        messageAlert({
          type: "success",
          message: "Registro realizdo com sucesso!"
        });
        navigate("/login/client");
      }
    } catch(e) {
      console.log("Erro ao fazer registro: ", e);
      messageAlert({
        type: "error",
        message: "Erro ao fazer registro."
      });
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
      <h1>Registro - Clientes</h1>
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
          <div id="div-labels">
            <label htmlFor="">Confirmar Senha</label>
            <Input
              width={300}
              placeholder="Confirme sua Senha"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
        </div>
        <div>
          <Button width={200} placeholder="Cadastrar" onClick={handleRegister} />
        </div>
      </div>
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Voltar
      </span>
    </div>
  )
};

export default Register;
