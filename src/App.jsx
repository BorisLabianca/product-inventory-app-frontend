import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Forgot from "./pages/Auth/Forgot";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset-password/:resetToken" element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
