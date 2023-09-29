import React, { useCallback, useEffect, useState } from "react";
import "../css/logout.css";

function LogoutComponent() {
    const [logoutStatus, setLogoutStatus] = useState("");

    const handleLogout = useCallback(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
            try {
                localStorage.removeItem("authToken");
                setLogoutStatus("Logout successful");
                window.location.reload();
            } catch (error) {
                console.error("Logout failed: ", error);
                setLogoutStatus("Logout failed. Please try again.");
            }
        } else {
            setLogoutStatus("No token found. Nothing to logout from.");
        }
    }, []);

    return (
        <>
            <div className="logout-container">
                <h3 className="title-logout">LOGOUT</h3>
                <button className="logout-button" onClick={handleLogout}>
                    LOGOUT
                </button>
            </div>
            {logoutStatus && <p>{logoutStatus}</p>}
        </>
    );
}

export default LogoutComponent;
