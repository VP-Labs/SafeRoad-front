import React, { useState } from 'react';
import styled from 'styled-components'
import { useAuth } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";





function Questionnaire() {
  
  const auth = useAuth();
  const navigate = useNavigate();

  

  return (
    <Container>
      <h2>Ceci est la page de Questionnaire</h2>
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
`;



export default Questionnaire;

