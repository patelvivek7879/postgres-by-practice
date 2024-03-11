import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Landing from './pages/Landing';

const AppContainer = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  useEffect(() =>{
    fetch('/api/v1/user/profile').then((response) => {
      return response.json();
    })
    .then((jsonRes)=>{
      console.log(jsonRes)
      localStorage.setItem('userProfile', JSON.stringify(jsonRes?.user))
      setLoggedInUser(jsonRes.user);
    })
    .catch((error) => {
      console.log('error', error)
    })
  },[]);

  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default AppContainer;