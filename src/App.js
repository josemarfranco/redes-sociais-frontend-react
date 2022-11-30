import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/HomePage'
import Login from './pages/Login/LoginPage'
import Register from './pages/Register/RegisterPage'
import checkAuth from'./pages/components/CheckAuth'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={checkAuth() ? <Home/> : <Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={checkAuth() ? <Home/> : <Login/>}/> 
      </Routes>
    </Router>
  )
}