import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, HandleLogout } from "./features/components/CheckAuth";
import "./features/common/Common.module.css";
import Home from "./pages/Home";
import AnyUserFeed from "./features/anyUserFeed/anyUserFeed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

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
        >
          <Route path="/:id" element={<AnyUserFeed />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<HandleLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
