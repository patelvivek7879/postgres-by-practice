import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Feedbacks from './pages/Feedbacks';
import AuthProvider, { useAuthContext } from './AuthProvider';
import { isEmpty } from 'lodash';

const AppContainer = ({setThemeVal}: any) => {
  const navigate = useNavigate();

  const { loggedInUser }: any = useAuthContext();
  

  useEffect(() => {
    if (!isEmpty(loggedInUser)) {
      navigate('/home');
    }
  }, [loggedInUser]);

  // useEffect(() =>{
  //   fetch('/api/v1/user/profile').then((response) => {
  //     return response.json();
  //   })
  //   .then((jsonRes)=>{
  //     if((jsonRes.status === 401 || jsonRes.message === 'Unauthorized') && location.pathname !== '/'){
  //       navigate('/login')
  //     }
  //     localStorage.setItem('userProfile', JSON.stringify(jsonRes?.user))
  //     setLoggedInUser(jsonRes.user);
  //   })
  //   .catch((error) => {
  //     console.log('error', error)
  //   })

  //   return ()=>{
  //     setLoggedInUser(null);
  //   }
  // },[]);

  return (
    <AuthProvider>
    <Routes>
        <Route path="/" element={ <Landing setThemeVal={setThemeVal} loggedInUser={loggedInUser}/>} />
        <Route path="/register" element={  <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/home" element={ loggedInUser && <Home setThemeVal={setThemeVal} loggedInUser={loggedInUser} />} />
        <Route path="/admin/feedbacks" element={ loggedInUser && <Feedbacks setThemeVal={setThemeVal} loggedInUser={loggedInUser} />} />
    </Routes>
    </AuthProvider>
  )
}

export default AppContainer;