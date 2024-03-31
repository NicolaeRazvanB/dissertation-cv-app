import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route exact path="/" element={userInfo ? <Home /> : <Register />} />
        <Route
          path="/login"
          element={userInfo ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={userInfo ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
