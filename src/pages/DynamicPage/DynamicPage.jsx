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
  const {currentPageId, setCurrentPageId} = useContext(MyContext);
  const {currentPageContent, setCurrentPageContent} = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPages = async () => {
      try {
        // localStorage에서 user_id 가져오기
        const user_id = localStorage.getItem('user_id');
  
        const response = await axios.get('http://localhost:8080/page/userPages', {
          params: {
            userId: user_id,
          }
        });
  
        console.log(response);
  
        // Filter pages based on conditions (depth: 2, parent: currentPageId)
        const filteredPages = response.data.filter(page => page.pageDepth === 2 && page.pageParent === currentPageId && !page.pageTitle.includes("QUIZ"));
  
        // Filter pages with "QUIZ" in the title
        const quizFiles = response.data.filter(page => page.pageDepth === 2 && page.pageParent === currentPageId && page.pageTitle.includes("QUIZ"));
  
        const newFiles = filteredPages.map(page => ({
          id: page.pageId,
          link: page.pageTitle,
          title: page.pageTitle.split('/').pop(),
          depth: page.pageDepth,
          parent: page.pageParent,
        }));
  
        // Split pageTitle by '/' and take the last string
        const newQuizFiles = quizFiles.map(page => ({
          id: page.pageId,
          link: page.pageTitle,
          title: page.pageTitle.split('/').pop(), // Take the last string after splitting by '/'
          depth: page.pageDepth,
          parent: page.pageParent,
        }));
  
        console.log(newFiles);
        console.log(newQuizFiles);
  
        setFiles(newFiles);
        setquizfile(newQuizFiles);
      } catch (error) {
        console.error('Error fetching user pages:', error);
      }
    };
  
    fetchUserPages();
  }, [currentPageId]);




  const createQuiz = async () => {
    setquizlist([])
    console.log(currentPageId);
    setQuizModalOpen(true);
  
    // 퀴즈 생성 로직을 추가하세요.
    // const newQuizFile = {
    //   title: pageTitle + "-QUIZ",
    //   memos: [],
    // };
  
    // // setFiles([...files, newQuizFile]);
    // setquizfile([...quizfile, newQuizFile]);
  
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

  const createFileWithPrompt = async () => {
    const title = prompt('페이지 제목을 입력하세요:');
    if (title) {
      try {
        // localStorage에서 user_id 가져오기
        const user_id = localStorage.getItem('user_id');
        const page_parent = currentPageId;

        const response = await axios.post('http://localhost:8080/page/create', {
          page_title: title,
          user_id,
          page_contents: '',
          page_depth: '2',
          page_parent,
        });

        if (response.status === 200) {
          console.log("생성res", response);
          console.log("생성됨");

          const newFile = {
            id: response.data.pageId,
            link: response.data.pageTitle,
            title: response.data.pageTitle.split('/').pop(),
            content: response.data.pageContents,
            depth: response.data.pageDepth,
            parent: response.data.pageParent,
          };

          console.log(newFile);

          setFiles([...files, newFile]);
          setSidebarFiles([...sidebarFiles, newFile]);
          setPageTitle(response.data.page_title);
          console.log('파일이 생성되었습니다.');
        } else {
          console.error('페이지 생성 실패. 상태:', response.status);
        }
      } catch (error) {
        console.error('페이지 생성 중 오류 발생:', error);
      }
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

  const handleClickFile = (file) => {
    console.log(file.id);
    setCurrentPage(file.id);
    setCurrentPageId(file.id);
    setCurrentPageContent(file.content);
    navigate(`/Main/${file.link}`, { state: { pageId: file.id } });
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
            {/* {quizfile.map((file, index) => (
              <div key={index} className='file-wrapper'>
                <img className='fileimage' src={fileimage} alt='File Icon' />
                <Link to={`/Main/${pageTitle}/Quiz`}>
                  <span className='filename'>
                    <span className='filename-text'>{file.title}</span>
                  </span>
                </Link>
              </div>
            ))} */}
            
            {files.map((file, index) => (
              <div key={index} className='file-wrapper' onClick={() => handleClickFile(file)} >
                <img className='fileimage' src={fileimage} alt='File Icon' />   
                  <span className='filename'>
                    <span className='filename-text'>{file.title}</span>
                  </span>
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
