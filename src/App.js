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

    const deleteWantToReadData = async (id) => {
        const token = localStorage.getItem("authToken");
        console.log(token)
        if (!token) {
            console.error("Token not found in local storage");
            return;
        }

        try {
            const parsedToken = JSON.parse(token);
            const response = await fetch(
                `https://readit1-1f9246305140.herokuapp.com/delete_want_to_read/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${parsedToken}`,
                    },
                }
            );

            if (response.ok) {
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                console.error(
                    "DELETE request failed:",
                    response.status,
                    errorMessage
                );
                console.log("RESPONSE: " , response)
            }
        } catch (error) {
            console.error(
                "An error occurred while making the DELETE request:",
                error
            );
        }
    };

    const deleteReadData = async (id) => {
        const token = localStorage.getItem("authToken");
        console.log(token)
        if (!token) {
            console.error("Token not found in local storage");
            return;
        }

        try {
            const parsedToken = JSON.parse(token);
            const response = await fetch(
                `https://readit1-1f9246305140.herokuapp.com/delete/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${parsedToken}`,
                    },
                }
            );

            if (response.ok) {
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                console.error(
                    "DELETE request failed:",
                    response.status,
                    errorMessage
                );
                console.log("RESPONSE: " , response)
            }
        } catch (error) {
            console.error(
                "An error occurred while making the DELETE request:",
                error
            );
        }
    };

    return (
        <div className="container1">
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
                        <p style={{ textTransform: "uppercase" }}>
                            HI, {currentUser.username}
                        </p>
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
                    <h3 className="title-want-to-read">WANT TO READ</h3>
                    <div id="want-to-read-list">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>ID</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingReadList ? (
                                    <tr>
                                        <td colSpan="3">
                                            Loading want to read list data...
                                        </td>
                                    </tr>
                                ) : readList ? (
                                    readList.books_want_to_read &&
                                    readList.books_want_to_read.length > 0 ? (
                                        <>
                                            {readList.books_want_to_read.map(
                                                (item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.title}</td>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <button
                                                                onClick={() =>
                                                                    deleteWantToReadData(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="delete-button"
                                                            >
                                                                DELETE
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan="3">
                                                No books in your want to read
                                                list. Add books to your list.
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            LOGIN OR SIGNUP TO START CREATING A
                                            WANT TO READ LIST
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="read">
                    <h3 className="title-read">READ</h3>
                    <div id="read-list">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>ID</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoadingReadList ? (
                                    <tr>
                                        <td colSpan="3">
                                            Loading read list data...
                                        </td>
                                    </tr>
                                ) : readList ? (
                                    readList.books_read &&
                                    readList.books_read.length > 0 ? (
                                        <>
                                            {readList.books_read.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                deleteReadData(
                                                                    item.id
                                                                )
                                                            }
                                                            className="delete-button"
                                                        >
                                                            DELETE
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan="3">
                                                No books in your read list. Add
                                                books to your list.
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            LOGIN OR SIGNUP TO START CREATING A
                                            READ LIST
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
