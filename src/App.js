import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [newsLink, setNewsLink] = useState('');
  const [newsData, setNewsData] = useState(null);
  const [history, setHistory] = useState([]);
  const [nextId, setNextId] = useState(1); // State to keep track of the next ID

  const handleSubmit = () => {
    if (newsLink) {
      const newSummary = {
        id: nextId, // Assign the next ID to the news summary
        title: `Sample News Title ${nextId}`, // Update title to include the ID
        author: `Author Name ${nextId}`, // Update author to include the ID
        summary: `This is a summary of the news article fetched from the link for entry ${nextId}.`,
        link: newsLink
      };
      setNewsData(newSummary);
      setHistory([...history, newSummary]);
      setNewsLink('');
      setNextId(nextId + 1); // Increment the ID for the next news summary
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleHistoryClick = (item) => {
    setNewsData(item); // Set the clicked item as the current news data
  };

  const handleDelete = (id) => {
    // Directly filter out the item with the specified ID
    setHistory(history.filter(item => item.id !== id));
    // If the current displayed data matches the deleted item, clear it
    if (newsData && newsData.id === id) {
      setNewsData(null);
    }
  };

  const handleDeleteAll = () => {
    // Show confirmation dialog before deleting all history
    if (window.confirm('Are you sure you want to delete all history?')) {
      setHistory([]); // Clear all history
      setNewsData(null); // Clear current news data
    }
  };

  return (
    <div className="container">
      {/* History Section */}
      <div className="history">
        <h3 className='history-topic'>History</h3>
        {history.length === 0 ? (
          <p className='no-history-message'>You haven't read any news yet.</p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id} className="history-item">
                <span onClick={() => handleHistoryClick(item)} className="history-title">
                  {item.title}
                </span>
                <button onClick={() => handleDelete(item.id)} className="delete-button">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Delete All Button */}
        <button onClick={handleDeleteAll} className="delete-all-button">
          Delete All
        </button>
      </div>

      {/* Right Section (Summarization and Input) */}
      <div className="right-section">
        {/* Summarization Section */}
        <div className="summarization">
          {newsData ? (
            <>
              <h2 className='news-title'>{newsData.title}</h2>
              <p className='news-author'>by {newsData.author}</p>
              <p className='news-summary'>{newsData.summary}</p>
            </>
          ) : (
            <p className='no-news-message'>No summary available yet. Submit a news link below!</p>
          )}
        </div>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            value={newsLink}
            onChange={(e) => setNewsLink(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter news link"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default App;
