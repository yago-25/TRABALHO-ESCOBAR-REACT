import { useNavigate } from "react-router-dom";
import "./../App.css";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="div-title">
        <h1>Loja Virtual - Acesso</h1>
      </div>
      <div className="div-btns">
        <button onClick={() => navigate("/client/home")}>
          Entrar como Cliente
        </button>
        <button onClick={() => navigate("/login")} className="btn-admin">
          Entrar como Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
