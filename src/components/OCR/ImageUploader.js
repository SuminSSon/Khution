import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import Modal2 from '../Modal2/Modal2';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [recognizedText, setRecognizedText] = useState(null);
    const [fullCode, setFullCode] = useState(null);
    const [isModalOpen, setModalOpen] = React.useState(false);

    const handleCheck = () => {
        // Add logic to handle 'Check' button click
        // You can set some content for the modal
    
        // Open the modal
        setModalOpen(true);
    };

    useEffect(() => {
        console.log(fullCode);
        if (fullCode !== null) {
            handleCheck();
        }
    }, [fullCode])

    const handleImageUpload = async (event) => {
        const image = event.target.files[0];
        setSelectedImage(URL.createObjectURL(image));
        const result = await Tesseract.recognize(URL.createObjectURL(image));
        setRecognizedText(result.data.text.split("\n").join(" "));
        console.log(result.data.text.split("\n").join(" "));
        await axios.post("http://localhost:8080/util/codeocr", {
            "ocr_code": result.data.text.split("\n").join(" ")
        }).then(res => { 
            console.log(res.data.split("\t").join("&nbsp; &nbsp; &nbsp; &nbsp;").split("\n").join("<br/>"));
            setFullCode(res.data);
        })
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <Modal2 isOpen={isModalOpen} onClose={() => setModalOpen(false)} content={fullCode} />
        </div>
    );
};
export default ImageUploader;