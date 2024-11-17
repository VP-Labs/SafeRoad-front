import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Alert, useTheme, } from '@mui/material';
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";




export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const auth = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();



  const handleSubmit = async (event) => {
    event.preventDefault();
    document.activeElement.blur();

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
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: { xs: 'flex-start', sm :'center' }, alignItems: 'center', flexDirection: 'column', background: theme.palette.background.customBackground }}>
        <Container component="main" sx={{ marginTop: { xs: '100px', sm: '0px' }, mb: 2, width: { xs: '95%', sm: '360px', md: '360px', lg: '400px', xl: '430px' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: theme.palette.background.customPrimary, p: '7%', borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', }}>
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 600, }}> Connexion </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{  }}>
              <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email"  autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField margin="normal" required fullWidth name="password" label="Mot de passe" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <Alert severity="error"  sx={{ mt: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{errorMessage}</Alert>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 0 }}> Se connecter </Button>
            </Box>
          </Box>
          <Button fullWidth variant="contained" color="secondary" onClick={handleClickButton} sx={{ mt: 4 }}> Pas encore inscrit? Cliquez ici! </Button>
        </Container>
      </Box>
  );
}
