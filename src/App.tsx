import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { storageService } from "./storage/storage";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Createlink from "./components/dashboard/createlink";
import Mylinks from "./components/dashboard/mylinks";
import Linkreport from "./components/dashboard/linkreport";
import Publicroute from "./components/publicroute";
import NotFound from "./components/NotFound";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function isLinkyURL() {
  // update count or create new visitor
  let path = window.location.pathname.split("/");
  if (path.length === 3) {
    return true;
  }
  return false;
}

export default function App() {
  const { REACT_APP_ROOT_PATH } = process.env;
  
  // returns the token from local storage & render Login if no token
  const [token, setToken] = useState(storageService.getToken());

  let isLoggedIn = storageService.isLoggedIn();

  if (isLinkyURL()) {
    let clientID = storageService.getClientId();
  }
  return (
    <div className="wrapper">
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={`${REACT_APP_ROOT_PATH}/`}>Linky-App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={`${REACT_APP_ROOT_PATH}/create_link`}>Create Link</Nav.Link>
            <Nav.Link href={`${REACT_APP_ROOT_PATH}/mylinks`}>My Links</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn == false && <Nav.Link href={`${REACT_APP_ROOT_PATH}/`}>Sign In</Nav.Link>}
            {isLoggedIn == true && (
              <Nav.Link
                onClick={() => storageService.saveToken("")}
                href={`${REACT_APP_ROOT_PATH}/`}
              >
                Sign Out
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path={`${REACT_APP_ROOT_PATH}/`} element={(isLoggedIn==true) ? <Dashboard linkURL={undefined}/> : <Login setToken={setToken} />}/>
          <Route path={`${REACT_APP_ROOT_PATH}/create_link`} element={(isLoggedIn==true) ? <Createlink linkURL={undefined} /> : <Login setToken={setToken} />}/>
          <Route path={`${REACT_APP_ROOT_PATH}/mylinks`} element={(isLoggedIn==true) ? <Mylinks linkURL={undefined} /> : <Login setToken={setToken} />}/>    
          <Route path={`${REACT_APP_ROOT_PATH}/linkreport/:linkID`} element={(isLoggedIn==true) ? <Linkreport linkURL={undefined} /> : <Login setToken={setToken} />}/>
          <Route path={`${REACT_APP_ROOT_PATH}/:username/:linkname`} element={<Publicroute linkURL={undefined} />}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
