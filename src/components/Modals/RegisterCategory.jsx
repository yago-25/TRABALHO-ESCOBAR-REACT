import { Input, Button, Form } from "antd";
import { useEffect } from "react";

const RegisterCategory = ({ onSubmit, category }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        nome_categoria: category.nome,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleFinish = (values) => {
    if (onSubmit) {
      if (category?._id) {
        values._id = category._id;
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
      <Form.Item
        label="Nome da Categoria"
        name="nome_categoria"
        rules={[{ required: true, message: "Informe o nome da categoria" }]}
      >
        <Input placeholder="Ex: Bebidas, Utensílios" />
      </Form.Item>

      <div className="button-row">
        <Button type="primary" htmlType="submit">
          {category ? "Atualizar Categoria" : "Cadastrar Categoria"}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterCategory;
