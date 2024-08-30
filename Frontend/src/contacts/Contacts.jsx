import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Contacts() {
    return (
    <div>
        <Navbar />
        <div className=" min-h-screen">
            <Contact />
        </div>
        <Footer />
    </div>
    )
}

export default Contacts