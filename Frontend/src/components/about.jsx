import React from 'react'

const about = () => {
    return (
        <div class="sm:flex items-center max-w-screen-xl mt-20 dark:bg-slate-900 dark:text-white">
            <div class="sm:w-1/2 p-10">
                <div class="image object-center text-center">
                    <img src="https://i.imgur.com/WbQnbas.png" />
                </div>
            </div>
            <div class="sm:w-1/2 p-5">
                <div class="text">
                    <span class="text-gray-500 border-b-2 border-indigo-600 uppercase dark:text-white">About us</span>
                    <h2 class="my-4 font-bold text-3xl  sm:text-4xl dark:text-white">About <span class="text-indigo-600 dark:text-blue">Our Project</span>
                    </h2>
                    <p class="text-gray-700 dark:text-white">
                    Welcome to House of Books, your premier destination for a vast and diverse collection of literary treasures. Our online 
                    library, curated by Ritish Saini, Rishav, Rhythm Goyal, and Rehaan Omkar, is dedicated to providing readers with seamless 
                    access to a world of knowledge and imagination. We believe in the transformative power of books and strive to make reading 
                    more accessible and enjoyable for everyone. With our user-friendly platform and curated selections, House of Books is your 
                    gateway to discovering new favorites and rediscovering old ones. Join us on this literary journey and let the adventure 
                    begin!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default about
