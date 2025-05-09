import { useNavigate } from "react-router-dom";
import "./../styles/Thanks.css";

const Thanks = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/client/home");
  };

  const name = localStorage.getItem("nameClient") || "";

  return (
    <div className="thanks-container">
      <div className="thanks-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100"
          height="100"
          fill="none"
          stroke="#121212"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" stroke="#121212" strokeWidth="2" />
          <path d="M9 12l2 2l4-4" stroke="#121212" strokeWidth="2" />
        </svg>
        <h1>Obrigado, {name}!</h1>
        <p>Seu pedido foi concluído com sucesso!</p>
        <button className="back-button" onClick={handleBack}>
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
};

export default Thanks;
