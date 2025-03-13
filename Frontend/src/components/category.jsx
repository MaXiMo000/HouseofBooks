import React, {useState} from 'react'
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Category = () => {
    const [categoryQuery, setcategoryQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleCat = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.get(`${BACKEND_URL}/category`, {
            params: { category: categoryQuery },
        });
        setResults(response.data);
        setError(null);

        } catch (err) {
            console.log(err);
        setError(err.response?.data?.message || 'No Books in this category found');
        setResults([]);
        }
    };

    return (
    <div className="min-h-screen  flex flex-col items-center pt-12 mt-20 dark:bg-slate-800 dark:text-white">
        <div className="w-full max-w-xl mx-auto text-center dark:bg-slate-800 dark:text-white">
            <h1 className="text-4xl font-extrabold text-black mb-8 dark:bg-slate-800 dark:text-white">
            Categories
            </h1>
            <form
            onSubmit={handleCat}
            className="flex flex-col items-center mb-10"
            >
            <input
                type="text"
                value={categoryQuery}
                onChange={(e) => setcategoryQuery(e.target.value)}
                placeholder="Enter book title"
                className="w-64 px-4 py-2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out text-black"
            />
            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
            >
                Search
            </button>
            </form>

            {error && (
            <p className="text-red-500 text-center mb-8">{error}</p>
            )}

            <div className="mt-4 dark:bg-slate-800 dark:text-white grid grid-cols-2 md:grid-cols-2 gap-40 justify-center items-center">
            {results.map((result, index) => (
                <div
                key={index}
                className="bg-white dark:bg-slate-800 dark:text-white flex flex-col items-center p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2"
                style={{ width: '300px', height: '400px', maxWidth: '400px'}}
                >
                <img
                    src={result.image}
                    alt={result.title}
                    className="w-60 h-60 object-contain rounded-md mb-2 dark:bg-slate-800 dark:text-white"
                />
                <div className="text-center">
                    <h2 className="dark:bg-slate-800 dark:text-white text-md font-semibold text-black truncate">
                    {result.title}
                    </h2>
                    <p className=" dark:bg-slate-800 dark:text-white text-sm text-gray-700 truncate">Category: {result.category}</p>
                    <p className="dark:bg-slate-800 dark:text-white text-sm text-gray-700 font-semibold truncate">Price: ${result.price}</p>
                </div>
                <a href="/course"
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
                    >See Book</a>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}

export default Category