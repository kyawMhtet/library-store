import React, { useContext, useEffect, useState } from "react";
import book from "../assets/book.png";
import useFetch from "../hooks/useFetch";
import { Link, NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { db } from "../firebase/index";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import trashIcon from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

const BookList = () => {
  // let { data: books, loading, error } = useFetch("http://localhost:3000/books");

  let { getCollection, deleteDocument } = useFirestore();

  let { user } = useContext(AuthContext);

  let {
    data: books,
    error,
    loading,
  } = getCollection("books", ["uid", "==", user.uid]);

  const deleteBook = async (e, id) => {
    e.preventDefault();

    await deleteDocument("books", id);

    // setBooks((prev) => prev.filter((b) => b.id != id));
  };

  if (error) {
    return <p>{error}</p>;
  }

  let { isDark } = useTheme();

  return (
    <>
      {loading && <p>Loading ...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
        {books &&
          books.map((b) => (
            <Link to={`/detail/${b.id}`} key={b.id}>
              <div
                className={`p-4 border border-1 min-h-[420px] ${
                  isDark ? "bg-dcard border-primary text-white" : ""
                } `}
              >
                <img src={book} alt="" />
                <div className="text-center space-y-2 mt-3">
                  <h1>{b.title}</h1>
                  <p>{b.description}</p>
                  {/* genres */}
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      {b.categories.map((c) => (
                        <span
                          className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                          key={c}
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <NavLink to={`/edit/${b.id}`}>
                        <img src={edit} alt="" />
                      </NavLink>

                      <img
                        src={trashIcon}
                        alt=""
                        onClick={(e) => deleteBook(e, b.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default BookList;
