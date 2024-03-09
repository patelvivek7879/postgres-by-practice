import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import Register from './components/Register';

const AppContainer = () => {
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