



import React, { useState, useEffect } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response = await fetch("https://newsapi.org/v2/everything?q=tesla&apiKey=79da0ed268ed4145ab0e8967b4c6253b");

        let result = await response.json();
        setArticles(result.articles || []); 
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error.message); 
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {error && <p className="error">Error: {error}</p>} 
      <div className="article-container flex justify-center items-center flex-wrap gap-3 h-auto  w-auto px-4">
        {articles.length > 0 ? (
          articles.map((a, index) => {
            const hasImage = a.urlToImage;
            return (
              <div 
                key={index} 
                className={`border border-gray-200 rounded-lg shadow bg-black ${hasImage ? 'bg-blue' : 'bg-black'} w-96 h-96 pb-52 mt-4`} // Set a fixed width and height
              >
                {hasImage ? (
                  <a href="#">
                    <img 
                      className="rounded-t-lg w-full h-48 object-cover" 
                      src={a.urlToImage} 
                      alt="" 
                    />
                  </a>
                ) : (
                  <div className="h-20 flex items-center justify-center text-white bg-red-600 font-bold">No Image</div> // Match height with the image
                )}
                <div className="p-5">
                  <p className="mb-3 font-normal text-white dark:text-gray-400 text-sm">{a.description}</p>
                  <a href={a.url} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-center text-4xl font-bold flex justify-center items-center loading'> News Loading........</p> 
        )}
      </div>
    </div>
  );
}

export default News;
