import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { getAuthToken, authToken } = useAuth();

//   useEffect(() => {
//     userAuthenticated();
//   }, []);

  const userAuthenticated = () => {
    // getAuthToken();
    if (!authToken) {
      setIsLoggedIn(false);
    }
    console.log(authToken);
    axios
      .get("http://localhost:3001/isUserAuth", {
        headers: {
          "x-access-token": authToken,
        },
      })
      .then((response) => {
        if (!response.data.auth) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
  };

//   if (!isLoggedIn) {
//     return <Redirect to="/login" />;
//   }

  return <div>Home page</div>;
}

export default Home;
