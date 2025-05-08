import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const Register = () => {
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
            //   onChange={(e) => setUser(e.target.value)}
            //   value={user}
            />
          </div>
          <div id="div-labels">
            <label htmlFor="">Senha</label>
            <Input
              width={300}
              placeholder="Insira sua Senha"
              type="password"
            //   onChange={(e) => setPassword(e.target.value)}
            //   value={password}
            />
          </div>
        </div>
        <div>
          <Button width={200} placeholder="Entrar" onClick={() => alert('a')} />
        </div>
        <p>
          Não tem uma conta?{" "}
          <span
            // onClick={() => navigate("/register")}
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Criar
          </span>
        </p>
      </div>
      <span style={{ cursor: "pointer" }}>
        Voltar
      </span>
    </div>
  )
};

export default Register;
