import "./App.css";

function App() {
    return (
        <section className="container">
            <div className="blank-space1"></div>
            <div className="title">READIT</div>
            <div className="search">SEARCH BOOK USING GOOGLE BOOK API</div>
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
