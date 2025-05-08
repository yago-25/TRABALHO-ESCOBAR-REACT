import { Input, Button, Form } from "antd";
import "./../../styles/Modals/RegisterProduct.css";
import { useEffect } from "react";

const { TextArea } = Input;

const RegisterProduct = ({ onSubmit, product }) => {
  const [form] = Form.useForm();

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

  const handleFinish = (values) => {
    if (onSubmit) {
      if (product?._id) {
        values._id = product._id;
      }
      onSubmit(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="form-container"
    >
      <div className="input-row">
        <Form.Item
          label="Nome do produto"
          name="nome"
          rules={[{ required: true, message: "Informe o nome do produto" }]}
        >
          <Input placeholder="Ex: Caneca personalizada" />
        </Form.Item>

        <Form.Item
          label="Quantidade"
          name="quantidade"
          rules={[{ required: true, message: "Informe a quantidade" }]}
        >
          <Input type="number" placeholder="Ex: 100" />
        </Form.Item>

        <Form.Item
          label="Preço"
          name="preco"
          rules={[{ required: true, message: "Informe o preço" }]}
        >
          <Input type="number" placeholder="Ex: 49.90" />
        </Form.Item>
      </div>

      <div className="input-row">
        <Form.Item
          label="Categoria"
          name="categoria"
          rules={[{ required: true, message: "Informe a categoria" }]}
        >
          <Input placeholder="Ex: Utensílios" />
        </Form.Item>

        <Form.Item
          label="Usuário"
          name="usuario"
          rules={[{ required: true, message: "Informe o ID do usuário" }]}
        >
          <Input placeholder="ID do usuário criador" />
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

      <div className="button-row">
        <Button type="primary" htmlType="submit">
          {product ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterProduct;
