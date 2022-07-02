import { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import { storageService } from "../../storage/storage";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";


// loginUser calls the API for authN
async function loginUser(credentials) {
  const { REACT_APP_API_URL } = process.env;
  return fetch(`${REACT_APP_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json())
    .then((res) => res.token)
    .catch((err) => alert(err.response.data));
}

// Login handles the submission of credentials using loginUser, sets token & renders the form
export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "") {
      setHasError(true);
      setErrMessage("User name can not be empty");
      return;
    }
    if (password === "") {
      setHasError(true);
      setErrMessage("Password can not be empty");
      return;
    }
    const token = await loginUser({
      username,
      password,
    });

    if (token === username) {
      console.log(token);
      setToken(token); // stores token in JS memory
      storageService.saveToken(username);
    } else {
      setHasError(true);
      setErrMessage("Invalid username or password");
    }
  };

  return (
    <div className="mx-auto">
      <Alert variant="info">{errMessage}</Alert>
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
          <div></div>
        </Form>
      </div>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
