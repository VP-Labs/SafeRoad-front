import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#000000',
      paper: '#0d47a1',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }
    
    const result = await auth.loginAction({ email, password });
    if(result === false) {
      setErrorMessage('Identifiants incorrects.');
    } else {
      setEmail('');
      setPassword('');
      setErrorMessage('');
    }
  };
  
  const handleClickButton = async (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(to bottom left, #0d47a1, #000000)',
      }}>
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'rgba(13, 71, 161, 0.7)',
              p: 4,
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Connexion
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
              </Button>
            </Box>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleClickButton}
            sx={{ mt: 3 }}
          >
            Pas encore inscrit? Cliquez ici!
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}