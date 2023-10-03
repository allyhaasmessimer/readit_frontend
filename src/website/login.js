import { useCallback, useState } from "react";
import axios from "axios";
import "../css/login.css";
import LoginForm from "./LoginForm";

const storeAuthToken = (token) => {
    try {
        const serializedToken = JSON.stringify(token);
        localStorage.setItem("authToken", serializedToken);
    } catch (error) {
        console.error("Error storing token:", error);
    }
};

function LoginComponent() {
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
                storeAuthToken(authToken);
                window.location.reload();
            }
        } catch (error) {
            console.error("Authentication failed: ", error);
            setLoginStatus("login failed.");
        }
    }, []);

    return (
        <>
            <h3 className="title-login">LOGIN</h3>
            {loginStatus && <div className="login-status">{loginStatus}</div>}
            <LoginForm onLogin={handleLogin} />
        </>
    );
}

export default LoginComponent;
