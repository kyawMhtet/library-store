import React, { useState } from 'react'
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function useSignOut() {
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let logout = async () => {
        try {
            setLoading(true);
            let res = await signOut(auth);
            setLoading(false);
            setError(false);
            return res.user;
        } catch (e) {
            setLoading(false);
            setError(e.message);
        }
    }


    return { error, loading, logout };
}
