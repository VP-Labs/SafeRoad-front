import React, { useState , useEffect } from 'react';
import styled from 'styled-components'
import { useAuth, useDatas } from "../../utils/hooks/index.jsx";
import { useNavigate } from "react-router-dom";





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
  
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  
  
  
  
	useEffect( () => {
		async function getQuests() {
			const { questions, currentQuestion } = await datas.GetQuestions(auth.token);
			setQuestions(questions);  setCurrentQuestionIndex(currentQuestion);
		}
		getQuests();
	}, []);
  
	useEffect(() => {
		if(allQuestions.length !== 0 && currentQuestionIndex !== -1) {
		setStatus("Questionnary");
		}
	}, [allQuestions, currentQuestionIndex]);
  
  
  


  
	const handleOptionChange = (index) => {
		if (selectedOptions.includes(index)) { setSelectedOptions(selectedOptions.filter(option => option !== index)); } 
		else { setSelectedOptions([...selectedOptions, index]); }
	};



	const handleNextQuestion = async () => {
	  if (selectedOptions.length === 0) { alert('Please select an answer!'); return; }
	  
	  const answers = selectedOptions.map(option => option + 1);
	  
	  const response1 = await datas.QuestionnaryPost(auth.token, answers, currentQuestionIndex);
	  
	  if(typeof response1.success === "undefined") {setError(true)}
	  else if(typeof response1.nextQuestion !== "undefined") { setCurrentQuestionIndex(response1.nextQuestion);  setSelectedOptions([]);} 
	  else { setFinalScore(response1.score); setStatus("Results"); }
	};
	
	
	const handleGoToHome = async () => {
	  navigate("/");
	};





	return (
		<><div style={styles.container}>
		  
		  { getError ?
		  (<h1>ERREUR, VEUILLEZ VOUS RECONNECTER</h1>)
		  
		  : status === "waitingDatas" ?
		  
		  (<h1>EN ATTENTE DES QUESTIONS</h1>)
		  
		  : status === "Questionnary" ?
		  (<><h1>QUESTION {currentQuestionIndex + 1} </h1>
		  <div style={styles.questionContainer}>
		    <h3>{currentQuestion.question}</h3>
		    <div style={styles.options}>
		      {currentQuestion.propositions.map((option, index) => (
		        <label key={index} style={styles.option}>
		          <input
		            type="checkbox"
		            value={index}
		            checked={selectedOptions.includes(index)}
		            onChange={() => handleOptionChange(index)}
		          />
		          {option}
		        </label>
		      ))}
		    </div>
		  </div>
		  <button onClick={handleNextQuestion} style={styles.button}>
		    {currentQuestionIndex < allQuestions.length - 1 ? 'Next Question' : 'Finish'}
		  </button></>)
		  : status === "Results" ?
		  (<><h1>REPONSES </h1>
		  <div style={styles.questionContainer}>
		    <h2>VOTRE SCORE EST DE {finalScore}</h2>
		  </div></>)
		  :
		  (<h1>ERREUR</h1>) }
		   
		</div>
		<button onClick={handleGoToHome} style={styles.button2}> Revenir à la page d'acceuil </button></>
		
  );
};






const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  questionContainer: {
    marginBottom: '20px',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
  },
  option: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  button2: {
  	display: 'block',
  	margin: '70px auto 0',
    padding: '10px',
    backgroundColor: '#003bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};





export default Questionnaire;

