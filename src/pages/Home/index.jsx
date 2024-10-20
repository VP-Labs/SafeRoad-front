import styled from 'styled-components'
import React, { useEffect } from "react";
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";




const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  
  const handleButtonStartQuestions = async (e) => {
    e.preventDefault();
    navigate("/questionnaire");
  };
  
  
  return (
      <Container>
        <h1>Welcome! </h1>
        <QuestionnaireButton onClick={(e) => handleButtonStartQuestions(e)}>Commencez ou continuer une série ici.</QuestionnaireButton>
        <LogoutButton onClick={() => auth.logOut()}> logout </LogoutButton>
      </Container>
  );
};









// CSS ----------------------------------------------------------------------------

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-Width: 800px;
	border: 1px solid #ccc;
	border-radius: 10px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const QuestionnaireButton = styled.button`
	padding: 10px;
	font-size: 16px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	height: 80px;
`

const LogoutButton = styled.button`
  background-color: #ff4b4b; /* Couleur de fond */
  color: white; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 10px 20px; /* Espacement interne (padding) */
  font-size: 16px; /* Taille du texte */
  border-radius: 5px; /* Bords arrondis */
  cursor: pointer; /* Changement du curseur au survol */
  transition: background-color 0.3s ease; /* Animation pour un effet de transition */
  margin-top: 50px;
  height: 80px;

  &:hover {
    background-color: #e60000; /* Couleur plus foncée au survol */
  }
`;




export default Home;

