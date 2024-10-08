import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Contacts from "./contacts/Contacts";
import Searchs from "./searchs/Searchs";
import Abouts from "./abouts/abouts";
import Categories from "./categories/categories"
import Carts from "./carts/Carts";
import Admin from "./components/Admin"

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course" 
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/search" element={<Searchs />} />
          <Route path="/about" element={<Abouts />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/cart" element={<Carts/>}/>
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
