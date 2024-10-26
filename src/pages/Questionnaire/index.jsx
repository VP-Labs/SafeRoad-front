import React, { useState, useEffect } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from '@mui/material';
import { useAuth, useDatas } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";

// Création d'un thème personnalisé avec un mode sombre
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Blue
    },
    secondary: {
      main: '#90caf9', // Light Blue
    },
    background: {
      default: '#000000',
      paper: '#0d47a1', // Dark Blue
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdbdbd',
    },
  },
});

function Questionnaire() {
  const auth = useAuth();
  const datas = useDatas();
  const navigate = useNavigate();
  
  const [getError, setError] = useState(false);
  const [status, setStatus] = useState("waitingDatas");
  
  const [allQuestions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const [finalScore, setFinalScore] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  useEffect(() => {
    async function getQuests() {
      const { questions, currentQuestion } = await datas.GetQuestions(auth.token);
      setQuestions(questions);
      setCurrentQuestionIndex(currentQuestion);
    }
    getQuests();
  }, []);
  
  useEffect(() => {
    if(allQuestions.length !== 0 && currentQuestionIndex !== -1) {
      setStatus("Questionnary");
    }
  }, [allQuestions, currentQuestionIndex]);
  
  const handleOptionChange = (index) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter(option => option !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  const handleNextQuestion = async () => {
    if (selectedOptions.length === 0) {
      alert('Veuillez sélectionner une réponse !');
      return;
    }
    
    setIsLoading(true);
    const answers = selectedOptions.map(option => option + 1);
    
    try {
      const response1 = await datas.QuestionnaryPost(auth.token, answers, currentQuestionIndex);
      
      if(typeof response1.success === "undefined") {
        setError(true);
      } else if(typeof response1.nextQuestion !== "undefined") {
        setCurrentQuestionIndex(response1.nextQuestion);
        setSelectedOptions([]);
      } else {
        setFinalScore(response1.score);
        setStatus("Results");
      }
    } catch (error) {
      console.error("Error fetching next question:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoToHome = async () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        flexGrow: 1, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        background: 'linear-gradient(to bottom left, #0d47a1, #000000)',
      }}>
        <Container component="main" sx={{ mt: 8, mb: 2, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {getError ? (
            <Typography variant="h4" color="error">ERREUR, VEUILLEZ VOUS RECONNECTER</Typography>
          ) : status === "waitingDatas" ? (
            <CircularProgress size={60} />
          ) : status === "Questionnary" ? (
            <Box sx={{ 
              width: '100%', 
              maxWidth: 500, 
              bgcolor: 'rgba(13, 71, 161, 0.7)', // Lowered opacity
              p: 4, 
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Added shadow
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center content
            }}>
              <Typography variant="h4" gutterBottom align="center">QUESTION {currentQuestionIndex + 1}</Typography>
              <Typography variant="h6" gutterBottom align="center">{currentQuestion.question}</Typography>
              <FormGroup>
                {currentQuestion.propositions.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedOptions.includes(index)}
                        onChange={() => handleOptionChange(index)}
                        color="primary"
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextQuestion}
                disabled={isLoading}
                sx={{ mt: 2, alignSelf: 'center', minWidth: '200px' }} // Center button and set minimum width
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  currentQuestionIndex < allQuestions.length - 1 ? 'Question suivante' : 'Terminer'
                )}
              </Button>
            </Box>
          ) : status === "Results" ? (
            <Box sx={{ 
              width: '100%', 
              maxWidth: 500, 
              bgcolor: 'rgba(13, 71, 161, 0.7)', // Lowered opacity
              p: 4, 
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)', // Added shadow
              textAlign: 'center', // Center content
            }}>
              <Typography variant="h4" gutterBottom>RÉSULTATS</Typography>
              <Typography variant="h5">VOTRE SCORE EST DE {finalScore}</Typography>
            </Box>
          ) : (
            <Typography variant="h4" color="error">ERREUR</Typography>
          )}
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGoToHome}
          >
            Revenir à la page d'accueil
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Questionnaire;