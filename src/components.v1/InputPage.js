import './InputPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using axios for API calls

const InputPage = () => {
  const [newsLink, setNewsLink] = useState('');
  const [historyMessage, setHistoryMessage] = useState(''); // State to store history message
  const navigate = useNavigate();

  // Handle submit for the news link input
  const handleSubmit = () => {
    if (newsLink) {
      navigate('/summary', { state: { newsLink } });
    }
  };

  // Handle history fetching
  const handleHistory = async () => {
    try {
      // Make a call to the backend to fetch history (from AWS DynamoDB, for example)
      const response = await axios.get('YOUR_API_ENDPOINT/history'); // Replace with actual API URL

      if (response.data.length === 0) {
        // If dataset is empty, show message
        setHistoryMessage("You haven't read any news.");
      } else {
        // If dataset is not empty, show the last news summary
        const lastNews = response.data[response.data.length - 1]; // Assuming it's an array of news summaries
        setHistoryMessage(`Last news you read: ${lastNews.title}`); // Display the title of the last news
      }
    } catch (error) {
      console.error("Error fetching history:", error);
      setHistoryMessage("Failed to fetch history.");
    }
  };

  return (
    <div className='input-page'>
      <h2 className='input-title'>Let's read some news!</h2>
      <input
        className='input-field'
        type="text"
        value={newsLink}
        onChange={(e) => setNewsLink(e.target.value)}
        placeholder="Enter news link"
      />
      <button onClick={handleSubmit} className='submit-button'>Submit</button>
      <button onClick={handleHistory} className='history-button'>History</button>

      {historyMessage && <p className='history-message'>{historyMessage}</p>} {/* Conditionally render the history message */}
    </div>
  );
};

export default InputPage;