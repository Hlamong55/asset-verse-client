import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';
import auth from '../firebase/auth';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleAuthProvider)
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])



    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        googleLogin,
        logOutUser
    }
    
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;