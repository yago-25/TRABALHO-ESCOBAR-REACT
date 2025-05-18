import { Input, Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { messageAlert } from "../../utils/messageAlert";
import Loading from "../Loading/Loading";

const { TextArea } = Input;

const RegisterProduct = ({ onSubmit, product }) => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categorias", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCategory(response.data);
    } catch (e) {
      console.log("Erro ao buscar categorias: ", e);
      messageAlert({
        type: "error",
        message: "Erro ao buscar categorias.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        nome: product.nome,
        quantidade: product.quantidade,
        preco: product.preco,
        categoria: product.categoria,
        usuario: product.usuario,
        imagem: product.imagem,
        descricao: product.descricao,
      });
    }
  }, [product, form]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleFinish = (values) => {
    if (onSubmit) {
      if (product?._id) {
        values._id = product._id;
      }
      onSubmit(values);
      messageAlert({
        type: "success",
        message: "Produto atualizado com sucesso!"
      });
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
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "800px",
        margin: "0 auto",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Form.Item
            label="Nome do produto"
            name="nome"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Informe o nome do produto" }]}
          >
            <Input placeholder="Ex: Caneca personalizada" />
          </Form.Item>

          <Form.Item
            label="Quantidade"
            name="quantidade"
            style={{ width: 150 }}
            rules={[{ required: true, message: "Informe a quantidade" }]}
          >
            <Input type="number" placeholder="Ex: 100" />
          </Form.Item>

          <Form.Item
            label="Preço"
            name="preco"
            style={{ width: '100%' }}
            rules={[{ required: true, message: "Informe o preço" }]}
          >
            <Input type="number" placeholder="Ex: 49.90" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Form.Item
            label="Categoria"
            name="categoria"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Informe a categoria" }]}
          >
            <Select placeholder="Selecione uma categoria">
              {category.map((cat) => (
                <Select.Option key={cat._id} value={cat.nome}>
                  {cat.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="URL da imagem"
          name="imagem"
          rules={[{ required: true, message: "Informe a URL da imagem" }]}
        >
          <Input placeholder="https://exemplo.com/imagem.jpg" />
        </Form.Item>

        <Form.Item
          label="Descrição do produto"
          name="descricao"
          rules={[{ required: true, message: "Informe a descrição" }]}
        >
          <TextArea placeholder="Detalhes sobre o produto" rows={4} />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" size="large">
            {product ? "Atualizar Produto" : "Cadastrar Produto"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegisterProduct;
