import './App.scss'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
  Switch,
  Outlet,
} from 'react-router-dom'
import {
  Users,
  Inquiries,
  Login,
  NewSale
} from './pages'
import Protected from './protectRoute/Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={
          <Protected >
            <Users />
          </Protected>
        } />
        <Route path="/consultas" element={
          <Protected >
            <Inquiries />
          </Protected>
        } />
          <Route path="/nueva-venta" element={
          <Protected >
            <NewSale />
          </Protected>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
