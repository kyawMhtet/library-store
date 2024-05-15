import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useSignIn() {
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);


    let signIn = async (email, password) => {
        try {
            setLoading(true);
            let res = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            setError(false);
            return res.user;
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }


    return { error, loading, signIn };
}
