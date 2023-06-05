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
  NewSale,
  Clients,
  PlanesInternet,
  ImClients,
  Administration,
} from './pages'
import Protected from './protectRoute/Protected'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/*  <Route
          path="/usuarios"
          element={
            <Protected>
              <Users />
            </Protected>
          }
        />
        <Route
          path="/consultas"
          element={
            <Protected>
              <Inquiries />
            </Protected>
          }
        />*/}
        <Route
          path="/ventas"
          element={
            <Protected>
              <NewSale />
            </Protected>
          }
        /> 
        <Route
          path="/clientes"
          element={
            <Protected>
              <Clients />
            </Protected>
          }
        />
        <Route
          path="/planes-internet"
          element={
            <Protected>
              <PlanesInternet />
            </Protected>
          }
        />
        <Route path="/import" element={<ImClients />} />
        <Route path="/administracion" element={<Administration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
