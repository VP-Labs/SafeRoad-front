import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './utils/context/auth.jsx'
import PrivateRoute from './pages/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Questionnaire from './pages/Questionnaire'
import Error from './pages/Error'
import './App.css'



function App() {

  return (
    <>
      <Router>
          <AuthProvider>
	      <Routes>
	          <Route path="/login" element={<Login />} />
	          <Route path="/signup" element={<Signup />} />
	          <Route element={<PrivateRoute />}>
	              <Route path="/" element={<Home />} />
	              <Route path="/questionnaire" element={<Questionnaire />} />
	          </Route>
	          <Route path="*" element={<Error />} />
	      </Routes>
          </AuthProvider>
      </Router>
    </>
  )
}

export default App
