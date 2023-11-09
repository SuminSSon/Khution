// DynamicPage.js

import React from 'react';
import { useParams } from 'react-router-dom';

function DynamicPage() {
  const { fileName } = useParams();

  return (
    <div>
      <h2>Dynamic Page</h2>
      <p>File Name: {fileName}</p>
    </div>
  );
}

export default DynamicPage;
