import React, { useContext, useState } from 'react';
import './sidebar.css';
import { MyContext } from '../../MyContextProvider'; // MyContext를 import
import { Link } from 'react-router-dom';
import logo from '../../assets/khution.png';

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

  // 이 코드 수정해서 연동시 사용
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
