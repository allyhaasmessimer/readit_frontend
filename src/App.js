import "./css/App.css";
import "./css/searchApi.css";

import { useCallback, useEffect, useState } from "react";

import SearchComponent from "./website/searchApi";
import SignupComponent from "./website/signup";
import LoginComponent from "./website/login";
import LogoutCompontent from "./website/logout";
import getUser from "./website/getUser";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("authToken") || null
    );

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
                <div className="want-to-read">want to read</div>
                <div className="read">READ</div>
            </div>
        </section>
    );
}

export default App;
