import React, { useState } from "react";

function LoginForm({ onLogin }) {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div className="login1">
            <form
                onSubmit={handleSubmit}
                className="login-form"
                id="login_form_submit"
            >
                <div>
                    <label htmlFor="username" className="form-label">USERNAME:</label>
                    <input
                        type="text"
                        id="login_username"
                        name="username"
                        value={credentials.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="form-label">PASSWORD:</label>
                    <input
                        type="password"
                        id="login_password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button className="login-button">LOGIN</button>
            </form>
        </div>
    );
}
export default LoginForm;
