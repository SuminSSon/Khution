
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../MyContextProvider';
import './Quiz.css';
import axios from 'axios';


function Quiz() {
  const {quizlist, setquizlist} = useContext(MyContext);
  const { fileName } = useParams();
  console.log(quizlist);
  const [quizQuestions, setQuizQuestions] = useState( quizlist
    // {
    //   "quiz_id": 1,
    //   "quiz_question": " 이순신 장군의 출생 지역은 어디인가요?Choice1. 전라도Choice2. 경상도Choice3. 충청도Choice4. 강원도Choice5. 경기도"
    // },
    // {
    //   "quiz_id": 2,
    //   "quiz_question": " 이순신 장군의 출생 연도는 언제인가요?Choice1. 1433년Choice2. 1545년Choice3. 1578년Choice4. 1609년Choice5. 1622년"
    // },
    // {
    //   "quiz_id": 3,
    //   "quiz_question": " 이순신 장군의 본관은 무엇인가요?"
    // },
    // {
    //   "quiz_id": 4,
    //   "quiz_question": " 이순신 장군이 전사한 해협은 어디인가요?"
    // },
    // {
    //   "quiz_id": 5,
    //   "quiz_question": " 이순신 장군은 조선시대 장군이었다. (O/X)"
    // },
    // {
    //   "quiz_id": 6,
    //   "quiz_question": " 이순신 장군은 여러 차례 전쟁에서 승리를 거두었다. (O/X)"
    // }
  );

  // Function to split the quiz_question into choices
  const splitChoices = (quizQuestion) => {
    const parts = quizQuestion.split('Choice');
    const question = parts[0];
    const choices = parts.slice(1).filter(choice => choice); // Remove empty choices
    return { question, choices };
  };

  const quizWithChoices = quizQuestions.map(quiz => {
    const { question, choices } = splitChoices(quiz.quiz_question);
    return {
      ...quiz,
      question,
      choices,
    };
  });

  const handleAnswerChange = (index, event) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].answer = event.target.value;
    setQuizQuestions(updatedQuestions);
  };


  const handleCheckAnswer = async (quizId, userAnswer) => {


  };
  
  
  
  // const toggleAnswerVisibility = (index) => {
  //   const updatedQuestions = [...quizQuestions];
  //   updatedQuestions[index].isAnswerVisible = !updatedQuestions[index].isAnswerVisible;
  //   setQuizQuestions(updatedQuestions);
  // };

  return (
    <div className="quiz-container">
      <h1>{fileName}</h1>
      <div className="quiz-questions-container">
        {quizWithChoices.map((quiz, index) => (
          <div key={index} className="quiz-question">
            <p>{quiz.question}</p>
            {quiz.choices ? (
              quiz.choices.map((choice, choiceIndex) => (
                <label key={choiceIndex}>
                  <input
                    type="radio"
                    value={choice}
                    name={`quiz${quiz.quiz_id}`}
                    checked={quiz.answer === choice}
                    onChange={(event) => handleAnswerChange(index, event, true)}
                  />
                  {choice}
                </label>
              ))
            ) : (
              <input
                className='quiz-input'
                placeholder='답안을 입력하세요.'
                type="text"
                value={quiz.answer}
                onChange={(event) => handleAnswerChange(index, event)}
              />
            )}
            {quiz.quiz_id >= 3 && ( // Check if quiz_id is 3 or greater
              <input
                className='quiz-input'
                placeholder='답안을 입력하세요.'
                type="text"
                value={quiz.answer}
                onChange={(event) => handleAnswerChange(index, event)}
              />
            )}
            <button className='quiz-button' onClick={() => handleCheckAnswer(quiz.quiz_id, quiz.answer)}>정답확인</button>
            {/* <button className='quiz-button' onClick={() => toggleAnswerVisibility(index)}>정답확인</button> */}
            {/* {quiz.isAnswerVisible && quiz.answer && <p className="user-answer">사용자 답안: {quiz.answer}</p>} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;

