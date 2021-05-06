import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card, Input } from "../components/LoginRegisterForm";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: userName,
        password,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Registration</h1>
      <Card>
        <Form>
          <label>Username</label>
          <Input type="text" onChange={(e) => setUserName(e.target.value)} />
          <label>Password</label>
          <Input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button onClick={register}>Register</Button>
        </Form>
      </Card>
      <Link to="/login">Already have an account?</Link>
    </div>
  );
}

export default Register;
