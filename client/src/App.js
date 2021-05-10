import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

function App() {
  debugger;
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    setAuthToken(token);
  }, []);

  // const setToken = (data) => {
  //   localStorage.setItem("token", data);
  //   setAuthToken(data);
  // };

  // const getToken = () => {
  //   const token = localStorage.getItem("token");
  //   console.log("here", authToken);
  //   setAuthToken(token);
  // };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
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
