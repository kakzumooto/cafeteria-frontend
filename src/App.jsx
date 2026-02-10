// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import './App.css'
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div className="tienda-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          
          <Route path="/login" element={<Login />} />
          
          <Route path="/mis-compras" element={<Orders />} />

          <Route path="/carrito" element={<Cart />} />

          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App