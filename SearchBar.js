import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${query}`);
        }
    };


    return(
        <form onSubmit={handleSubmit} className = "search-form">
            <input
                type="text"
                placeholder = "Search for pets buddies"
                value = {query}
                onChange={(e) => setQuery(e.target.value)}
                className = "search-input"
                />
                <button type = "submit" className = "search-button">🔍</button>
        </form>
    );
    
};

export default SearchBar;