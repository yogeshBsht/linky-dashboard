import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storageService } from "../storage/storage";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Publicroute({ linkURL }) {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState("Loading");

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
      "http://localhost:5000/" + username + "/" + linkname,
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