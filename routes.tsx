import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/pages/login";
import Home from "./src/pages/home";
import PrivateRoute from "./src/components/privateRoute";
import Register from "./src/pages/register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
