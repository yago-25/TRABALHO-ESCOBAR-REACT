import { message, Button } from 'antd';
import 'antd/dist/reset.css';

const TestMessage = () => {
  return (
    <div>
      <Button onClick={() => message.error("Erro de teste!")}>Disparar erro</Button>
    </div>
  );
};

export default TestMessage;