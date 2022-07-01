import React, { useState, useEffect } from "react";
import { storageService } from "../../storage/storage";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from 'react-bootstrap/Alert';

// class App extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state={
//         visible : false
//       }
//     }
  
//     onShowAlert = ()=>{
//       this.setState({visible:true},()=>{
//         window.setTimeout(()=>{
//           this.setState({visible:false})
//         },5000)
//       });
//     }
// }

export default function Createlink({ linkURL }) {
  const [linkname, setLinkname] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState("");
  const username = storageService.getToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side field validation

    setMsg("");
    const data = {
      link_name: linkname,
      link_description: description,
    };
    const headers = {
      "x-auth-user": username,
    };
    const response = axios
      .post("http://localhost:5000/create_link", data, {
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

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const username = storageService.getToken();
  //     const headers = {
  //       "x-auth-user": username,
  //     };
  //     const response = await axios.post("http://localhost:5000/create_link", {
  //       headers: headers,
  //     });
  //     if (!response.ok) {
  //       throw new Error("Data could not be fetched!");
  //     } else {
  //       return response.json();
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData()
  //       .then((res) => {
  //         // setCountryItems(res)
  //         setMsg("Hello, user");
  //         console.log(msg);
  //         setLoading(false);
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //         setHasError(true);
  //         setMsg(e.message);
  //         console.log(e.message);
  //       });
  //   }, []);

  return (
    <div className="row">
        <Alert variant='info'>
          {msg}
        </Alert>
      {/* <h2 className="mb-3">{msg}</h2>( */}
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
            `${REACT_APP_HOME_PAGE}/{username}/{linkname}`
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
