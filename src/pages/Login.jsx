import { useNavigate } from "react-router-dom";
import './../App.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
    <div className='div-title'>
      <h1>Loja Virtual - Login</h1>
    </div>
    <div className='div-btns'>
      <button onClick={() => navigate('/login/client')}>Entrar como Cliente</button>
      <button onClick={() => navigate('/login/admin')} className='btn-admin'>Entrar como Admin</button>
    </div>
  </div>
  )
};

export default Login;