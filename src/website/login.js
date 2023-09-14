import React, { useState, useEffect } from "react";
import "../css/login.css";

const apiUrl = "https://readit1-1f9246305140.herokuapp.com/login/";

function LoginComponent({ onLogin }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("yourToken");
        if (!storedToken) {
            console.error("Token is not available.");
            return;
        }
        if (storedToken) {
            console.log("Stored Token:", storedToken);
            setLoginStatus("SUCCESS");
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem("yourToken", token);
        setLoginStatus("YOU'RE LOGGED IN");
        onLogin(token, formData.username);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = apiUrl;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            const yourToken = data.token;

            localStorage.setItem("yourToken", yourToken);

            console.log("yourToken:", yourToken);
            setLoginStatus("YOU'RE LoggedinP");
            handleLogin(yourToken, formData.username);
        } else {
            const errorData = await response.json();
            setLoginStatus(
                errorData.error || "Unable to log in with those credentials"
            );
        }
    };

    const handleChangeInput = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value,
        });
    };

    return (
        <div className="login1">
            <h3 className="title-login">LOGIN</h3>
            <form
                onSubmit={handleSubmit}
                className="login-form"
                id="login_form_submit"
            >
                {loginStatus && (
                    <div className="login-status">{loginStatus}</div>
                )}

                <div>
                    <label htmlFor="username" className="form-label">
                        USERNAME
                    </label>
                    <input
                        value={formData.username}
                        onChange={handleChangeInput}
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="form-label">
                        PASSWORD
                    </label>
                    <input
                        value={formData.password}
                        onChange={handleChangeInput}
                        type="text"
                        name="password"
                        id="password"
                        className="form-control"
                    />
                </div>
                <button className="login-button">LOGIN</button>
            </form>
        </div>
    );
}

export default LoginComponent;
