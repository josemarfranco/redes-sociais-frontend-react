import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, HandleLogout } from "./features/components/CheckAuth";
import "./features/common/Common.module.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<HandleLogout />} />
      </Routes>
    </Router>
  );
}
