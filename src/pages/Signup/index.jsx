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

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      formErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      formErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccountCreated(false);
    
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const result = await auth.signupAction(formData);
      if(result === false) {
        setErrors({ general: "Formulaire incorrect." });
      } else {
        setAccountCreated(true);
        setErrors({});
      }
    }
  };
  
  const handleClickButton = async (e) => {
    e.preventDefault();
    navigate("/login");
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
              Inscription
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
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              {errors.general && <Alert severity="error" sx={{ mt: 2 }}>{errors.general}</Alert>}
              {accountCreated && <Alert severity="success" sx={{ mt: 2 }}>VOUS AVEZ CRÉÉ UN COMPTE AVEC SUCCÈS!</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
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
            Revenir à la page Login
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
}