import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import backgroundImage from "../assets/cover 1.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { name, email, password, phone, city });
      alert("Cadastro realizado com sucesso! Agora você pode fazer login.");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro ao registrar usuário");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "80rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <h2>Cadastro</h2>
        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginBottom: "10px",
              height: "40px",
              width: "20rem",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "10px",
              height: "40px",
              width: "20rem",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: "10px",
              height: "40px",
              width: "20rem",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              marginBottom: "10px",
              height: "40px",
              width: "20rem",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              marginBottom: "10px",
              height: "40px",
              width: "20rem",
              borderRadius: "8px",
              border: "none",
            }}
          />
          <button type="submit">Cadastrar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
