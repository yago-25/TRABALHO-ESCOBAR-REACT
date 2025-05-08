import { useEffect, useState } from "react";
import { api } from "../services/api";
import Loading from "../components/Loading/Loading";

const HomeClients = () => {
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/produtos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response, "response");
    } catch (e) {
      console.log("Erro ao buscar produtos: ", e);
      alert("Erro ao buscar produtos.");
    } finally {
      setLoading(false);
    }
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

  return <div>homeClients</div>;
};

export default HomeClients;
