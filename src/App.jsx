import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Crud from './sections/Crud'
import Cart from './pages/Cart'
import Productos from './pages/Productos'
import ProtectedRoute from './components/ProtectedRoute';  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        
        {/* Ruta protegida: solo admin puede acceder */}
        <Route path="/Crud" element={<ProtectedRoute><Crud /></ProtectedRoute>} />
        
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Productos" element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;
