import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import backgroundImage from "../assets/cover 1.png";
import Fuse from "fuse.js";

interface User {
  name: string;
}

interface Job {
  job_title: string;
  employer_name: string;
  job_location: string;
  job_apply_link: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

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

  const fetchJobs = async () => {
    if (!search) return;

    setLoading(true);
    try {
      const response = await api.get("jobs?query=developer");
      const jobData = response.data.data || [];

      const fuse = new Fuse(jobData, {
        keys: ["job_title", "employer_name", "job_location"],
        threshold: 0.3,
      });

      const result = fuse.search(search);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFilteredJobs(result.map((item: { item: any }) => item.item));
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchJobs();
    }
  };

  return (
    <div style={{ width: "100rem", height: "100vh" }}>
      <div
        style={{
          height: "10vh",
          backgroundColor: "#0A65CC",
          display: "flex",
          justifyContent: "flex-end",
          padding: "5px 5px 5px 5px",
          alignItems: "center",
        }}
      >
        <button onClick={handleLogout} style={{ height: "5vh" }}>
          Sair
        </button>
      </div>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "60vh",
          height: "20vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          color: "#fff",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            fontFamily: "sans-serif",
            width: "60rem",
            paddingLeft: "20px",
          }}
        >
          Bem-vindo, {user ? user.name : "Usuário"}
        </h2>
        <h2
          style={{
            fontSize: "40px",
            fontFamily: "sans-serif",
            width: "60rem",
            paddingLeft: "20px",
            color: "#0A65CC",
          }}
        >
          Encontre um emprego que atenda aos seus interesses e habilidades.
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Procure por novas vagas</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Digite o cargo ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: "10px",
              width: "600px",
              border: "2px solid #D9D9D9",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          />
          <button onClick={fetchJobs} style={{ padding: "10px 20px" }}>
            Buscar
          </button>
        </div>

        <div
          style={{
            marginTop: "20px",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {loading ? (
            <p>Carregando vagas...</p>
          ) : (
            filteredJobs.map((job, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "5px",
                  width: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3>{job.job_title}</h3>
                <p>{job.employer_name}</p>
                <p>{job.job_location}</p>
                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver vaga
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
