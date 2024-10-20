import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.jsx'
import { DatasContext } from '../context/datas.jsx'





// AUTHENTIFICATION

export const useAuth = () => {
  return useContext(AuthContext);
};

// ALL DATAS
export const useDatas = () => {
  return useContext(DatasContext);
};
