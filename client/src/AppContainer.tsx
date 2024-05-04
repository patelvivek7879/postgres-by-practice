import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';
import { useEffect } from 'react';
import Landing from './pages/Landing';
import Feedbacks from './pages/Feedbacks';
import { useAuthContext } from './AuthProvider';
import { isEmpty } from 'lodash';
import UserProfile from './pages/UserProfile';

const AppContainer = ({setThemeVal}: any) => {
  const navigate = useNavigate();

  const { loggedInUser }: any = useAuthContext();
  

  // useEffect(() => {
  //   if (!isEmpty(loggedInUser)) {
  //     navigate('/home');
  //   }
  // }, [loggedInUser]);

  return (
    <Routes>
        <Route path="/" element={ <Landing setThemeVal={setThemeVal} loggedInUser={loggedInUser}/>} />
        <Route path="/register" element={  <Register />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/home" element={ loggedInUser && <Home setThemeVal={setThemeVal} loggedInUser={loggedInUser} />} />
        <Route path="/:username/profile" element={ loggedInUser && <UserProfile setThemeVal={setThemeVal} loggedInUser={loggedInUser} />} />
        <Route path="/admin/feedbacks" element={ loggedInUser && <Feedbacks setThemeVal={setThemeVal} loggedInUser={loggedInUser} />} />
    </Routes>
  )
}

export default AppContainer;