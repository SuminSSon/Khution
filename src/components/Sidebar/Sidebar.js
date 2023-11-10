import React, { useContext, useState } from 'react';
import './sidebar.css';
import { MyContext } from '../../MyContextProvider'; // MyContext를 import

const Sidebar = () => {
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);
  const [newFileName, setNewFileName] = useState('');

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

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sideMenu">
          <h3 className="sidebarTitle">
            사용자 이름
            <button onClick={handleAddFile} className="addFileButton">+</button>
          </h3>
          <ul className="sidebarPagelist">
            {sidebarFiles.map((file, index) => (
              <li key={index} className="sidebarListItem">{file.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
