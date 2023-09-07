import React, { useState, useEffect } from "react";
const apiUrl = "https://readit1-1f9246305140.herokuapp.com/search/";

function SearchComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchButtonClick = () => {
        const requestData = {
            q: searchQuery,
        };
        const requestUrl = `${apiUrl}?q=${requestData.q}`;
        console.log("Request URL:", requestUrl); // Log the request URL
        fetch(requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Handle the response data here
                console.log("Response Data:", data);
                setSearchResults(data);
                console.log("Search Results:", searchResults);
            })
            .catch((error) => {
                // Handle any errors here
                console.error("Fetch Error: ", error);
            });
    };

    return (
        <div>
            <h2 className="search-title">SEARCH FOR BOOKS</h2>
            <div className="input-container">
                <input
                    className="input-box"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="ENTER SEARCH QUERY"
                />
                 <button onClick={handleSearchButtonClick}>ENTER</button>
            </div>

            {searchResults.map((book) => (
                <div key={book.id}>
                    <h3>Title: {book.volumeInfo.title}</h3>
                    <p>Author: {book.volumeInfo.authors.join(", ")}</p>
                    <p>Description: {book.volumeInfo.description}</p>
                </div>
            ))}
        </div>
    );
}
export default SearchComponent;
