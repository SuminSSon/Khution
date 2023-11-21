import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../MyContextProvider';
import './Quiz.css';
import axios from 'axios';

function Quiz() {
  const { quizlist, setquizlist } = useContext(MyContext);
  const { fileName } = useParams();
  
  const [showAnswer, setshowAnswer] = useState(false);
  const [showAnswer_f, setshowAnswer_f] = useState('');

  const [showAnswer2, setshowAnswer2] = useState(false);
  const [showAnswer2_f, setshowAnswer2_f] = useState('');

  const [showAnswer3, setshowAnswer3] = useState('');
  const [showAnswer4, setshowAnswer4] = useState('');
  
  const [showAnswer5, setshowAnswer5] = useState(false);
  const [showAnswer5_f, setshowAnswer5_f] = useState(false);

  const [showAnswer6, setshowAnswer6] = useState(false);
  const [showAnswer6_f, setshowAnswer6_f] = useState(false);

  const initialQuizQuestions = quizlist;

  const [quizQuestions, setQuizQuestions] = useState(initialQuizQuestions);

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
    setQuizQuestions(updatedQuestions)
    
  };

  const handleCheckAnswer = async (quizId, userAnswer) => {
    if (quizId%6 === 1)
    {try {
      const response = await axios.post('http://localhost:8080/quiz/answer', {
        quiz_id: quizId,
        user_answer: userAnswer
      });

      console.log('서버 응답:', response.data); 

      if (userAnswer[0] == response.data){
        console.log('정답')
        setshowAnswer_f('');
      setshowAnswer(true);
    }else
      setshowAnswer(false);
      setshowAnswer_f(`틀렸습니다. 정답은 ${response.data} 입니다.`);
      
      // 여기서 응답에 따른 작업을 수행할 수 있습니다.
      // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('서버 응답에 오류가 있습니다:', error);
    }
         
    };
    
    if (quizId%6 === 2)
    {try {
      const response = await axios.post('http://localhost:8080/quiz/answer', {
        quiz_id: quizId,
        user_answer: userAnswer
      });

      console.log('서버 응답:', response.data); 

      if (userAnswer[0] == response.data){
        console.log('정답')
        setshowAnswer2_f('');
      setshowAnswer2(true);
    }else
      setshowAnswer2(false);
      setshowAnswer2_f(`틀렸습니다. 정답은 ${response.data} 입니다.`);
      
      // 여기서 응답에 따른 작업을 수행할 수 있습니다.
      // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('서버 응답에 오류가 있습니다:', error);
    }
         
    }; 
        
    if (quizId%6 === 3)
    {try {
      const response = await axios.post('http://localhost:8080/quiz/answer', {
        quiz_id: quizId,
        user_answer: userAnswer
      });

      console.log('서버 응답:', response.data);
      setshowAnswer3(response.data); 
  
      // 여기서 응답에 따른 작업을 수행할 수 있습니다.
      // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('서버 응답에 오류가 있습니다:', error);
    }
         
    };
    if (quizId%6 === 4)
    {try {
      const response = await axios.post('http://localhost:8080/quiz/answer', {
        quiz_id: quizId,
        user_answer: userAnswer
      });

      console.log('서버 응답:', response.data);
      setshowAnswer4(response.data); 
  
      // 여기서 응답에 따른 작업을 수행할 수 있습니다.
      // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('서버 응답에 오류가 있습니다:', error);
    }
         
    };


    if (quizId%6 === 5)
      {try {
        const response = await axios.post('http://localhost:8080/quiz/answer', {
          quiz_id: quizId,
          user_answer: userAnswer
        });

        setshowAnswer5(true);
  
        console.log('서버 응답:', response.data); 
  
        if (' ' + userAnswer == response.data){
          console.log('정답')
          setshowAnswer5_f(false);
          setshowAnswer5(true);
        }else
        setshowAnswer5(false);
        setshowAnswer5_f(true);
        
        // 여기서 응답에 따른 작업을 수행할 수 있습니다.
        // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
      } catch (error) {
        console.error('서버 응답에 오류가 있습니다:', error);
      }
           
      };
      
    
     


      if (quizId%6 === 0)
      {try {
        const response = await axios.post('http://localhost:8080/quiz/answer', {
          quiz_id: quizId,
          user_answer: userAnswer
        });

        setshowAnswer6(true);
  
        console.log('서버 응답:', response.data); 
  
        if (' ' + userAnswer == response.data){
          console.log('정답')
          setshowAnswer6_f(false);
          setshowAnswer6(true);
        }else
        setshowAnswer6(false);
        setshowAnswer6_f(true);
        
        // 여기서 응답에 따른 작업을 수행할 수 있습니다.
        // 예를 들어, 서버에서 온 데이터를 상태로 업데이트하거나 다른 동작을 수행할 수 있습니다.
      } catch (error) {
        console.error('서버 응답에 오류가 있습니다:', error);
      }
           
      };

    // console.log(`사용자가 선택한 정답: ${userAnswer}`);
    
  
  };

  return (
    <div className="quiz-container">
      <h1>{fileName +'QUIZ'}</h1>
      <div className="quiz-questions-container">
        {quizWithChoices.map((quiz, index) => (
          <div key={index} className="quiz-question">
            <p>{quiz.question}</p>
            {quiz.choices ? (
  quiz.choices.map((choice, choiceIndex) => (
    <div key={choiceIndex}>
      <input
        type="radio"
        value={choice}
        name={`quiz${quiz.quiz_id}`}
        checked={quiz.answer === choice}
        onChange={(event) => handleAnswerChange(index, event, true)}
      />
      <label>{choice}</label>
    </div>
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


            {(quiz.quiz_id % 6 === 0 || quiz.quiz_id % 6 >= 3)  && (
              <input
                className='quiz-input'
                placeholder='답안을 입력하세요.'
                type="text"
                value={quiz.answer}
                onChange={(event) => handleAnswerChange(index, event)}
              />
            )}
            <button className='quiz-button' onClick={() => handleCheckAnswer(quiz.quiz_id, quiz.answer)}>정답확인</button>

            {quiz.quiz_id % 6 === 1 && (
                showAnswer_f && !showAnswer ? (
                  <p style={{ color: 'red', fontSize: '15px' }}>{showAnswer_f}</p>
                ) : showAnswer ? (
                  <p style={{ color: 'blue', fontSize: '15px' }}>정답입니다!</p>
                ) : null
              )}

              {quiz.quiz_id % 6 === 2 && (
                showAnswer2_f && !showAnswer2 ? (
                  <p style={{ color: 'red', fontSize: '15px' }}>{showAnswer2_f}</p>
                ) : showAnswer2 ? (
                  <p style={{ color: 'blue', fontSize: '15px' }}>정답입니다!</p>
                ) : null
              )}

              {quiz.quiz_id % 6 === 3 && (
                // 퀴즈 ID가 3인 경우에 대한 로직
                showAnswer3 &&  (
                  <p style={{ color: 'black', fontSize: '13px' }}>{showAnswer3}</p>
                ) 
              )}

              {quiz.quiz_id % 6 === 4 && (
                // 퀴즈 ID가 3인 경우에 대한 로직
                showAnswer4 &&  (
                  <p style={{ color: 'black', fontSize: '13px' }}>{showAnswer4}</p>
                ) 
              )}

              
              {quiz.quiz_id % 6 === 5 && (
                showAnswer5_f && !showAnswer5 ? (
                  <p style={{ color: 'red', fontSize: '15px' }}> 틀렸습니다.</p>
                ) : showAnswer5 ? (
                  <p style={{ color: 'blue', fontSize: '15px' }}>정답입니다!</p>
                ) : null
              )}

              

            {quiz.quiz_id % 6 === 0 && (
                showAnswer6_f && !showAnswer6 ? (
                  <p style={{ color: 'red', fontSize: '15px' }}> 틀렸습니다.</p>
                ) : showAnswer6 ? (
                  <p style={{ color: 'blue', fontSize: '15px' }}>정답입니다!</p>
                ) : null
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
