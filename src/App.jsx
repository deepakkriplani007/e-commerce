import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { auth } from "./auth/firebase";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
function App() {
  const [userName, setUserName] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user);
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={userName ? <Home user={userName} /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart user={userName} />} />
          <Route
            path="/productdetail/:id"
            element={<ProductDetail user={userName} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
