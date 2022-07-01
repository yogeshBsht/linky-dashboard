import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storageService } from "../storage/storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Publicroute({ linkURL }) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState("Loading");
  const { REACT_APP_API_URL } = process.env;

  let { username, linkname } = useParams();

  const fetchData = async () => {
    let clientIP = await axios.get(" https://api.country.is");
    const clientID = storageService.getClientId();
    const headers = {
      "x-client-id": clientID,
      "x-client-IP": clientIP.data.ip,
      "x-client-country": clientIP.data.country,
    };
    await axios.get(
      `${REACT_APP_API_URL}/${username}/${linkname}`,
      {
        headers: headers,
      }
    );
  };

  useEffect(() => {
    fetchData()
      .then((res) => {
        // setCountryItems(res)
        setMsg("Visit recorded");
        // setLoading(false);
        console.log("recorded")
      })
      .catch((e) => {
        // setLoading(false);
        setHasError(true);
        setMsg("Request Failed");
        console.log(e.message);
      });
  }, []);

  return (
    <div className="row">
      <Alert variant="info">{msg}</Alert>
      <div className="login-wrapper">
        {(hasError) && (<h2>Error 404: Entered URL is unavailable.</h2>)}
        {(!hasError) && (<h2>Thanks for visiting!</h2>)}
      </div>
    </div>
  );
}