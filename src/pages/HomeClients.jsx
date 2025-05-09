import { useEffect, useMemo, useState } from "react";
import { apiMock } from "../services/api";
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import { TypeAnimation } from "react-type-animation";
import "./../styles/HomeClients.css";
import { Drawer, Modal, Tooltip } from "antd";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCart } from "../contexts/CartContext";
import { HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const HomeClients = () => {
  const navigate = useNavigate();

  const { addToCart, removeFromCart, cartItems } = useCart();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [productSelected, setProdutoSelected] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

  const totalPrice = cartItems.reduce((acc, product) => {
    return acc + product.preco;
  }, 0);

  const getProducts = async () => {
    setLoading(true);
    try {
      // Usando apiMock com Authentication fixo, pois essa rota pede token pra ser acessada
      const response = await apiMock.get("/produtos");

      if (response.data.length) {
        setProducts(response.data);
      }
    } catch (e) {
      console.log("Erro ao buscar produtos: ", e);
      alert("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCartClick = () => {
    setDrawerOpen(true);
  };

  const handleAdd = (produto) => {
    if (produto.quantidade <= 0) {
      return;
    }

    addToCart(produto);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
      <Header onCartClick={handleCartClick} />
      <div style={{ marginTop: "150px" }}>
        <TypeAnimation
          sequence={[
            "Bem-vindo(a) à Loja do React!",
            2000,
            "Encontre produtos incríveis com apenas um clique.",
            2000,
            "Qualidade e variedade em um só lugar.",
            2000,
            "Compre com praticidade, receba com agilidade.",
            2000,
            "A experiência de compra que você merece.",
            2000,
            "",
            1000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
        <h2 style={{ fontWeight: "300", fontSize: "22px" }}>
          Descubra uma variedade de produtos incríveis e aproveite suas compras
          com praticidade e segurança.
        </h2>
      </div>
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          height: "100%",
          margin: "10px auto",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr 1fr 1fr 1.5fr 1fr",
            gap: "16px",
            padding: "12px 8px",
            fontWeight: "bold",
            backgroundColor: "white",
            color: "#121212",
            borderRadius: "8px 8px 0 0",
            textAlign: "center",
            width: "1100px",
          }}
        >
          <p>Nome</p>
          <p>Descrição</p>
          <p>Preço</p>
          <Tooltip title="Quantidade Disponível">
            <p>Qtde. Disp.</p>
          </Tooltip>
          <p>Imagem</p>
          <p>Ações</p>
        </div>

        <div style={{ width: "1100px" }}>
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 3fr 1fr 1fr 1.5fr 1fr",
                gap: "16px",
                alignItems: "center",
                padding: "12px 8px",
                backgroundColor: "#ffffff14",
                borderBottom: "1px solid #121212",
                textAlign: "center",
                width: "1100px",
                marginLeft: "-8px",
              }}
            >
              <p>{product.nome}</p>
              <p>{product.descricao}</p>
              <p>R$ {Number(product.preco).toFixed(2)}</p>
              <p>{product.quantidade}</p>
              <img
                src={product.imagem ?? ""}
                alt={product.nome}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <Tooltip title="Adicionar ao carrinho">
                  <MdOutlineShoppingCartCheckout
                    style={{
                      cursor:
                        product.quantidade <= 0 ? "not-allowed" : "pointer",
                      color: product.quantidade <= 0 ? "#121212" : "white",
                      width: "22px",
                      height: "22px",
                    }}
                    onClick={() => handleAdd(product)}
                  />
                </Tooltip>
                <Tooltip title="Visualizar Produto">
                  <FaEye
                    style={{
                      cursor: "pointer",
                      color: "white",
                      width: "22px",
                      height: "22px",
                    }}
                    onClick={() => {
                      setProdutoSelected(product);
                      setModal(true);
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <IoIosArrowBack
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              color: "white",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          />
          <span
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Página {currentPage} de {Math.ceil(products.length / itemsPerPage)}
          </span>
          <IoIosArrowForward
            onClick={() =>
              setCurrentPage((prev) =>
                prev < Math.ceil(products.length / itemsPerPage)
                  ? prev + 1
                  : prev
              )
            }
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
            style={{
              padding: "8px 12px",
              color: "white",
              borderRadius: "6px",
              cursor:
                currentPage === Math.ceil(products.length / itemsPerPage)
                  ? "not-allowed"
                  : "pointer",
            }}
          />
        </div>
      </div>
      <Modal
        title={productSelected ? productSelected.nome : "Visualizar produto"}
        open={modal}
        onCancel={() => {
          setModal(false);
          setProdutoSelected(null);
        }}
        footer={null}
      >
        <div>
          {productSelected && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <img
                src={productSelected.imagem}
                alt={productSelected.nome}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <p>
                <strong>Descrição:</strong> {productSelected.descricao}
              </p>
              <p>
                <strong>Preço:</strong> R${" "}
                {Number(productSelected.preco).toFixed(2)}
              </p>
              <p>
                <strong>Quantidade disponível:</strong>{" "}
                {productSelected.quantidade}
              </p>
            </div>
          )}
        </div>
      </Modal>
      <Drawer
        title="Carrinho de compras"
        placement="right"
        closable={true}
        width={420}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            height: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Finalize seu Pedido</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: `${cartItems.length > 0 ? "" : "center"}`,
                gap: "10px",
                overflowY: `${cartItems.length > 0 ? "auto" : "hidden"}`,
                overflowX: "hidden",
                maxHeight: "750px",
                paddingRight: `${cartItems.length > 0 ? "20px" : "0px"}`,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.747) #f0f0f0",
              }}
            >
              {cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <div
                    key={product._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "12px",
                      borderRadius: "8px",
                      gap: "20px",
                      backgroundColor: "#f0f0f0",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      width: "94%",
                      border: "1px dashed rgba(0, 0, 0, 0.747)",
                    }}
                  >
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                      }}
                    />
                    <div>
                      <p style={{ fontWeight: "bold" }}>{product.nome}</p>
                      <p>{product.descricao}</p>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <span>
                          Preço: R$ {Number(product.preco).toFixed(2)}
                        </span>
                      </div>
                      <HiTrash
                        style={{
                          color: "red",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeFromCart(product._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Nenhum item Adicionado</p>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h3>Total: R${totalPrice.toFixed(2)}</h3>
              <h4>Itens: {cartItems.length}</h4>
            </div>
            <button onClick={() => navigate("/client/checkout")}>
              Ir para Pagamento
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default HomeClients;
