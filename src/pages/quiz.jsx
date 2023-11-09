import React, { useState } from 'react';
import './Quiz.css';

function Quiz() {
  const [subject, setSubject] = useState('SUBJECT1 - Quiz1');
  const [quizQuestions, setQuizQuestions] = useState([
    { question: 'Q1. Dispatch의 정의를 서술하세요.'},
    { question: 'Q2. Dispatch의 정의를 서술하세요.'},
    { question: 'Q3. Dispatch의 정의를 서술하세요.'},
    { question: 'Q4. Dispatch의 정의를 서술하세요.'},
    { question: 'Q5. Dispatch의 정의를 서술하세요.'},
    { question: 'Q6. Dispatch의 정의를 서술하세요.'},
    { question: 'Q7. Dispatch의 정의를 서술하세요.' },
    { question: 'Q8. Dispatch의 정의를 서술하세요.' },
    { question: 'Q9. Dispatch의 정의를 서술하세요.'},
    { question: 'Q10. Dispatch의 정의를 서술하세요.'},
    // 다른 퀴즈 질문들
  ]);

  const handleAnswerChange = (index, event) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].answer = event.target.value;
    setQuizQuestions(updatedQuestions);
  };

  const toggleAnswerVisibility = (index) => {
    const updatedQuestions = [...quizQuestions];
    updatedQuestions[index].isAnswerVisible = !updatedQuestions[index].isAnswerVisible;
    setQuizQuestions(updatedQuestions);
  };

//   const fetchServerResponse = async (index) => {
//     try {
//       // 서버로 GET 요청을 보냅니다.
//       const response = await fetch('/quiz/request', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const updatedQuestions = [...quizQuestions];
//         updatedQuestions[index].serverResponse = data.response;
//         setQuizQuestions(updatedQuestions);
//         toggleAnswerVisibility(index);
//       } else {
//         // 에러 처리
//       }
//     } catch (error) {
//       console.error('Error fetching server response:', error);
//     }
//   };

  return (
    <div className="quiz-container">
      <h1>{subject}</h1>
      <div className="quiz-questions-container">
        {quizQuestions.map((quiz, index) => (
          <div key={index} className="quiz-question">
            <p>{quiz.question}</p>
            <input
              className='quiz-input'
              placeholder='답안을 입력하세요.'
              type="text"
              value={quiz.answer}
              onChange={(event) => handleAnswerChange(index, event)}
            />
            <button className='quiz-button' onClick={() => toggleAnswerVisibility(index)}>정답확인</button>
            {quiz.isAnswerVisible && quiz.answer && <p className="user-answer">사용자 답안: {quiz.answer}</p>}
            {/* {quiz.isAnswerVisible && quiz.serverResponse && <p className="server-response">서버 응답: {quiz.serverResponse}</p>} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
