import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './utils/context/auth.jsx'
import { DatasProvider } from './utils/context/datas.jsx'
import PrivateRoute from './pages/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Questionnaire from './pages/Questionnaire'
// import Error from './pages/Error'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material'

// Création d'un thème personnalisé avec un mode sombre
const theme = createTheme({
	palette: {
	  mode: 'dark',
	  primary: {
		main: '#2196f3', // Blue
	  },
	  secondary: {
		main: '#90caf9', // Light Blue
	  },
	  background: {
		default: '#000000',
		paper: '#0d47a1', // Dark Blue
	  },
	  text: {
		primary: '#ffffff',
		secondary: '#bdbdbd',
	  },
	},
  });


function App() {

  return (
    <>
	<ThemeProvider theme={theme}>
      <Router>
          <DatasProvider><AuthProvider>
	      <Routes>
	          <Route path="/login" element={<Login />} />
	          <Route path="/signup" element={<Signup />} />
	          <Route element={<PrivateRoute />}>
	              <Route path="/" element={<Home />} />
	              <Route path="/questionnaire" element={<Questionnaire />} />
	          </Route>
	          {/* <Route path="*" element={<Error />} /> */}
	      </Routes>
          </AuthProvider></DatasProvider>
      </Router>
	</ThemeProvider>
    </>
  )
}

export default App
