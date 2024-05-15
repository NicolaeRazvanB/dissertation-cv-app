import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProfile from "./pages/EditProfile.jsx";
import DeployedCVS from "./pages/DeployedCVS.jsx";
import AddCV from "./pages/AddCV.jsx";
import CV from "./pages/CV.jsx";
import EditCV from "./pages/EditCV.jsx";
import DeployCV from "./pages/DeployCV.jsx";
import LivePortfolio from "./pages/LivePortfolio.jsx";
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
        <Route
          path="/editProfile"
          element={userInfo ? <EditProfile /> : <Login />}
        />
        <Route
          path="/portfolios"
          element={userInfo ? <DeployedCVS /> : <Login />}
        />
        <Route path="/addCV" element={userInfo ? <AddCV /> : <Login />} />
        <Route path="/cv/:cvId" element={userInfo ? <CV /> : <Login />} />
        <Route
          path="/editCV/:cvId"
          element={userInfo ? <EditCV /> : <Login />}
        />
        <Route
          path="/deployCV/:cvId"
          element={userInfo ? <DeployCV /> : <Login />}
        />
        <Route path="/portfolios/:siteName" element={<LivePortfolio />} />
      </Routes>
    </>
  );
}

export default App;
