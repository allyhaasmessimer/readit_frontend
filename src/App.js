import "./App.css";
import React, { useState, useEffect } from "react";
import SearchComponent from "./website/searchApi";

function App() {
    return (
        <section className="container1">
            <div className="blank-space1"></div>
            <div className="title-container">
                <div className="logo">
                    <img src="/logo.jpg" alt="logo" />
                </div>
                <h1 className="title">READIT</h1>
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
                <div className="signup">SIGNUP</div>
                <div className="login">LOGIN</div>
                <div className="logout">LOGOUT</div>
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
