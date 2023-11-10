import React, { useState, useEffect, useRef, useContext} from 'react';
import './DynamicPage.css';
import TextEditorForm from '../../components/TextEditorForm';
import Apicontents from '../../components/Apicontents';
import fileimage from '../../assets/Document.png';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContextProvider';
import Modal from '../../components/Modal/Modal';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';

function DynamicPage() {
  
  const {quizlist, setquizlist} = useContext(MyContext);
  const location = useLocation();
  const pageId = location.state ? location.state.pageId : null;
  const {fileName, fileId} = useParams();
  const [files, setFiles] = useState([]);
  const [fileTitle, setFileTitle] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [pageTitle, setPageTitle] = useState(fileName);
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);
  const [quizfile, setquizfile] = useState([]);
  const [isQuizModalOpen, setQuizModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const {currentPageId, setCurentPageId} = useContext(MyContext);
  const {currentPageContent, setCurrentPageContent} = useContext(MyContext);
  const navigate = useNavigate();




  const createQuiz = async () => {
    console.log(currentPageId);
    setQuizModalOpen(true);
  
    // 퀴즈 생성 로직을 추가하세요.
    const newQuizFile = {
      title: pageTitle + "-QUIZ",
      memos: [],
    };
  
    // setFiles([...files, newQuizFile]);
    setquizfile([...quizfile, newQuizFile]);
  
    // API에 퀴즈 생성 요청을 보냅니다.
    await axios.get(`http://localhost:8080/quiz/create`, {
      params: {
        "page_id": currentPageId
      }
    })
      .then(response => {
        const quizList = [];
        const data = response.data;
        console.log(data)
        // localStorage.setItem("quizlist", response.data);
        console.log('퀴즈가 성공적으로 생성되었습니다.', response.data);
        setquizlist(response.data)
        navigate(`/Main/${pageTitle}/Quiz`);
        
      })
      .catch(error => {
        console.error('퀴즈 생성 오류:', error);
      });
  
    console.log('파일이 생성되었습니다.');
  };

  const handlePageTitleChange = (e) => {
    setPageTitle(e.target.value);
  };

  const createFileWithPrompt = () => {
    console.log("id", currentPageId);
    const title = prompt('파일 제목을 입력하세요:');
    if (title) {
      const newFile = {
        title,
        memos: [],
      };

      setFiles([...files, newFile]);
      setFileTitle(title);
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
              value={pageTitle}
              onChange={handlePageTitleChange}
            />

            <div>
              <button onClick={createFileWithPrompt} className="create-file-button">+ 페이지 생성하기</button>
              {/* <button className='editcontent-button' onClick={showEditorForm}>내용 수정</button> */}
            </div>
            {quizfile.map((file, index) => (
              <div key={index} className='file-wrapper'>
                <img className='fileimage' src={fileimage} alt='File Icon' />
                <Link to={`/Main/${pageTitle}/Quiz`}>
                  <span className='filename'>
                    <span className='filename-text'>{file.title}</span>
                  </span>
                </Link>
              </div>
            ))}
            {files.map((file, index) => (
              <div key={index} className='file-wrapper'>
                <img className='fileimage' src={fileimage} alt='File Icon' />
                <Link to={`/Main/${pageTitle}/${file.title}`}>
                  <span className='filename'>
                    <span className='filename-text'>{file.title}</span>
                  </span>
                </Link>
              </div>
            ))}
            <div className='file-line'> </div>
            <Topbar onEditContent={showEditorForm} showSaveButton={showSaveButton} onHideEditor={hideEditorForm} />

            {showEditor && <TextEditorForm />}
            {!showEditor && <Apicontents />}
          </div>
        </div>
        <div className="button-container">
          {/* {showSaveButton && <button className='notesave-button' onClick={hideEditorForm}>내용 저장</button>} */}
          {/* <Link to={`/Main/${pageTitle}/Quiz`}> */}
          <button className='quizgenerate-button' onClick={createQuiz}>퀴즈 생성</button>
          {/* </Link>   */}
          <Modal
            isOpen={isQuizModalOpen}
            onClose={() => setQuizModalOpen(false)} //respond가 오면 false가 돼서 모달이 닫히게 해야함
            content="퀴즈를 생성하고 있습니다..."
          />
        </div>
      </div>
    </div>
  );
}

export default DynamicPage;
