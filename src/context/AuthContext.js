import React, { useContext, useEffect, useState } from "react";
import { jwtVerify } from 'jose';
const AuthProvider = React.createContext();

export function useAuth() {
  return useContext(AuthProvider);
}


export function AuthContext({ children }) {
    const [currentProduct, setCurrentProduct] = useState();
    const [currentCompleteProduct,setCurrentCompleteProduct] = useState();
    const [currentUser,setCurrentUser] = useState();
    const secretKey = new TextEncoder().encode('secretkey');
    const [loading, setLoading] = useState(true);


    function authStateChange() {
        setLoading(true);
        const response = localStorage.getItem("product");
        if (response) {
            setCurrentProduct(JSON.parse(response));
        } else {
            setCurrentProduct(undefined);
        }
        setLoading(false); 
    }

    function completeauthStateChange() {
        setLoading(true);
        const response = localStorage.getItem("completeOrder");
        if (response) {
            setCurrentCompleteProduct(JSON.parse(response));
        } else {
            setCurrentCompleteProduct(undefined);
        }
        setLoading(false); 
    }

    async function userauthStateChange(){
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) setCurrentUser(undefined);

        try {
            const { payload } = await jwtVerify(token, secretKey);
            setCurrentUser(payload);

        } catch (error) {
            console.error('Invalid or expired token:', error);
            return null;
        }

    }

    useEffect(() => {
        authStateChange();
        completeauthStateChange();
    }, []);

    const value = {
        currentProduct,
        currentCompleteProduct,
        currentUser,

        setCurrentProduct,
        authStateChange,
        userauthStateChange,
        
        setCurrentUser,
        setCurrentCompleteProduct,
        completeauthStateChange
    };
    return (
        <AuthProvider.Provider value={value}>{children }</AuthProvider.Provider>
    );
}