import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

const TextRecognition = ({ selectedImage }) => {
    const [recognizedText, setRecognizedText] = useState('');
    const [fullCode, setFullCode] = useState('');
    useEffect(() => {
        const recognizeText = async () => {
            if (selectedImage) {
                const result = await Tesseract.recognize(selectedImage);
                await setRecognizedText(result.data.text.split("\n").join(" "));
                await axios.post("http://localhost:8080/util/codeocr", {
                "ocr_code": recognizedText
            }).then(res => { setFullCode(res.data); })
            }
        };
        
        recognizeText();
    }, [selectedImage]);

    console.log(recognizedText);
    console.log(fullCode);

    return (
        <div>
            a
        </div>
    );
};
export default TextRecognition;