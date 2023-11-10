import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from '../MyContextProvider';
import './Apicontents.css';

function Apicontents() {
  const [apiData, setApiData] = useState('');
  const { currentPageId, setCurentPageId } = useContext(MyContext);
  const { currentPageContent, setCurrentPageContent } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you have an API endpoint for fetching page content
        const apiUrl = `http://localhost:8080/page/${currentPageId}`;
  
        // Send a GET request to fetch page content
        const response = await axios.get(apiUrl);
  
        // Log the response (you might want to handle it differently)
        console.log("Fetch response:", response.data.pageContents);
  
        // Update the state with the fetched data
        setApiData(response.data.pageContents);
      } catch (error) {
        console.error("Error fetching content:", error);
        // Handle errors as needed
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, [currentPageId]); // useEffect dependency: currentPageId

  return (
    <div className="api-contents-container">
      <div dangerouslySetInnerHTML={{ __html: apiData }} />
    </div>
  );
}

export default Apicontents;
