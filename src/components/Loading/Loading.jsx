import "./Loading.css";

const Loading = () => {
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
      <span class="loader"></span>
    </div>
  );
};

export default Loading;
