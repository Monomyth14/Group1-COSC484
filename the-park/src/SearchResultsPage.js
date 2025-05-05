import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [results, searchResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            const response = await fetch(`http://localhost:5001/api/search?q=${query}`);
            const data = await response.json();
            setResults(data);
        };

        if(query) fetchResults();

 
}, [query]);

return (
    <div className="search-results">
        <h2> Search results for "{query}"</h2>
        <ul>
            {results.map((item) => (
                <li key={item._id}>
                    <strong>{item.username || item.petName}</strong>
                </li>
            ))}
        </ul>
    </div>
);
};

export default SearchResultsPage;