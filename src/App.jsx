// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div className="tienda-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/carrito" element={<h2>Aquí irá el Carrito</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App