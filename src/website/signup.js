import React, { useState } from "react";
import "../css/signup.css";
const apiUrl = "https://readit1-1f9246305140.herokuapp.com/signup/";

function SignupComponent() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [signupStatus, setSignupStatus] = useState("");

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
            setSignupStatus("YOU'RE SIGNED UP");
        } else {
            setSignupStatus("we were unable to create an account.");
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
        <div className="signup1">
            <h3 className="title-signup">SIGN UP</h3>
            <form
                onSubmit={handleSubmit}
                className="signup-form"
                id="signup_form_submit"
            >
                {signupStatus && (
                    <div className="signup-status">{signupStatus}</div>
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

                <div>
                    <label htmlFor="email" className="form-label">
                        EMAIL
                    </label>
                    <input
                        value={formData.email}
                        onChange={handleChangeInput}
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                    />
                </div>

                <button className="sign-up-button">SIGN UP</button>
            </form>
        </div>
    );
}

export default SignupComponent;
