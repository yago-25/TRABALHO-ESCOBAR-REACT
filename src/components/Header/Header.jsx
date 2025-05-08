import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineRollback } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="div-header">
      <p>header</p>
      <AiOutlineRollback
        onClick={() => navigate('/')}
        style={{
          width: "30px",
          height: "30px",
          color: "red",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default Header;
