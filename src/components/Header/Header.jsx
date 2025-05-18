import { useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineRollback } from "react-icons/ai";
import { Tooltip } from "antd";
import { BsCart } from "react-icons/bs";
import { useCart } from "../../contexts/CartContext";

const Header = ({ onCartClick, showCart = true }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  return (
    <header className="div-header">
      <p style={{ marginLeft: "20px" }}>🛒 Bem-vindo à Loja Digital!</p>
      <div style={{ position: "relative" }}>
        {showCart && (
          <Tooltip title="Carrinho de Compras">
            <div style={{ position: "relative", display: "inline-block" }}>
              <BsCart
                onClick={onCartClick}
                style={{
                  width: "30px",
                  height: "30px",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "20px",
                }}
              />
              {cartItems.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "12px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "1px 7px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          </Tooltip>
        )}

        <Tooltip title="Voltar">
          <AiOutlineRollback
            onClick={() => navigate("/")}
            style={{
              width: "30px",
              height: "30px",
              color: "white",
              cursor: "pointer",
              marginRight: "20px",
            }}
          />
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
