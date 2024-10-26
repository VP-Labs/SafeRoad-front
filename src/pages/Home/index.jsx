import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import { DirectionsCar, PlayArrow, ExitToApp, EmojiEvents, School, History } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/hooks/index.jsx";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#90caf9',
    },
    background: {
      default: '#000000',
      paper: '#0d47a1',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
  },
});

export default function Component() {
  const auth = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleButtonStartQuestions = async (e) => {
    e.preventDefault();
    navigate("/questionnaire");
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(to bottom left, #0d47a1, #000000)',
      }}>
        <AppBar position="static" sx={{ backgroundColor: 'rgba(13, 71, 161, 0.7)' }}>
          <Toolbar>
            <DirectionsCar sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SafeRoad
            </Typography>
            <Button color="inherit" startIcon={<ExitToApp />} onClick={() => auth.logOut()}>
              Se déconnecter
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" sx={{ mt: 8, mb: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
            Bienvenue
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", color: 'text.primary' }}>
            Préparez-vous à réussir votre examen du code de la route
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PlayArrow />}
            sx={{ mt: 4, mb: 2 }}
            onClick={handleButtonStartQuestions}
          >
            Commencer une série de questions
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            size="large"
            startIcon={<History />}
            sx={{ mb: 4 }}
          >
            Consultez vos séries passées
          </Button>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? "center" : "normal",
            justifyContent: 'center', 
            gap: 4, 
            width: '100%', 
            mt: 4 
          }}>
            <Card sx={{ minWidth: 275, flex: 1, maxWidth: 345, backgroundColor: 'background.paper' }}>
              <CardContent>
                <School fontSize="large" color="secondary" />
                <Typography variant="h5" component="div" sx={{ mt: 2, color: 'text.primary' }}>
                  Apprenez à votre rythme
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Des séries de questions adaptées à votre niveau et à votre progression.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, flex: 1, maxWidth: 345, backgroundColor: 'background.paper' }}>
              <CardContent>
                <EmojiEvents fontSize="large" color="secondary" />
                <Typography variant="h5" component="div" sx={{ mt: 2, color: 'text.primary' }}>
                  Suivez vos progrès
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  Visualisez votre évolution et identifiez vos points d'amélioration.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>

        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} SafeRoad. Tous droits réservés.
            </Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}