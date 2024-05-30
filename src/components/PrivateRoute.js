import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export function PrivateRoute({Component}) {
    const { currentUser, userauthStateChange } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await userauthStateChange();
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    } else {
        return currentUser ? Component : <Navigate to="/" />;
    }
}
