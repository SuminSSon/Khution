// FileDropdown 컴포넌트 수정
import React, { useState, useEffect, useRef } from 'react';
import './FileDropdown.css';

const FileDropdown = ({ onCreateFile }) => {
  const [isClicked, setIsClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isClicked) {
      // 파일 생성 로직을 호출
      onCreateFile();
      setIsClicked(false); // 클릭 처리 후 상태 초기화
    }
  }, [isClicked, onCreateFile]);

  const handleClick = () => {
    setIsClicked(true);
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      setIsClicked(true);
    }
  };

  return (
    <li
      ref={dropdownRef}
      className="file-create-li"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      페이지 생성
    </li>
  );
};

export default FileDropdown;
