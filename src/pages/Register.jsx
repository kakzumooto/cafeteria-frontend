// src/pages/Register.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevoUsuario = {
      email: email,
      password: password,
      rol: 'ROLE_USER'
    }

    try {
      console.log("Enviando datos:", nuevoUsuario)

      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      })

      if (response.ok) {
        setMensaje('¡Cuenta creada con éxito! Redirigiendo al Login...')
        setTimeout(() => {
          navigate('/login') 
        }, 1500)
      } else {

        const errorData = await response.text() 
        console.error("Error del servidor:", errorData)
        setMensaje('Error al registrarse. Revisa la consola.')
      }
    } catch (error) {
      console.error(error)
      setMensaje('Error de conexión')
    }
  }

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 className="titulo-principal">Crear Cuenta</h2>
      
      <form onSubmit={handleSubmit} className="producto-card">
        
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
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
          Registrarse
        </button>

        {mensaje && <p style={{ marginTop: '15px', color: mensaje.includes('Error') ? 'red' : 'green' }}>{mensaje}</p>}
        
        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default Register