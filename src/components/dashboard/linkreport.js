import { useState, useEffect } from "react";
import { storageService } from "../../storage/storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import InfoCard from "../infocard";
import { useParams, Link } from "react-router-dom";
// import { Container } from "react-bootstrap";

export default function Linkreport({ linkURL }) {
  const [links, setLinks] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [msg, setMsg] = useState("Loading");
  const [visitorID, setVisitorID] = useState("");
  const { REACT_APP_ROOT_PATH, REACT_APP_API_URL } = process.env;

  const username = storageService.getToken();
  let { linkID } = useParams();
  let row_no = 0;
  const headers = {
    "x-auth-user": username,
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/link_info/${linkID}`, {
        headers: headers,
      })
      .then((response) => {
        // converts object of objects to array of objects
        return response.data;
      })
      .then((data) => {
        setMsg("Links fetched successfully");
        setLinks(data);
      })
      .catch((error) => {
        if (error.response) {
          setMsg("Link information unavailable for given link");
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/visitor_info/${linkID}`, {
        headers: headers,
      })
      .then((response) => {
        // converts object of objects to array of objects
        return Object.values(response.data);
      })
      .then((data) => {
        setMsg("Link report generated successfully");
        setVisitors(data);
      })
      .catch((error) => {
        if (error.response) {
          setMsg("Visitor information unavailable for given link");
        }
      });
  }, []);

  return (
    <div className="mx-auto">
      <Alert variant="info">{msg}</Alert>
      <div className="login-wrapper">
        <h2>Link Report</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <InfoCard
              title="Total Vistors"
              infoDescription="Total visits to the link"
              value={links.total_visitor_count}
            ></InfoCard>
          </div>
          <div className="col">
            <InfoCard
              title="Unique Vistors"
              infoDescription="Number of unique visitors of the link"
              value={links.unique_visitor_count}
            ></InfoCard>
          </div>
          <div className="col">
            <InfoCard
              title="Most visited country"
              infoDescription="Country with most visitors"
              value={links.most_visited_country}
            ></InfoCard>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col" style={{ textAlign: "center" }}>
            <h5>Visitors Table</h5>
            <Table bordered hover>
              <thead>
                <tr>
                  <th scope="col"> S.No.</th>
                  <th scope="col">Visitor id</th>
                  <th scope="col">Times Visited</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((data, row_no) => (
                  <tr>
                    <td scope="row">{++row_no}</td>
                    <td>
                      <Link
                        to={`${REACT_APP_ROOT_PATH}/linkreport/${data.link_id}`}
                        element={<Linkreport />}
                        onClick={() => {
                          setVisitorID(data.visitor_id);
                        }}
                      >
                        {data.visitor_id}
                      </Link>
                    </td>
                    <td>{data.total_visits}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="col" style={{ textAlign: "center" }}>
            <h5>Visitor Details</h5>
            <Table bordered hover>
              <thead>
                <tr>
                  <th scope="col">Visitor id</th>
                  <th scope="col">Times Visited</th>
                  <th scope="col">First Visit</th>
                  <th scope="col">Last Visit</th>
                  <th scope="col">Device</th>
                  <th scope="col">Browser</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map(
                  (data) =>
                    data.visitor_id === visitorID && (
                      <tr>
                        <td>{data.visitor_id}</td>
                        <td>{data.total_visits}</td>
                        <td>{data.first_visit}</td>
                        <td>{data.last_visit}</td>
                        <td>{data.device}</td>
                        <td>{data.browser}</td>
                        <td>{data.country}</td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
