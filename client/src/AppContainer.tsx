import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';

const AppContainer = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default AppContainer;