import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import backgroundImage from "../assets/Loginpageimage.png";
import logo from "../assets/CONECTATALENT.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      setPassword("");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/home");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Credenciais inválidas");
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
          width: "80%",
          maxWidth: "118rem",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <img
            src={logo}
            alt="teste"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div
          style={{
            borderLeft: "2px solid black",
            height: "80vh",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            height: "80vh",
            padding: "1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "sans-serif",
              color: "#000",
              fontSize: "40px",
            }}
          >
            Login
          </h2>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column" }}
          >
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
            <button
              type="submit"
              style={{
                marginTop: "30px",
                height: "40px",
                width: "20rem",
                borderRadius: "8px",
                border: "none",
              }}
            >
              Entrar
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p
            style={{
              marginTop: "20px",
              color: "#000",
              fontSize: "16px",
              fontFamily: "sans-serif",
            }}
          >
            Não tem login?{" "}
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/register")}
            >
              Cadastre-se
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
