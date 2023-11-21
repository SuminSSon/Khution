import React, { useState, useEffect, useContext } from 'react';
import './notepage.css';
import TextEditorForm from '../../components/TextEditorForm';
import Apicontents from '../../components/Apicontents';
import fileimage from '../../assets/Document.png';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';
import { MyContext } from '../../MyContextProvider';

function Notepage() {
  const [currentPage, setCurrentPage] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [title, setTitle] = useState('');
  const { currentPageId, setCurrentPageId } = useContext(MyContext);
  const [pageTitle, setPageTitle] = useState('');
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);
  const {currentPageContent, setCurrentPageContent} = useContext(MyContext);

  const filteredSidebarFiles = sidebarFiles.filter(file => file.parent === 0);
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

        const filterFiles = response.data.filter(page => !page.pageTitle.includes("Quiz") && !page.pageTitle.includes("QUIZ") );
        

        const newFiles = filterFiles.map(page => ({
          id: page.pageId,
          content: page.pageContents,
          title: page.pageTitle.split('/').pop(),
          depth: page.pageDepth,
          parent: page.pageParent,
        }));

        console.log(newFiles);

        setSidebarFiles(newFiles);
      } catch (error) {
        console.error('Error fetching user pages:', error);
      }
    };

    fetchUserPages();
  }, []);

  const handlePageTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const createFileWithPrompt = async () => {
    const title = prompt('페이지 제목을 입력하세요:');
    if (title) {
      try {
        // localStorage에서 user_id 가져오기
        const user_id = localStorage.getItem('user_id');
        const page_parent = '0';

        const response = await axios.post('http://localhost:8080/page/create', {
          page_title: title,
          user_id,
          page_contents: '',
          page_depth: '1',
          page_parent,
        });

        if (response.status === 200) {
          console.log("생성res", response);
          console.log("생성됨");

          const newFile = {
            id: response.data.pageId,
            title: response.data.pageTitle,
            content: response.data.pageContents,
            depth: response.data.pageDepth,
            parent: response.data.pageParent,
          };

          console.log(newFile);

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

  const handleClickFile = (file) => {
    console.log(file.id);
    setCurrentPage(file.id);
    setCurrentPageId(file.id);
    setCurrentPageContent(file.content);
    navigate(`/Main/${file.title}`, { state: { pageId: file.id } });
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
            </div>

            {filteredSidebarFiles.map((file, index) => (
              <div key={index} className='file-wrapper' onClick={() => handleClickFile(file)}>
                <img className='fileimage' src={fileimage} alt='File Icon' />
                <span className='filename'>
                  <span className='filename-text'>{file.title}</span>
                </span>
              </div>
            ))}

            <div className='file-line'> </div>   
          </div>
        </div>

        <div className="button-container">
        </div>
      </div>
    </div>
  );
}

export default Notepage;
