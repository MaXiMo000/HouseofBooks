import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Course() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/book`);
        console.log(res);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBook();
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="pt-24 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
          Discover our diverse selection of books available in our online bookstore. From J.K. Rowling's enchanting "Harry Potter and the 
          Sorcerer's Stone" to George Orwell's thought-provoking "1984," we offer a variety of genres to suit every reader's taste. Explore 
          J.R.R. Tolkien's timeless adventure "The Hobbit" or Jane Austen's classic romance "Pride and Prejudice." Dive into gripping narratives 
          with Dan Brown's "The Da Vinci Code" and Stephen King's chilling "The Shining." Each book comes with high-quality cover images for an 
          immersive browsing experience.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>

        <div className="flex align-center justify-center gap-10  mt-10">
          <h1 className="text-4xl font-extrabold text-black mb-8 dark:bg-slate-800 dark:text-white text-center mt-4">
              To Search By Categories-{">"}
          </h1>

          <Link to='/category'>
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
            >
                Search
            </button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
