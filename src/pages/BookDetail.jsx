import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookImg from "../assets/book.png";
import useFetch from "../hooks/useFetch";
import useTheme from "../hooks/useTheme";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import useFirestore from "../hooks/useFirestore";

const BookDetail = () => {
  //   console.log(params.id);
  // let {
  //   data: book,
  //   loading,
  //   error,
  // } = useFetch(`http://localhost:3000/books/${id}`);

  let { id } = useParams();

  let { getDocument } = useFirestore();

  let { data: book, error, loading } = getDocument("books", id);

  if (error) {
    return <p>{error}</p>;
  }

  let { isDark } = useTheme();

  return (
    <>
      {loading && <p>loading...</p>}
      {book && (
        <div
          className={`grid grid-cols-2 h-screen ${isDark ? "text-white" : ""}`}
        >
          <div>
            <img src={bookImg} alt="" className="w-[70%]" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <div className="space-x-3">
              {book.categories.map((category) => (
                <span
                  className="bg-blue-500 text-white rounded-full text-sm px-2 py-1"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetail;
