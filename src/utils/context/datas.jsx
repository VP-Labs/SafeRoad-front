import React, { useState, createContext } from 'react'



// MANAGE AUTH DIRECTLY WITH HOOKS --------------------------------------

export const DatasContext = createContext();


export const DatasProvider = ({ children }) => {

  
  const GetQuestions = async (token) => {
    try {
      var tokenToSend = "Bearer " + token;
      const response = await fetch("http://localhost:5005/datas/questions", {        //  <<<< backend api here <<<
        method: "GET",
        headers: {
          "authorization": tokenToSend,
        },
      });
      const res = await response.json();
      return res;
    } catch (err) {
      return err
    }
  };
  
  
  const QuestionnaryPost = async (token, selectedAnswers, indexQuestion) => {
    try {
      var tokenToSend = "Bearer " + token;
      const response = await fetch("http://localhost:5005/datas/serie/last", {        //  <<<< backend api here <<<
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": tokenToSend,
        },
        body: JSON.stringify({selectedAnswers: selectedAnswers, indexQuestion: indexQuestion}),
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.error(err);
    }
  };
  


  


  return (
    <DatasContext.Provider value={{ GetQuestions, QuestionnaryPost }}>
      {children}
    </DatasContext.Provider>
  );

};

