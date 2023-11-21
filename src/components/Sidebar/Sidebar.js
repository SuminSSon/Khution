import React, { useContext, useState } from 'react';
import './sidebar.css';
import { MyContext } from '../../MyContextProvider'; // MyContext를 import
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/khution.png';

const Sidebar = () => {
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);
  const [newFileName, setNewFileName] = useState('');
  const { currentPageId, setCurrentPageId } = useContext(MyContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); // 사이드바의 초기 확장 상태
  const user_id = localStorage.getItem('user_id');

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
    setCurrentPageId(file.id);
    navigate(`/Main/${file.title}`, { state: { pageId: file.id } });
  };



  const handleToggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>   
      <div className="sidebarWrapper">
        <div className="sideMenu">

          <div className='smallsidebar'>

            {/* <img className='logoimage' src={logo} />  */}
        
          <h3 className="sidebarTitle">
            {user_id}
            </h3>
            <button onClick={handleToggleSidebar} className="toggleButton">
              {expanded ? '<' : '>'} </button>

            </div>

          <button onClick={createFileWithPrompt} className="addFileButton">+ 페이지 추가</button>
          {expanded && (
            <ul className="sidebarPagelist">
              {sidebarFiles.map((file, index) => (
              <div key={index} className='file-wrapper2' onClick={() => handleClickFile(file)}>
      
                <span className='filename2'>
                  <span className='filename-text2'>{file.title}</span>
                </span>
              </div>
            ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
