import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { useEffect, useState } from 'react';
import Landing from './pages/Landing';

const AppContainer = ({setThemeVal}: any) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() =>{
    fetch('/api/v1/user/profile').then((response) => {
      return response.json();
    })
    .then((jsonRes)=>{
      console.log(jsonRes)

      if((jsonRes.status === 401 || jsonRes.message === 'Unauthorized') && location.pathname !== '/'){
        navigate('/login')
      }
      localStorage.setItem('userProfile', JSON.stringify(jsonRes?.user))
      setLoggedInUser(jsonRes.user);
    })
    .catch((error) => {
      console.log('error', error)
    })
  },[]);

  return (
    <Routes>
        <Route path="/" element={ <Landing setThemeVal={setThemeVal}/>} />
        <Route path="/register" element={  <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/home" element={ loggedInUser && <Home setThemeVal={setThemeVal} />} />
    </Routes>
  )
}

export default AppContainer;