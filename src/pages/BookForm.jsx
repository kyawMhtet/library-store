import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

export default function Create() {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [isEdit, setIsEdit] = useState(false);

  let { addCollection, updateCollection } = useFirestore();

  const navigate = useNavigate();

  const addCategory = (e) => {
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }

    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };

  // let { setPostData, data: book } = useFetch(
  //   "http://localhost:3000/books",
  //   "POST"
  // );

  let { user } = useContext(AuthContext);

  const submitForm = async (e) => {
    e.preventDefault();

    let data = {
      title,
      description,
      categories,
      uid: user.uid,
    };

    if (isEdit) {
      updateCollection("books", id, data);
    } else {
      addCollection("books", data);
    }
    navigate("/");
  };

  // useEffect(() => {
  //   if (book) {
  //     navigate("/");
  //   }
  // }, [book]);

  useEffect(() => {
    if (id) {
      setIsEdit(true);

      let ref = doc(db, "books", id);

      getDoc(ref).then((doc) => {
        if (doc.exists()) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setDescription(description);
          setCategories(categories);
        }
      });
    } else {
      setIsEdit(false);
      setTitle("");
      setDescription("");
      setCategories([]);
    }
  }, []);

  let { isDark } = useTheme();

  return (
    <div className="h-screen">
      <form className="w-full max-w-lg mx-auto mt-5" onSubmit={submitForm}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-last-name"
            >
              Book Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Description
            </label>
            <textarea
              name=""
              id=""
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p> */}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-last-name"
            >
              Categories
            </label>

            <div className="flex gap-1">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Categories"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />

              <button
                className="bg-primary p-2 rounded-lg hover:bg-blue-600"
                onClick={addCategory}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap mt-1">
              {categories &&
                categories.map((c) => (
                  <span
                    className="mx-1 my-1 text-white uppercase rounded-xl px-2 py-1 text-sm bg-blue-500"
                    key={c}
                  >
                    {c}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary w-full rounded text-white py-2 flex items-center justify-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="hidden md:block">
            {isEdit ? "Update" : "Create"} book
          </span>
        </button>
      </form>
    </div>
  );
}
