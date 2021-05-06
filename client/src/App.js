import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth";
import "./App.css";

function App() {
  const [authToken, setAuthToken] = useState();

  // useEffect(() => {
  //   getToken();
  // }, [authToken]);

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  // const getToken = () => {
  //   const token = localStorage.getItem("token");
  //   console.log("here", authToken);
  //   setAuthToken(token);
  // };

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
