import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./src/pages/login";
import Home from "./src/pages/home";
import PrivateRoute from "./src/components/privateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
