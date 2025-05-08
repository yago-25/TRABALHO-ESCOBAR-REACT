import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginClients from './pages/LoginClients'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login/client" element={<LoginClients />} />
    </Routes>
  )
}
