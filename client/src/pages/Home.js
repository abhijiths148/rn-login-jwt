import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Item, Grid } from "./../components/Home";
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

  return (
    <div className="App">
      <h1>Citites</h1>
      <Grid>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
      </Grid>
    </div>
  );
}

export default Home;
