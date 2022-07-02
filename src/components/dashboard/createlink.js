import { useState, useEffect } from "react";
import { storageService } from "../../storage/storage";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from 'react-bootstrap/Alert';

export default function Createlink({ linkURL }) {
  const [linkname, setLinkname] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const username = storageService.getToken();
  const { REACT_APP_HOME_PAGE, REACT_APP_API_URL } = process.env;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      link_name: linkname,
      description: description,
    };
    const headers = {
      "x-auth-user": username,
    };
    const response = axios
      .post(`${REACT_APP_API_URL}/create_link`, data, {
        headers: headers,
      })
      .then((response) => {
        // check if received an OK response, throw error if not
        console.log(response);
        if (response) {
          setMsg("Link created successfully");
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((jsonData) => {
        console.log("Successful", jsonData);
      })
      .catch((errors) => {
        // If error was thrown then unpack here and handle in component/app state
        if (typeof errors.response !== "undefined") {
          setMsg(errors.response.data.message);
        }
      });
  };

  return (
    <div className="row">
        <Alert variant='info'>
          {msg}
        </Alert>
      <div className="login-wrapper">
        <h2>Create Link Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Username:
            </Form.Label>
            <Col sm={9}>
              <Form.Control placeholder={username} disabled />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Linkname:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Linkname"
                onChange={(e) => setLinkname(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Link description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Label htmlFor="basic-url">Your URL:</Form.Label>
          <InputGroup xs="auto" className="mb-3">
            <InputGroup.Text id="basic-addon3">
            {`${REACT_APP_HOME_PAGE}/${username}/${linkname}`}
            </InputGroup.Text>
          </InputGroup>
          <Button variant="primary" type="submit">
            Create Link
          </Button>
          <div></div>
        </Form>
      </div>
      {/* ); */}
    </div>
  );
}
