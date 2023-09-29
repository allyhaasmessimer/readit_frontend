import "./css/App.css";
import "./css/searchApi.css";

import { useCallback, useEffect, useState } from "react";

import SearchComponent from "./website/searchApi";
import SignupComponent from "./website/signup";
import LoginComponent from "./website/login";
import LogoutCompontent from "./website/logout";
import getUser from "./website/getUser";
import ReadList from "./website/ReadList";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("authToken") || null
    );
    const [readList, setReadList] = useState(null);
    const [isLoadingReadList, setIsLoadingReadList] = useState(true);

    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const fetchUserData = useCallback(() => {
        if (token) {
            getUser(token)
                .then((userData) => {
                    setCurrentUser(userData);
                    setIsLoadingUser(false);
                })
                .catch((error) => {
                    setIsLoadingUser(false);
                    setCurrentUser(null);
                });
        } else {
            setIsLoadingUser(false);
            setCurrentUser(null);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            ReadList(token)
                .then((readListData) => {
                    console.log("Response Data:", readListData);
                    setReadList(readListData);
                    setIsLoadingReadList(false);
                })
                .catch((error) => {
                    console.error("Error fetching read list data:", error);
                    setIsLoadingReadList(false);
                    setReadList(null);
                });
        } else {
            setIsLoadingReadList(false);
            setReadList(null);
        }
    }, [token]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <section className="container1">
            <div className="blank-space1"></div>

            <div className="title-container">
                <div className="logo">
                    <img src="/logo.jpg" alt="logo" />
                </div>
                <h1 className="title">READIT</h1>
                <div className="greeting">
                    {isLoadingUser ? (
                        <p>Loading user data...</p>
                    ) : currentUser ? (
                        <>
                            <p style={{ textTransform: "uppercase" }}>
                                HI, {currentUser.username}
                            </p>
                        </>
                    ) : (
                        <p>WELCOME, GUEST</p>
                    )}
                </div>
            </div>
            <div className="search">
                <SearchComponent />
            </div>
            <img
                className="img"
                src="/pexels.jpg"
                alt="Description of the image"
            />
            <div className="blank-space2"></div>
            <div className="container2">
                <div className="signup">
                    <SignupComponent />
                </div>
                <div className="login">
                    <LoginComponent />
                </div>
                <div className="logout">
                    <LogoutCompontent />
                </div>
            </div>
            <div className="blank-space3"></div>
            <div className="container3">
                <div className="want-to-read">
                    want to read
                    <div>
                        {isLoadingReadList ? (
                            <p>Loading read list data...</p>
                        ) : readList &&
                          Array.isArray(readList.books_want_to_read) ? (
                            <div>
                                {readList.books_want_to_read.map((item) => (
                                    <div key={item.id}>{item.title}</div>
                                ))}
                            </div>
                        ) : (
                            <p>No read list data available.</p>
                        )}
                    </div>
                </div>
                <div className="read">
                    READ
                    <div>
                        {isLoadingReadList ? (
                            <p>Loading read list data...</p>
                        ) : readList && Array.isArray(readList.books_read) ? (
                            <div>
                                {readList.books_read.map((item) => (
                                    <div key={item.id}>{item.title}</div>
                                ))}
                            </div>
                        ) : (
                            <p>No read list data available.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
