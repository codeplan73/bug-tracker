import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Homepage, Login, Register, Dashboard} from './pages'
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App