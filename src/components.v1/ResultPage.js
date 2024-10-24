import './ResultPage.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Assuming axios for API calls

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { newsLink } = location.state || {}; // Get the passed newsLink
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current news index
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (newsLink) {
      // Fetch news data from backend
      axios.post('YOUR_API_ENDPOINT', { newsLink }) // API to store in AWS and fetch summaries
        .then(response => {
          setNewsData(response.data); // Assuming the response is an array of news
        })
        .catch(error => {
          console.error("Error fetching news data:", error);
        });
    }
  }, [newsLink]);

  const handleNewAttempt = () => {
    navigate('/');
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      // If already at the first news
      setMessage("You are reading your first news.");
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    } else {
      // Navigate to the previous news
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === newsData.length - 1) {
      // If already at the last news
      setMessage("You are reading your last news.");
      setTimeout(() => setMessage(''), 2000); // Clear message after 2 seconds
    } else {
      // Navigate to the next news
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className='result-page'>
      {newsData.length > 0 ? (
        <>
          <h2 className='news-title'>{newsData[currentIndex].title}</h2>
          <p className='news-author'>by {newsData[currentIndex].author}</p>
          <p className='news-summary'>{newsData[currentIndex].summary}</p>
          <button onClick={handlePrevious} className='nav-button'>Previous</button>
          <button onClick={handleNext} className='nav-button'>Next</button>
          <button onClick={handleNewAttempt} className='attempt-button'>New Attempt</button>

          {message && <p className='message'>{message}</p>} {/* Display temporary message */}
        </>
      ) : (
        <p className='loading'>Loading summary...</p>
      )}
    </div>
  );
};

export default ResultPage;