import './App.css'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from '../src/Pages/Dashboard'
import Doctors from '../src/Pages/Doctors'
import Patients from '../src/Pages/Patients'
// import Nurses from './Component/nurses'
import Nurses from '../src/Pages/Nurses'
import WardBoys from '../src/Pages/WardBoys'
import Department from '../src/Pages/Department'
import Guards from '../src/Pages/Guards'

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
            <Route path="/wardboys" element={<WardBoys />} />
            <Route path="/department" element={<Department />} />
            <Route path="/guards" element={<Guards />} />
            {/* <Route path="users" element={<Users />} /> */}
          {/* </Route> */}
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
