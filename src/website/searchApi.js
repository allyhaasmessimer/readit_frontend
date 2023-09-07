import React, { useState, useEffect } from "react";

const apiUrl = "https://readit1-1f9246305140.herokuapp.com/search/";

function SearchComponent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchMessage, setSearchMessage] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        if (searchResults.length === 0 && searchPerformed) {
            setSearchMessage("No results found");
        } else {
            setSearchMessage("");
        }
    }, [searchResults, searchPerformed]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setSearchPerformed(true);

        const requestData = {
            q: searchQuery,
        };
        const requestUrl = `${apiUrl}?q=${requestData.q}`;
        console.log("Request URL:", requestUrl);
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

                console.log("Response Data:", data);
                setSearchResults(data);
            })
            .catch((error) => {
                console.error("Fetch Error: ", error);
            });
    };

    return (
        <div className="search-container">
            <div className="search-box">
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
            </div>

            <div className="search-results-container">
                <div className="search-results">
                    {searchResults.map((book) => (
                        <div key={book.id}>
                            <h3>Title: {book.volumeInfo.title}</h3>
                            <p>
                                Author:{" "}
                                {book.volumeInfo.authors
                                    ? book.volumeInfo.authors.join(", ")
                                    : "N/A"}
                            </p>
                            <p>
                                Description:{" "}
                                {book.volumeInfo.description || "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {searchMessage && <p>{searchMessage}</p>}
        </div>
    );
}

export default SearchComponent;
