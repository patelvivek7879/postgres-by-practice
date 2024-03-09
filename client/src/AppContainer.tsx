import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { useEffect } from 'react';

const AppContainer = () => {
  
  useEffect(() =>{
    fetch('/api/v1/user/profile').then((response) => {
      return response.json();
    })
    .then((jsonRes)=>localStorage.setItem('userProfile', JSON.stringify(jsonRes.user)))
    .catch((error) => {
      console.log('error', error)
    })
  },[]);

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default AppContainer;