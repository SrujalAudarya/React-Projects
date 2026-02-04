import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem'; // Import the component we created above
import axios from 'axios';

function News() {
    const [newsData, setNewsData] = useState([]);
    const api = import.meta.env.VITE_API_NEWS;

    const loadNews = async () => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api}`);
            
            // const getData = await response.data;
            // console.log(getData.articles);
            
            console.log(response.data.articles);
            
            
            setNewsData(response.data.articles);
        } catch (err) {
            console.error(err);
        }

        
        
    }

    useEffect(() => {
        loadNews();
    }, [])

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4 font-weight-bold">
                    {newsData?.[0]?.source?.name || "News Feed"}
                </h1>
                <p className="lead text-muted">Latest updates</p>
            </div>

            <div className="row justify-content-center">
                {newsData && newsData.map((item, index) => (
                    // Pass data as props to the Child Component
                    <NewsItem 
                        key={index}
                        title={item.title}
                        description={item.description}
                        src={item.urlToImage}
                        url={item.url}
                        author={item.author}
                    />
                ))}
            </div>
        </div>
    )
}

export default News;