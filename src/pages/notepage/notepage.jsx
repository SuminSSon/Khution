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
        const user_id = 'abc123'; // 실제 사용자 ID로 교체
        const response = await axios.get('/userPage', {
          params: {
            user_id,
          },
        });

        // 페이지 정보를 가지고 새로운 파일 생성
        const newFiles = response.data.map(page => ({
          title: page.pageTitle,
          depth: page.pageDepth,
          parent: page.pageParent,
        }));

        setSidebarFiles(newFiles);
      } catch (error) {
        console.error('Error fetching user pages:', error);
      }
    };

    // fetchUserPages 함수 호출
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

  // const createFileWithPrompt = async () => {
  //   const title = prompt('페이지 제목을 입력하세요:');
  //   if (title) {
  //     try {
  //       const user_id = 'abc123'; // 실제 사용자 ID로 교체
  //       const page_parent = '0';

  //       const response = await axios.post('/create', {
  //         user_id,
  //         page_title: title,
  //         page_parent,
  //       });

  //       // 응답이 OK일 때 아래 로직 실행
  //       if (response.status === 200) {
  //         // 페이지 정보를 가지고 새로운 파일 생성
  //         const newFile = {
  //           title: response.data.pageTitle,
  //           memos: [], // 메모 정보가 있으면 추가
  //           depth: response.data.pageDepth,
  //           parent: response.data.pageParent,
  //         };

  //         setSidebarFiles([...sidebarFiles, newFile]);
  //         setPageTitle(response.data.pageTitle);
  //         console.log('파일이 생성되었습니다.');
  //       } else {
  //         console.error('페이지 생성 실패. 상태:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('페이지 생성 중 오류 발생:', error);
  //     }
  //   }
  // };
  


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
