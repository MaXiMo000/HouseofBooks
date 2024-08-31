import React from 'react'
import Navbar from "../components/Navbar";
import About from '../components/about';
import Footer from "../components/Footer";

const abouts = () => {
    return (
    <>
        <Navbar />
        <div className=" min-h-screen">
            <About />
        </div>
        <Footer />
    </>
    )
}

export default abouts
