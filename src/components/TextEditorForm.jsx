import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { MyContext } from "../MyContextProvider";

const Container = styled.div`
  width: 100%;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
`;

const Viewer = styled.div`
  width: calc(50% - 40px);
  height: 400px;
  padding: 20px;
  margin-top: 20px;
  border: 2px solid gray;
`;

const TextEditorForm = () => {
  const {currentPageContent, setCurrentPageContent} = useContext(MyContext);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(currentPageContent))));
  const [htmlString, setHtmlString] = useState("");

  useEffect(() => {
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(currentPageContent))));
    console.log(editorState);
  }, [])

  useEffect(() => {
    
  }, [editorState])

  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    setHtmlString(html);
    setCurrentPageContent(htmlString);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  return (
    <>
      <Container>
        <Editor
          placeholder="내용을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "550px",
            width: "100%",
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
      </Container>
      {/* <RowBox>
        <Viewer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Viewer>{htmlString}</Viewer>
      </RowBox> */}
    </>
  );
};

export default TextEditorForm;