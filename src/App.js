import "./css/App.css";
import "./css/searchApi.css";

import React, { useState, useEffect } from "react";
import SearchComponent from "./website/searchApi";
import SignupComponent from "./website/signup";
import LoginComponent from "./website/login";
import LogoutComponent from "./website/logout";

function App() {
    const [token, setToken] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("yourToken");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        setToken(false);
    };

    const handleLogin = (token, username) => {
        setToken(true);
        setToken(token);
        setUserName(username);
    };

    const renderGreeting = () => {
        if (token) {
            return <div className="greeting">hi, {userName}</div>;
        }
        return null;
    };

    return (
        <section className="container1">
            <div className="blank-space1"></div>
            <div className="title-container">
                <div className="logo">
                    <img src="/logo.jpg" alt="logo" />
                </div>
                <h1 className="title">READIT</h1>
                <div className="greeting">{renderGreeting()}</div>
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
                    <LoginComponent onLogin={handleLogin} />
                </div>
                <div className="logout">
                    <LogoutComponent onLogout={handleLogout} />
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
