import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [results, setResults] = useState(null);

    useEffect(() => {
        const getResults = async () => {
            const response = await fetch(`http://localhost:5001/api/search?q=${query}`);
            const data = await response.json();
            setResults(data);
        };

        if(query) {
            getResults();
        }

 
}, [query]);

if (!results) return <p>Loading search results...</p>

return (
  <div className="search-results">
    <h2>Results for "{query}"</h2>

    <h3>Users</h3>
    <ul>
      {results.users?.map(user => (
        <li key={user._id}>{user.username}</li>
      )) || <li>No users found</li>}
    </ul>

    <h3>Events</h3>
    <ul>
      {results.events?.map(event => (
        <li key={event._id}>{event.title}</li>
      )) || <li>No events found</li>}
    </ul>

    <h3>Posts</h3>
    <ul>
      {results.posts?.map(post => (
        <li key={post._id}>{post.caption}</li>
      )) || <li>No posts found</li>}
    </ul>

    <h3>Lost and Found</h3>
    <ul>
      {results.lostpets?.map(pet => (
        <li key={pet._id}>{pet.title}</li>
      )) || <li>No lost pets found</li>}
    </ul>
  </div>
);
};

export default SearchResultsPage;
