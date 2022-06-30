import { useState } from 'react';
import { storageService } from '../../storage/storage';

export default function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
//   };
  const [token, setToken] = useState(storageService.getToken());
//   storageService.saveToken() 

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}