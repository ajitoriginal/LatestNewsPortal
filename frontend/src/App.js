import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Loading state
  const [category, setCategory] = useState('technology'); // Category state

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(`http://localhost:5000/api/news/${category}`);
      setNews(response.data);
      setTotalPages(Math.ceil(response.data.length / articlesPerPage));
      setLoading(false); // Set loading to false once data is received
    };
    fetchNews();
  }, [category, articlesPerPage]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    paginate(currentPage + 1);
  };

  const prevPage = () => {
    paginate(currentPage - 1);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentNews = news.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <>
      {loading ? ( // Conditionally render loader if loading is true
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container">
          <div className="category-dropdown">
            <label htmlFor="category">Select Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="general">General</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <h1 className="title">Latest News</h1>
          {currentNews.map((article, index) => (
            <div key={index} className="news-card">
              <div className="news-content">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textAlign: 'right', display: 'block' }}>Read more...</a>
              </div>
            </div>
          ))}
          <div className="pagination">
            <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)} className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={nextPage} className="page-link" disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
