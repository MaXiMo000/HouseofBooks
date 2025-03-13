import React from "react";
import {Link} from "react-router-dom"
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Cards({ item }) {

  const handleAddToCart = async () => {
    const users = JSON.parse(localStorage.getItem('Users'));

    if (!users || !users._id) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      // Send item data to the backend using query params (you could also send it as a POST request)
      const response = await axios.get(`${BACKEND_URL}/cart/add`, {
        params: {
          image: item.image,
          name: item.name,
          price: item.price,
          category: item.category,
          title: item.title
        }
      });
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 p-2 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img className="w-80 h-80 object-contain" src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">${item.price}</div>
              <Link to="/course">
                <div onClick={handleAddToCart} className=" cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                  Buy Now
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;