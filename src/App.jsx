import './App.css'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/dashbord'
import Doctors from './Component/doctor/Doctors'
import Patients from './Component/patients/Patients'
// import Nurses from './Component/nurses'
import Nurses from './Component/nurses/Nurses'

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route element={<DashboardLayout />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/nurses" element={<Nurses />} />
            <Route path="/patients" element={<Patients />} />
            {/* <Route path="users" element={<Users />} /> */}
          {/* </Route> */}
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
