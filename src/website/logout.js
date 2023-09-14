import React, { useState } from "react";
import "../css/logout.css";

const apiUrl = "https://readit1-1f9246305140.herokuapp.com/logout/";

function LogoutComponent({ onLogout }) {
    const [logoutStatus, setLogoutStatus] = useState("");

    const handleLogout = async () => {
        const storedToken = localStorage.getItem("yourToken");

        if (!storedToken) {
            console.error("Token is not available.");
            setLogoutStatus("Token Not Found");
            return;
        }

        console.log("Before deleting token:", storedToken);

        const url = apiUrl;
        const fetchConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${storedToken}`,
            },
        };

        try {
            const response = await fetch(url, fetchConfig);

            console.log("After fetch:", storedToken);

            if (response.ok) {
                localStorage.removeItem("yourToken");
                console.log("Token deleted successfully.");
                setLogoutStatus("Logout Successful");
                onLogout(); // Call the callback function to update the token state in the App component
            } else {
                setLogoutStatus("Logout Failed");
            }
        } catch (error) {
            console.error("Logout Error:", error);
            setLogoutStatus("Logout Error");
        }
    };

    return (
        <div>
            <p>Status: {logoutStatus}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LogoutComponent;
