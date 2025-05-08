import "./Input.css";

const Input = ({ type, onChange, placeholder, width, value }) => {
  return (
    <input
      value={value}
      style={{ width: `${width}px` }}
      className="input"
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
