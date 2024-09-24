import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuth } from "../../utils/hooks/index.jsx";





function Login() {
  // Gestion des états des champs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const auth = useAuth();




  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page par défaut

    // Exemple de validation basique
    if (email === '' || password === '') {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    }

    // Login
    auth.loginAction({ email: email, password: password });

    // Réinitialisation du formulaire après soumission réussie
    setErrorMessage('');
    setEmail('');
    setPassword('');
    return;
  };
  



  return (
    <Container>
      <h2>Connexion</h2>
      <FormLogin onSubmit={handleSubmit}>
        {/* Champ email */}
        <FormGroup>
          <label>Email :</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
        </FormGroup>

        {/* Champ mot de passe */}
        <FormGroup>
          <label>Mot de passe :</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            required
          />
        </FormGroup>

        {/* Message d'erreur */}
        {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}

        {/* Bouton de soumission */}
        <FormButton type="submit">Se connecter</FormButton>
      </FormLogin>
    </Container>
  );
}







// CSS ----------------------------------------------------------------

const Container = styled.div`
	maxWidth: 400px;
	margin: 0 auto;
	padding: 20px;
	text-align: center;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const FormLogin = styled.form`
	display: flex;
	flex-direction: column;
`

const FormGroup = styled.div`
	margin-bottom: 15px;
`

const Input = styled.input`
	padding: 10px;
	font-size: 16px;
	width: 100%;
	box-sizing: border-box;
	border-radius: 5px;
	border: 1px solid #ccc;
`

const FormButton = styled.button`
	padding: 10px;
	font-size: 16px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`

const ErrorMsg = styled.p`
	color: red;
	margin-bottom: 10px;
`





export default Login;

