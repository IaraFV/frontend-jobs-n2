import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

interface User {
  name: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      api
        .get("/user/profile", { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUser(response.data))
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h2>Bem-vindo, {user ? user.name : "Usuário"}</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Home;
