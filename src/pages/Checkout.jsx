import { useState } from "react";
import Header from "../components/Header/Header";
import { useCart } from "../contexts/CartContext";
import { Input, Select } from "antd";
import { messageAlert } from "../utils/messageAlert";
import { api, apiMock, myUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const { Option } = Select;

const Checkout = () => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState();
  const [nameClient, setNameClient] = useState();
  const [loading, setLoading] = useState();

  const { cartItems, removeAllFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, product) => {
    return acc + product.preco;
  }, 0);

  const handleMakeSale = async () => {
    if (!payment || !nameClient) {
      messageAlert({
        type: "error",
        message: "Por favor, preencha e selecione todos os campos.",
      });
      return;
    }
    setLoading(true);

    try {
      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0];

      const produtosAgrupados = Object.values(
        cartItems.reduce((acc, item) => {
          if (!acc[item._id]) {
            acc[item._id] = {
              nome: item.nome,
              preco: item.preco,
              quantidade: 1,
            };
          } else {
            acc[item._id].quantidade += 1;
          }
          return acc;
        }, {})
      );

      const data = {
        nomeCliente: nameClient,
        usuario: myUser,
        data: formattedDate,
        produtos: produtosAgrupados,
      };

      localStorage.setItem("nameClient", nameClient);

      const response = await api.post("/venda", data);
      if (response.data._id) {
        navigate("/thanks");
        messageAlert({
          type: "success",
          message: "Compra realizada com sucesso!",
        });
        removeAllFromCart();
      }
    } catch (e) {
      console.log("Erro ao cadastrar venda: ", e);
      messageAlert({
        type: "error",
        message: "Erro ao realizar venda",
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
    <div className="div-home-page" style={{ minHeight: "100vh", color: "white" }}>
      <Header showCart={false} />

      <div
        style={{
          marginTop: "150px",
          display: "flex",
          width: "98vw",
          padding: "20px",
          gap: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "700px",
            borderRadius: "10px",
            border: "1.5px dashed #ccc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            backgroundColor: "#1f1f1f",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h2
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: 0,
                fontWeight: "600",
                fontSize: "22px",
                color: "#f0f0f0",
              }}
            >
              Total: <span>R${totalPrice.toFixed(2)}</span>
            </h2>
            <h2
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: 0,
                fontWeight: "600",
                fontSize: "22px",
                color: "#f0f0f0",
              }}
            >
              Qtde: <span>{cartItems.length}</span>
            </h2>

            <Select
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "6px",
                fontSize: "16px",
              }}
              placeholder="Selecione a forma de pagamento"
              value={payment}
              onChange={(e) => setPayment(e)}
            >
              <Option value="dinheiro">Dinheiro</Option>
              <Option value="credito">Cartão de Crédito</Option>
              <Option value="debito">Cartão de Débito</Option>
              <Option value="pix">Pix</Option>
            </Select>

            <Input
              style={{
                width: "100%",
                marginTop: "10px",
                borderRadius: "6px",
                fontSize: "16px",
                padding: "8px",
                height: "30px"
              }}
              placeholder="Insira seu Nome"
              onChange={(e) => setNameClient(e.target.value)}
              value={nameClient}
            />
          </div>

          <button
            onClick={handleMakeSale}
            style={{
              backgroundColor: "#fff",
              color: "#121212",
              height: "42px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              border: "none",
              marginTop: "auto",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6e6e6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
          >
            Comprar
          </button>
        </div>

        <div
          style={{
            width: "80%",
            height: "742px",
            borderRadius: "10px",
            border: "1.5px dashed #ccc",
            backgroundColor: "#1f1f1f",
            overflowY: "auto",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {cartItems.length === 0 ? (
              <p style={{ color: "#aaa", textAlign: "center", marginTop: "50%" }}>
                Seu carrinho está vazio
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "16px",
                    borderBottom: "1px solid #444",
                    paddingBottom: "12px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#fff",
                      }}
                    >
                      {item.nome}
                    </h3>
                    <p
                      style={{
                        margin: "6px 0",
                        fontSize: "14px",
                        color: "#ccc",
                      }}
                    >
                      {item.descricao}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#52c41a",
                      }}
                    >
                      R$ {Number(item.preco).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
