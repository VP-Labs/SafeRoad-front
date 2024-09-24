import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.jsx'





// AUTHENTIFICATION

export const useAuth = () => {
  return useContext(AuthContext);
};
