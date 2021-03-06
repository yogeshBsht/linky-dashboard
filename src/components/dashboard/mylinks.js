import { useState, useEffect } from "react";
import { storageService } from "../../storage/storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Linkreport from "./linkreport";
import { Link } from "react-router-dom";

export default function Mylinks({ linkURL }) {
  const [links, setLinks] = useState([]);
  const [msg, setMsg] = useState("Loading");
  const { REACT_APP_HOME_PAGE, REACT_APP_ROOT_PATH, REACT_APP_API_URL } = process.env;

  const username = storageService.getToken();

  let row_no = 0;
  const headers = {
    "x-auth-user": username,
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/mylinks`, {
        headers: headers,
      })
      .then((response) => {
        // converts object of objects to array of objects
        return Object.values(response.data);
      })
      .then((data) => {
        setMsg("Links fetched successfully");
        setLinks(data);
      });
  }, []);

  return (
    <div className="mx-auto">
      <Alert variant="info">{msg}</Alert>
      <div className="login-wrapper">
        <h2>My Links Page</h2>
      </div>
      <table className="table table-bordered" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th scope="col"> S.No.</th>
            <th scope="col">Linkname</th>
            <th scope="col">Link URL</th>
            <th scope="col">Description</th>
            <th scope="col">Unique Visitors</th>
            <th scope="col">View Traffic Report</th>
          </tr>
        </thead>
        <tbody>
          {links.map((data) => {
            return (
              <tr>
                <td scope="row">{++row_no}</td>
                <td>{data.link_name}</td>
                <td>
                  {`${REACT_APP_HOME_PAGE}${data.link_url}`}
                </td>
                <td>{data.description}</td>
                <td>{data.unique_visitor_count}</td>
                <td>
                  <Link to={`${REACT_APP_ROOT_PATH}/linkreport/${data.id}`} element={<Linkreport />}>
                    Report-{data.id}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
