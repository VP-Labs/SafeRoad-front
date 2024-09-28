import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";





function Signup() {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [accountCreated, setAccountCreated] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validation basique pour les champs
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

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccountCreated(false);
    
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) { ; } 
    else {
      // Envoyer les données au serveur
      var resultat = await auth.signupAction(formData);
      if(resultat == false) { formErrors.general = "formulaire incorrect."; }
      else { setAccountCreated(true); } 
    }
    setErrors(formErrors);
  };
  
  const handleClickButton = async (e) => {
    e.preventDefault();
    navigate("/login");
  };
  

  return (
    <div>
    <DivContainer>
      <h2>Inscription</h2>
      <FormSignup onSubmit={handleSubmit}>
        
        <DivGroupForm>
          <label htmlFor="email">Email</label>
          <InputSignup
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <PerrorMessage>{errors.email}</PerrorMessage>}
        </DivGroupForm>
        
        <DivGroupForm>
          <label htmlFor="password">Mot de passe</label>
          <InputSignup
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <PerrorMessage>{errors.password}</PerrorMessage>}
        </DivGroupForm>

        <ButtonSignup type="submit">S'inscrire</ButtonSignup>
        
        {errors.general && <PerrorMessage>{errors.general}</PerrorMessage>}
        
      </FormSignup>
      
      {accountCreated && <PSuccessMessage>VOUS AVEZ CREE UN COMPTE AVEC SUCCES!</PSuccessMessage>}
    </DivContainer>
    <ButtonRedirect onClick={handleClickButton}>Revenir à la page Login</ButtonRedirect>
    </div>
  );
}







// CSS with Styled Components ---------------------------------------------------------------------------------------------------

const DivContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const FormSignup = styled.form`
  display: flex;
  flex-direction: column;
`;

const DivGroupForm = styled.div`
  margin-bottom: 15px;
`;

const InputSignup = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonSignup = styled.button`
  padding: 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PerrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const PSuccessMessage = styled.p`
  color: green;
  font-size: 1.1rem;
`;


const ButtonRedirect = styled.button`
  padding: 10px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;


export default Signup;

