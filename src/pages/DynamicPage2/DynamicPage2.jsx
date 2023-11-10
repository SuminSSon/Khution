import React, { useState, useEffect, useRef, useContext} from 'react';
import './DynamicPage2.css';
import TextEditorForm from '../../components/TextEditorForm';
import Apicontents from '../../components/Apicontents';
import fileimage from '../../assets/Document.png';
import { Link, useParams } from 'react-router-dom';
import { MyContext } from '../../MyContextProvider';
import Topbar from '../../components/topbar/Topbar';

function DynamicPage2() {
  const {fileName} = useParams();
  const [files, setFiles] = useState([]);
  const [fileTitle, setFileTitle] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [pageTitle, setPageTitle] = useState(fileName);
  const { sidebarFiles, setSidebarFiles } = useContext(MyContext);




  const createQuiz = () => {
    // 퀴즈 생성 로직을 추가하세요.
  };

  const handlePageTitleChange = (e) => {
    setPageTitle(e.target.value);
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
            <button className='editcontent-button' onClick={showEditorForm}>내용 수정</button>
            </div>
            {files.map((file, index) => (
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
            <Topbar onEditContent={showEditorForm} showSaveButton={showSaveButton} onHideEditor={hideEditorForm} /> 

            {showEditor && <TextEditorForm />}
            { !showEditor&& <Apicontents/> }
          </div>
        </div>
        <div className="button-container">
          {showSaveButton && <button className='notesave-button' onClick={hideEditorForm}>내용 저장</button>}
          <Link to={`/${pageTitle}/Quiz`}>
          <button className='quizgenerate-button' onClick={createQuiz}>퀴즈 생성</button>
          </Link>  
        </div>
      </div>
    </div>
  );
}

export default DynamicPage2;
