import React, { useContext, useState } from 'react';
import './sidebar.css';
import { MyContext } from '../../MyContextProvider'; // MyContext를 import
import { Link } from 'react-router-dom';
import fileimage from '../../assets/Document.png';

const Sidebar = () => {
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);
  const [newFileName, setNewFileName] = useState('');
  const [expanded, setExpanded] = useState(false); // 사이드바의 초기 확장 상태

  const handleAddFile = () => {
    const fileName = prompt('파일 이름을 입력하세요:');

    if (fileName && fileName.trim() !== '') {
      const newFile = {
        title: fileName,
        memos: [],
      };

      setSidebarFiles([...sidebarFiles, newFile]);
    }
  };

  const handleToggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : ''}`}>   
      <div className="sidebarWrapper">
        <div className="sideMenu">

          <div className='smallsidebar'> 
        
          <h3 className="sidebarTitle">
            사용자 이름
            </h3>
            <button onClick={handleToggleSidebar} className="toggleButton">
              {expanded ? '<' : '>'} </button>

            </div>

          <button onClick={handleAddFile} className="addFileButton">+ 페이지 추가</button>
          {expanded && (
            <ul className="sidebarPagelist">
              {sidebarFiles.map((file, index) => (
                <div key={index} className='file-wrapper2'>
                  <Link to={`/${file.title}`}>
                    <span className='filename2'>
                      <span className='filename-text2'>{file.title}</span>
                    </span>
                  </Link>
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
