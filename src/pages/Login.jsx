// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' 
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    

    const loginData = {
      email: email,
      password: password
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      if (response.ok) {
        const data = await response.json()
        setMensaje('¡Login exitoso! 🔓')
        
      
        localStorage.setItem('token', data.token) 
        
        localStorage.setItem('email', email) 

        if (data.rol) {
            localStorage.setItem('role', data.rol)
        } else {
           
            localStorage.removeItem('role') 
        }

        console.log("Datos guardados:", email, data.token)
        
     
        setTimeout(() => {
          window.location.href = '/'
        }, 1000)

      } else {
        setMensaje('Error: Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error:', error)
      setMensaje('Error de conexión con el servidor')
    }
  }

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 className="titulo-principal">Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit} className="producto-card">
        <div style={{ marginBottom: '15px' }}>
          <label>Email o Usuario:</label>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>

        <button type="submit" className="btn-agregar" style={{ width: '100%' }}>
          Ingresar
        </button>

        {mensaje && <p style={{ marginTop: '15px', color: mensaje.includes('Error') ? 'red' : 'green' }}>{mensaje}</p>}

        <p style={{ marginTop: '20px', fontSize: '0.9rem', textAlign: 'center' }}>
          ¿No tienes cuenta? <Link to="/register" style={{color: '#d35400', fontWeight: 'bold'}}>Regístrate aquí</Link>
        </p>

      </form>
    </div>
  )
}

export default Login