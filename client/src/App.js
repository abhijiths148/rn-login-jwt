import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    async function getAuthToken(token) {
      await axios
        .get("http://localhost:3001/isUserAuth", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.data.auth) {
            setAuthToken(token);
          } else {
            localStorage.removeItem("token");
            setAuthToken(null);
          }
        })
        .catch((err) => {
          console.log(err);
          setAuthToken(null);
          localStorage.removeItem("token");
        });
    }
    const token = localStorage.getItem("token");
    if (token) {
      getAuthToken(token);
    }
  }, []);

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
