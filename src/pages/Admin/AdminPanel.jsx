import { Tooltip, Table, Modal, message } from "antd";
import "./../../styles/AdminPanel.css";
import { IoIosLogOut } from "react-icons/io";
import { FiEdit, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TypingDots from "../../components/TypingDots/TypingDots";
import { api } from "../../services/api";
import Loading from "../../components/Loading/Loading";
import RegisterCategory from "../../components/Modals/RegisterCategory";
import RegisterProduct from "../../components/Modals/RegisterProduct";
import { BsTrash } from "react-icons/bs";

const AdminPanel = () => {
  const options = [
    { key: 1, text: "Categorias" },
    { key: 2, text: "Produtos" },
    { key: 3, text: "Vendas" },
  ];

  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState();
  const [loadingModal, setLoadingModal] = useState();
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [modalCategorias, setModalCategorias] = useState(false);
  const [modalProdutos, setModalProdutos] = useState(false);
  const [modalVendas, setModalVendas] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCreateOrUpdateProduct = async (data) => {
    setLoadingModal(true);
    try {
      let response;
      if (selectedProduct) {
        console.log(selectedProduct, "cu");
        console.log(data, "data data cu");
        response = await api.put(
          "/produtos",
          {
            id: data._id,
            nome: data.nome,
            quantidade: data.quantidade,
            preco: data.preco,
            categoria: data.categoria,
            descricao: data.descricao,
            imagem: data.imagem,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProdutos((prev) =>
          prev.map((produto) =>
            produto._id === selectedProduct._id ? response.data : produto
          )
        );
        console.log(
          produtos,
          "produtosprodutosprodutosprodutosprodutosprodutos"
        );
      } else {
        response = await api.post(
          "/produtos",
          {
            nome: data.nome,
            quantidade: data.quantidade,
            preco: data.preco,
            categoria: data.categoria,
            descricao: data.descricao,
            usuario: data.usuario,
            imagem: data.imagem,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProdutos((prev) => [...prev, response.data]);
      }

      setModalProdutos(false);
      setSelectedProduct(null);
    } catch (e) {
      console.log("Erro ao cadastrar/atualizar produto: ", e);
      alert("Erro ao cadastrar/atualizar produto.");
    } finally {
      setLoadingModal(false);
    }
  };

  const handleRemoveProduct = async (id) => {
    if (!id) {
      alert("Id do produto não encontrado (não sei como...)");
      return;
    }

    setLoading(true);
    try {
      await api.delete(
        "/produtos",
        {
          data: { id },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setSelected("Produtos");
      setProdutos((prev) => prev.filter((produto) => produto._id !== id));
    } catch (e) {
      console.log("Erro ao deletar produto: ", e);
      alert("Erro ao deletar produto.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateCategory = async (data) => {
    setLoadingModal(true);
    try {
      let response;
      if (selectedCategory) {
        response = await api.put(
          "/categorias",
          {
            id: data._id,
            nome_categoria: data.nome_categoria,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setCategorias((prev) =>
          prev.map((categoria) =>
            categoria._id === selectedCategory._id ? response.data : categoria
          )
        );
      } else {
        response = await api.post(
          "/categorias",
          {
            nome_categoria: data.nome_categoria,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setCategorias((prev) => [...prev, response.data]);
      }

      setModalCategorias(false);
      setSelectedCategory(null);
    } catch (e) {
      console.log("Erro ao cadastrar/atualizar produto: ", e);
      alert("Erro ao cadastrar/atualizar produto.");
    } finally {
      setLoadingModal(false);
    }
  };

  const handleRemoveCategory = async (id) => {
    if (!id) {
      alert("Id da categoria não encontrado (não sei como...)");
      return;
    }

    setLoading(true);
    try {
      await api.delete(
        "/categorias",
        {
          data: { id },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setSelected("Categorias");
      setCategorias((prev) => prev.filter((categoria) => categoria._id !== id));
      message.success("Categoria deletada com sucesso!");
    } catch (e) {
      console.log("Erro ao deletar produto: ", e);
      message.error("Erro ao deletar categoria.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const renderTable = () => {
    switch (selected) {
      case "Categorias":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h2>Categorias</h2>
              <FiPlus
                style={{ width: "36px", height: "36px", cursor: "pointer" }}
                onClick={() => setModalCategorias(true)}
              />
            </div>
            <Table
              dataSource={categorias}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10 }}
              columns={[
                { title: "Nome", dataIndex: "nome", key: "nome" },
                { title: "Usuário", dataIndex: "usuario", key: "usuario" },
                {
                  title: "Ações",
                  dataIndex: "acoes",
                  key: "acoes",
                  render: (text, produto) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <FiEdit
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          color: "#d1a400",
                        }}
                        onClick={() => {
                          setSelectedCategory(produto);
                          setModalCategorias(true);
                        }}
                      />
                      <BsTrash
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => handleRemoveCategory(produto._id)}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </>
        );

      case "Produtos":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h2>Produtos</h2>
              <FiPlus
                style={{ width: "36px", height: "36px", cursor: "pointer" }}
                onClick={() => setModalProdutos(true)}
              />
            </div>
            <Table
              dataSource={produtos}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10 }}
              columns={[
                { title: "Nome", dataIndex: "nome", key: "nome" },
                {
                  title: "Descrição",
                  dataIndex: "descricao",
                  key: "descricao",
                },
                {
                  title: "Quantidade",
                  dataIndex: "quantidade",
                  key: "quantidade",
                },
                {
                  title: "Preço",
                  dataIndex: "preco",
                  key: "preco",
                  render: (text) =>
                    text ? `R$ ${Number(text).toFixed(2)}` : "R$ 0,00",
                },
                { title: "Usuário", dataIndex: "usuario", key: "usuario" },
                {
                  title: "Imagem",
                  dataIndex: "imagem",
                  key: "imagem",
                  render: (imagem) => (
                    <img
                      src={imagem}
                      alt="Imagem do Produto"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ),
                },
                {
                  title: "Ações",
                  dataIndex: "acoes",
                  key: "acoes",
                  render: (text, produto) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <FiEdit
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          color: "#d1a400",
                        }}
                        onClick={() => {
                          setSelectedProduct(produto);
                          setModalProdutos(true);
                        }}
                      />
                      <BsTrash
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => handleRemoveProduct(produto._id)}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </>
        );

      case "Vendas":
        return (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h2>Vendas</h2>
              <FiPlus
                style={{ width: "36px", height: "36px", cursor: "pointer" }}
                onClick={() => setModalVendas(true)}
              />
            </div>
            <Table
              dataSource={vendas}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10 }}
              columns={[
                {
                  title: "Nome do Cliente",
                  dataIndex: "nomeCliente",
                  key: "nomeCliente",
                },
                { title: "Data", dataIndex: "data", key: "data" },
                {
                  title: "Produtos",
                  dataIndex: "produtos",
                  key: "produtos",
                  render: (produtos) => (
                    <ul>
                      {produtos.map((p, idx) => (
                        <li key={idx}>
                          {p.nome} - {p.quantidade} x R$ {p.preco.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                { title: "Usuário", dataIndex: "usuario", key: "usuario" },
              ]}
            />
          </>
        );

      default:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              Selecione uma opção acima <TypingDots />
            </h1>
          </div>
        );
    }
  };

  useEffect(() => {
    const handlers = {
      Categorias: async () => {
        setLoading(true);
        try {
          const { data } = await api.get("/categorias", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setCategorias(data);
        } catch (e) {
          console.error("Erro ao listar categorias: ", e);
          alert("Erro ao listar categorias");
        } finally {
          setLoading(false);
        }
      },
      Produtos: async () => {
        setLoading(true);
        try {
          const { data } = await api.get("/produtos", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setProdutos(data);
        } catch (e) {
          console.error("Erro ao listar produtos: ", e);
          alert("Erro ao listar produtos");
        } finally {
          setLoading(false);
        }
      },
      Vendas: async () => {
        setLoading(true);
        try {
          const { data } = await api.get("/venda", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          setVendas(data);
        } catch (e) {
          console.error("Erro ao listar vendas: ", e);
          alert("Erro ao listar vendas");
        } finally {
          setLoading(false);
        }
      },
    };

    const fetchData = async () => {
      if (selected && handlers[selected]) {
        await handlers[selected]();
      }
    };

    fetchData();
  }, [selected]);

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
    <div className="div-admin-panel">
      <div className="header-admin-panel">
        <h1>Bem vindo ao painel de Admin!</h1>
        <Tooltip title="Sair" placement="left">
          <IoIosLogOut
            style={{ width: "36px", height: "36px", cursor: "pointer" }}
            onClick={handleLogout}
          />
        </Tooltip>
      </div>
      <div className="wrapper">
        {options.map((option) => (
          <div className="option" key={option.key}>
            <input
              value={option.text}
              name="btn"
              type="radio"
              className="input-adm"
              onChange={() => setSelected(option.text)}
            />
            <div className="btn">
              <span className="span">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="table-div">{renderTable()}</div>
      <Modal
        title="Cadastrar Categoria"
        onCancel={() => setModalCategorias(false)}
        open={modalCategorias}
        footer={null}
      >
        <RegisterCategory
          onSubmit={(data) => handleCreateOrUpdateCategory(data)}
          category={selectedCategory}
        />
      </Modal>
      <Modal
        title="Cadastrar Produto"
        onCancel={() => {
          setModalProdutos(false);
          setSelectedProduct(null);
        }}
        open={modalProdutos}
        footer={null}
      >
        {loadingModal ? (
          <Loading />
        ) : (
          <RegisterProduct
            onSubmit={(data) => handleCreateOrUpdateProduct(data)}
            product={selectedProduct}
          />
        )}
      </Modal>
      <Modal
        title="Cadastrar Venda"
        onCancel={() => setModalVendas(false)}
        open={modalVendas}
        footer={null}
      >
        <RegisterCategory />
      </Modal>
    </div>
  );
};

export default AdminPanel;
