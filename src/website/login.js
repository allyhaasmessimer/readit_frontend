import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "../css/login.css";
import LoginForm from "./LoginForm";
const apiUrl = "https://readit1-1f9246305140.herokuapp.com/login/";

const storeAuthToken = (token) => {
    try {
        const serializedToken = JSON.stringify(token);
        localStorage.setItem("authToken", serializedToken);
    } catch (error) {
        console.error("Error storing token:", error);
    }
};

function LoginComponent() {
    const [token, setToken] = useState(
        localStorage.getItem("authToken") || null
    );

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginStatus, setLoginStatus] = useState("");

    const handleLogin = useCallback(async (credentials) => {
        try {
            const response = await axios.post(
                "https://readit1-1f9246305140.herokuapp.com/login/",
                credentials
            );
            if (response.status === 200) {
                setLoginStatus("YOU'RE SIGNED UP");
                const authToken = response.data.token;
                console.log("RESPONSE: ", response);
                console.log("authToken: ", authToken);
                storeAuthToken(authToken);
                setToken(authToken);
                window.location.reload();
            }
        } catch (error) {
            console.error("Authentication failed: ", error);
            setLoginStatus("login failed.");
        }
    }, []);

    const handleChangeInput = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;

        setFormData({
            ...formData,
            [inputName]: value,
        });
    };

    return (
        <>
            <h3 className="title-login">LOGIN</h3>
            {loginStatus && <div className="login-status">{loginStatus}</div>}
            <LoginForm onLogin={handleLogin} />
        </>
    );
}

export default LoginComponent;
