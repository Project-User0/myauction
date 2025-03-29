import React, { useState } from 'react';

function Usernav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="w-full flex justify-between items-center border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 fixed top-0 left-0 bg-white z-1000">
                <div>
                    <p className="font-semibold text-[24px] xl:text-[20px] md:text[16px]"> <a href="/"><span className="text-rose-700">My</span>Auction</a> </p>
                </div>
                <div className="flex text-[13px] gap-2 px-2 items-center py-[6px] border-none bg-gray-100 rounded-[50px] xl:w-[600px] lg:w-[400px] md:w-[500px] sm:w-[400px] w-[160px]">
                    <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                    <input className="outline-none text-gray-800 w-full" type="text" placeholder="Search your items here...." />
                </div>
                <div className="hidden xl:flex lg:flex">
                    <ul className="flex gap-4 text-[13px] font-semibold">
                        <li className="hover:text-red-600"><a href="#product">Products</a></li>
                        <li className="hover:text-red-600"><a href="#about">About Us</a></li>
                        <li className="hover:text-red-600"><a href="#service">Service</a></li>
                        <li className="hover:text-red-600"><a href="#contact">Contact</a></li>
                        <li className="hover:text-red-600"><a href="#review">Review</a></li>
                    </ul>
                </div>
                <div className="xl:flex lg:flex hidden">
                    <div className="flex gap-2">
                        <button className="px-3 py-[3px] text-[13px] effectHover">
                            <a href="/login"><span className="navanimate"></span>Login</a>
                        </button>
                        <button className="px-3 py-[3px] text-[13px] border signup">
                            <a href="/signup"><span className="signanimate"></span>Signup</a>
                        </button>
                    </div>
                </div>
                <div className="flex xl:hidden lg:hidden p-2 shadow-md cursor-pointer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>

            {isMenuOpen && (
                <div className="flex flex-col justify-center px-10 py-4 bg-gray-100 fixed top-14 left-0 w-full z-50 shadow-lg">
                    <div className="flex">
                        <ul className="flex flex-col px-8 gap-4 text-[13px] font-semibold">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#service">Service</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li><a href="#review">Review</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/signup">Signup</a></li>
                        </ul>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-2 border-b border-gray-300 xl:px-16 lg:px-12 md:px-10 px-6 py-3 mt-16" id="home">
                <div className="flex flex-wrap gap-4">
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        All items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        New items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Populars
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Upcoming items
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Electronics
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Transports
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Communication
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Antique
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Clothings
                    </button>
                    <button className="font-semibold text-[13px] cursor-pointer hover:shadow-md p-1 rounded">
                        Softwares
                    </button>
                </div>
            </div>
        </>
    );
}

export default Usernav;
