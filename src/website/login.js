import React, { useState } from "react";
import "../css/login.css";
const apiUrl = "https://readit1-1f9246305140.herokuapp.com/login/";

function LoginComponent() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [loginStatus, setLoginStatus] = useState("");

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
            setLoginStatus("YOU'RE LoggedinP");
        } else {
            setLoginStatus("unable to log in user with those credentials");
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
