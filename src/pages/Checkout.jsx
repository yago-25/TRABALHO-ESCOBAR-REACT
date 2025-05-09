import { useState } from "react";
import Header from "../components/Header/Header";
import { useCart } from "../contexts/CartContext";
import { Input, Select } from "antd";
import { messageAlert } from "../utils/messageAlert";
import { apiMock } from "../services/api";
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
        data: formattedDate,
        produtos: produtosAgrupados,
      };

      localStorage.setItem("nameClient", nameClient);

      const response = await apiMock.post("/venda", data);
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
    <div className="div-home-page">
      <Header showCart={false} />
      <div
        style={{
          marginTop: "150px",
          display: "flex",
          width: "98vw",
          padding: "20px",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "700px",
            borderRadius: "10px",
            border: "1px dashed white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                margin: "10px 20px",
              }}
            >
              Total: <span>R${totalPrice.toFixed(2)}</span>
            </h2>
            <h2
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "90%",
                margin: "10px 20px",
              }}
            >
              Qtde: <span>{cartItems.length}</span>
            </h2>
            <Select
              style={{
                width: "90%",
                margin: "10px auto",
                display: "block",
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
                width: "90%",
                margin: "10px auto",
                display: "block",
              }}
              placeholder="Insira seu Nome"
              onChange={(e) => setNameClient(e.target.value)}
              value={nameClient}
            />
          </div>
          <button
            style={{
              backgroundColor: "white",
              color: "#121212",
              height: "40px",
            }}
            onClick={handleMakeSale}
          >
            Comprar
          </button>
        </div>
        <div
          style={{
            width: "80%",
            height: "700px",
            borderRadius: "10px",
            border: "1px dashed white",
          }}
        >
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              overflowY: "auto",
              maxHeight: "100%",
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item._id}
                style={{
                  width: "98%",
                  display: "flex",
                  gap: "16px",
                  borderBottom: "1px solid #ccc",
                  padding: "12px",
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
                  <h3 style={{ margin: 0 }}>{item.nome}</h3>
                  <p style={{ margin: "4px 0" }}>{item.descricao}</p>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    R$ {Number(item.preco).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
