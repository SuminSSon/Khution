import React, { useState, useEffect, useRef, useContext } from 'react';
import './notepage.css';
import TextEditorForm from '../../components/TextEditorForm';
import Apicontents from '../../components/Apicontents';
import fileimage from '../../assets/Document.png';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function Notepage() {
  const [showEditor, setShowEditor] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [title, setTitle] = useState('')
  const [pageTitle, setPageTitle] = useState('');
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);

  useEffect(() => {
    const fetchUserPages = async () => {
      try {
        const response = await axios.get('/userPage', {
          params: {
            user_id: 'your_user_id', // replace with the actual user ID
          },
        });

        // Filter pages where page_parent is 0
        const parentPages = response.data.filter((page) => page.page_parent === '0');

        // Update the sidebarFiles state with the filtered pages
        setSidebarFiles(parentPages);
      } catch (error) {
        console.error('Error fetching user pages:', error);
      }
    };

    // Call the function to fetch user pages
    fetchUserPages();
  }, []);


  const handlePageTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createFileWithPrompt = () => {
    const title = prompt('페이지 제목을 입력하세요:');
    if (title) {
      const newFile = {
        title,
        memos: [],
      };
  
      setSidebarFiles([...sidebarFiles, newFile]);
      setPageTitle(title);
      console.log('파일이 생성되었습니다.');
    }
  };
  

  const showEditorForm = () => {
    setShowEditor(true);
    setShowSaveButton(true);
  };

  const hideEditorForm = () => {
    setShowEditor(false);
    setShowSaveButton(false);
  };

  return (
    <div className='notepage-container'>
      <div className="textarea-button-container">
        <div className="textarea-container">
          <div className="textarea-wrapper">
            <input
              className='title-input'
              type="text"
              placeholder="페이지를 추가하고 퀴즈를 생성해보세요!"
              value={title}
              onChange={handlePageTitleChange}
            />

            <div>
              <button onClick={createFileWithPrompt} className="create-file-button">+ 페이지 생성하기</button>
              {/* <button className='editcontent-button' onClick={showEditorForm}>내용 수정</button> */}
            </div>

            {sidebarFiles.map((file, index) => (
              <div key={index} className='file-wrapper'>
                <img className='fileimage' src={fileimage} alt='File Icon' />
                <Link to={`/${file.title}`}>
                  <span className='filename'>
                    <span className='filename-text'>{file.title}</span>
                  </span>
                </Link>
              </div>
            ))}
            
            <div className='file-line'> </div>   
          </div>
        </div>

        <div className="button-container">
          {/* {showSaveButton && <button className='notesave-button' onClick={hideEditorForm}>내용 저장</button>} */}
          {/* <Link to={`/Quiz`}>
            <button className='quizgenerate-button' onClick={createQuiz}>퀴즈 생성</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Notepage;
