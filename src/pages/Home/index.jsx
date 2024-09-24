import styled from 'styled-components'
import React, { useEffect } from "react";
import { useAuth } from "../../utils/hooks/index.jsx";





const Home = () => {
  const auth = useAuth();
  return (
      <div>
        <h1>Welcome! </h1>
        <LogoutButton onClick={() => auth.logOut()}>
          logout
        </LogoutButton>
      </div>
  );
};









// CSS ----------------------------------------------------------------------------

const LogoutButton = styled.button`
  background-color: #ff4b4b; /* Couleur de fond */
  color: white; /* Couleur du texte */
  border: none; /* Supprimer la bordure */
  padding: 10px 20px; /* Espacement interne (padding) */
  font-size: 16px; /* Taille du texte */
  border-radius: 5px; /* Bords arrondis */
  cursor: pointer; /* Changement du curseur au survol */
  transition: background-color 0.3s ease; /* Animation pour un effet de transition */

  &:hover {
    background-color: #e60000; /* Couleur plus foncée au survol */
  }
`;






export default Home;

