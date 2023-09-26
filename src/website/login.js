import React, { useCallback, useState } from "react";
import axios from "axios";
import "../css/login.css";

const storeAuthToken = (token) => {
  try {
    const serializedToken = JSON.stringify(token);
    localStorage.setItem("authToken", serializedToken);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

function LoginComponent() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://readit1-1f9246305140.herokuapp.com/login/",
        formData
      );

      const authToken = response.data.token;
      storeAuthToken(authToken);

      setLoginStatus("Login successful");
    } catch (error) {
      console.error("Authentication failed: ", error);
      setLoginStatus("Login failed. Please check your credentials.");
    }
  }, [formData]);

  return (
    <div className="login1">
      <h3 className="title-login">LOGIN</h3>
      <form onSubmit={handleSubmit} className="login-form" id="login_form_submit">
        {loginStatus && <div className="login-status">{loginStatus}</div>}

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
            type="password"
            name="password"
            id="password"
            className="form-control"
          />
        </div>

        <button type="submit" className="login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;
