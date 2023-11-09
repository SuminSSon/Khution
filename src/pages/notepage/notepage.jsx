import React, { useState, useEffect, useRef } from 'react';
import './notepage.css';
// import FileDropdown from '../../components/FileDropdown';

function Notepage() {
  const [subject, setSubject] = useState('SUBJECT1');
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');
  const [files, setFiles] = useState([]);
  const [showFileOption, setShowFileOption] = useState(false);
  // const [fileCreated, setFileCreated] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (dropdownRef.current) {
          dropdownRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addMemo = () => {
    if (newMemo.trim() !== '') {
      setMemos([...memos, newMemo]);
      setNewMemo('');
    }
  };

  const createQuiz = () => {
    // 퀴즈 생성 로직을 추가하세요.
  };

  const handleTextareaChange = (e) => {
    const inputValue = e.target.value;
    setNewMemo(inputValue);

    // "/p"를 입력하면 파일 옵션 보이도록 설정
    setShowFileOption(inputValue.trim().toLowerCase() === '/p');
  };

  const createFileWithPrompt = () => {
    const title = prompt('파일 제목을 입력하세요:');
    if (title) {
      const newFile = {
        title,
        memos: [],
      };

      setFiles([...files, newFile]);
      setFileTitle(title);
      console.log('파일이 생성되었습니다.');
      // setFileCreated(true); // 파일이 생성되었다는 상태 업데이트
    }
  };

  return (
    <div className='notepage-container'>
      <h1>{subject}</h1>
      <div className="textarea-button-container">
        <div className="textarea-container">
          <div className="textarea-wrapper">
            <button onClick={createFileWithPrompt} className="create-file-button">  + 페이지 생성하기</button>
            {files.map((file, index) => (
              <div key={index}>
                <span role="img" aria-label="file-icon">📄</span>
                <span>{file.title}</span>
              </div>
            ))}
            <textarea
              placeholder='내용을 입력하세요.'
              className="memo-input"
              style={{ fontFamily: "Arial" }}
              value={newMemo}
              onChange={handleTextareaChange}
            />
            {/* {showFileOption && !fileCreated && (
              <FileDropdown ref={dropdownRef} onCreateFile={createFile}/>
            )} */}
          </div>
        </div>
        <div className="button-container">
          <button className='notesave-button' onClick={addMemo}>내용 저장</button>
          <button className='quizgenerate-button' onClick={createQuiz}>퀴즈 생성</button>
        </div>
      </div>
    </div>
  );
}

export default Notepage;
