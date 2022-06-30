import React, { useState, useEffect } from 'react'
import Alert from "react-bootstrap/Alert";
import { storageService } from "../../storage/storage";

export default function Dashboard({linkURL}) {
  const [countryItems, setCountryItems] = useState([])
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState("Loading");
  const username = storageService.getToken();

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/dashboard')
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } 
    else {
      return response.json()
    }
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        // setCountryItems(res)
        setMsg('Logged In')
        console.log(msg)
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setHasError(true)
        setMsg(e.message)
      })
  }, [])

  return (
    <div className="row">
      <Alert variant="info">{msg}</Alert>
      <div className="login-wrapper">
        <h2>Hello, {username}. Welcome to Linky-App.</h2>
      </div>
    </div>
  )
}