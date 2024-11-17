import React, { useState } from 'react';
import { useTheme, Box, Typography, Container, TextField, Button, Alert, } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    document.activeElement.blur();
    
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const result = await auth.signupAction(formData);
      if(result === false) {
        setErrors({ general: "Formulaire incorrect." });
      } else {
      	setFormData({ email: '', password: '' });
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
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: { xs: 'flex-start', sm :'center' }, alignItems: 'center', flexDirection: 'column', background: theme.palette.background.customBackground, }}>
        <Container component="main" sx={{ marginTop: { xs: '100px', sm: '0px' }, mb: 2, width: { xs: '95%', sm: '360px', md: '360px', lg: '400px', xl: '430px' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: theme.palette.background.customPrimary, p: '7%', borderRadius: 2, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', }}>
            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 600, }}> Inscription </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{  }}>
              <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
              <TextField margin="normal" required fullWidth name="password" label="Mot de passe" type="password" id="password" autoComplete="new-password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />              
              {errors.general &&  <Alert severity="error"  sx={{ mt: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{errors.general}</Alert>}           
              {accountCreated &&  <Alert severity="success" sx={{ mt: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}> Compte créé avec succès! </Alert>}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 0 }} > S'inscrire </Button>
            </Box>
          </Box>
          <Button fullWidth variant="contained" color="secondary" onClick={handleClickButton} sx={{ mt: 4 }}> Revenir à la page Login </Button>
        </Container>
      </Box>
  );
}
