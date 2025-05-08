import './Button.css';

const Button = ({ placeholder, onClick, width }) => {
  return <button style={{ width: `${width}px` }} className='btn-template' onClick={onClick}>{placeholder}</button>;
};

export default Button;
