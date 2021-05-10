import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Item, Grid } from "./../components/Home";
import axios from "axios";

function Home() {
  const { authToken } = useAuth();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getCities", {
        headers: {
          "x-access-token": authToken,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setCities(res.data.cities);
        } else {
          setCities([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  if (!authToken) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="App">
      <h1>Citites</h1>
      <Grid>
        {cities.map((city) => (
          <Item>{city.name}</Item>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
