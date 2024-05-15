import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

export default function useFirestore() {



    let getCollection = (colName, _q) => {

        let [data, setData] = useState([]);
        let [error, setError] = useState("");
        let [loading, setLoading] = useState(false);

        let qRef = useRef(_q).current;
        useEffect(() => {
            setLoading(true);
            let ref = collection(db, colName);
            let q = query(ref, orderBy("date", "desc"));
            // getDocs(q).then();\
            onSnapshot(q, (docs) => {
                if (docs.empty) {
                    setError("No Results Found!");
                    setLoading(false);
                } else {
                    let collectionDatas = [];
                    docs.forEach((doc) => {
                        // console.log(doc.data());
                        let document = { id: doc.id, ...doc.data() };
                        collectionDatas.push(document);
                        setData(collectionDatas);

                        setLoading(false);
                        setError("");
                    });
                }
            });
        }, [qRef]);

        return { data, error, loading };
    }


    let getDocument = (colName, id) => {

        let [error, setError] = useState("");
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState(null);

        useEffect(() => {
            setLoading(true);
            let ref = doc(db, colName, id);
            // getDoc(ref).then();
            onSnapshot(ref, (doc) => {
                // console.log(doc.id);
                // console.log(doc.data());
                // console.log(doc.exists());
                if (doc.exists()) {
                    let document = { id: doc.id, ...doc.data() };
                    setData(document);
                    setLoading(false);
                    setError("");
                } else {
                    setError("No Document Found!");
                    setLoading(false);
                }
            });
        }, [id]);

        return { error, loading, data };
    }


    let addCollection = (colName, data) => {
        data.date = serverTimestamp();
        let ref = collection(db, colName);
        return addDoc(ref, data);
    }



    let updateCollection = (colName, id, data) => {
        data.date = serverTimestamp();

        let ref = doc(db, colName, id);
        return updateDoc(ref, data);
    }


    let deleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);

        return deleteDoc(ref);
    }




    return { getCollection, getDocument, deleteDocument, addCollection, updateCollection };
}
