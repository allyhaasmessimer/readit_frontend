import React, { useState, useEffect } from "react";
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
        console.log(response);

        if (response.ok) {
            setFormData({
                username: "",
                password: "",
                email: "",
            });
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

    console.log(formData);
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div id="signup_form">
                    <h3>Signup</h3>
                    <form onSubmit={handleSubmit} id="signup_form_submit">
                        <div className="mb-2">
                            <label htmlFor="username" className="form-label">
                                username
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

                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">
                                password
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

                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">
                                email
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

                        <button className="btn btn-primary">Sign UP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default SignupComponent
