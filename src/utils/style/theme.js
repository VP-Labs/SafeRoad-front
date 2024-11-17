import React from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';



// Création d'un thème personnalisé avec un mode sombre
var theme = createTheme({
	breakpoints: {
        values: {
			xs: 0,     // Extra-small
			sm: 600,   // Small
			md: 900,   // Medium
			lg: 1200,  // Large
			xl: 1536,  // Extra-large
		},
	  },
  
  
	palette: {
	  mode: 'dark',
	  primary: {
		main: '#2196f3', // Blue
	  },
	  secondary: {
		main: '#90caf9', // Light Blue
	  },
	  background: {
		default: '#ad47a1',
		paper: '#0d47a1', // Dark Blue
		customBackground: 'linear-gradient(to bottom left, #0d47a1, #000000)',
		customPrimary: 'rgba(13, 71, 161, 0.7)',
	  },
	  text: {
		primary: '#ffffff',
		secondary: '#bdbdbd',
	  },  
	},

	
  	
  	
  	components: {
		MuiContainer: {
		  defaultProps: {
		    maxWidth: false, // Désactive la largeur maximale par défaut
		    disableGutters: true,
		  },
		  styleOverrides: {
		    root: {
		      maxWidth: '100%',
		      width: '100%', // S'assure que le conteneur prend 100% de la largeur de son parent
		      // Si tu veux un padding spécifique pour tous les écrans :
		      paddingLeft: 0,
		      paddingRight: 0,
		    },
		  },
		},
		MuiBox: {
		  styleOverrides: {
		    root: {
		      // Supprime les styles par défaut, tu peux ajouter ici d'autres styles si nécessaire
		      display: 'block', // Définit le display par défaut, change à 'flex' ou autre si nécessaire
		      padding: '0', // Fixe le padding à 0 pour tous les Box
		      margin: '0', // Fixe la marge à 0 pour tous les Box
		    },
		  },
		},
  	},
	
  });
  
theme = responsiveFontSizes(theme);
  
export default theme;
