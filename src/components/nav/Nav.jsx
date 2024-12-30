"use client"
import React, { useState } from 'react';
import { Search, Truck, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { ShoppingCartIcon, TruckIcon } from '@heroicons/react/20/solid';
import CartArea from '../Cart/ShopingCart';
import Link from 'next/link';

const MainNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Sticky main MainNav */}
          
                <div className="max-w-7xl mx-auto">
                    {/* Main MainNav */}
                    <div className="flex items-center justify-between px-4 py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href='/' >
                            <span className="text-blue-400 text-2xl font-bold">HI-BRO</span>
                            <span className="text-white text-2xl font-bold ml-2">PRODUCT</span>
                            </Link>
                            {/* <Image src='/Images/logo.webp' width={150} height={70} className='w-auto h-16' alt='Hi-bro Product' />/ */}
                        </div>

                        {/* Search bar */}
                        <div className="hidden md:flex flex-1 justify-center">
                            <div className="flex max-w-2xl w-full">
                                <select className="bg-blue-700 text-white px-4 py-2  flex items-center rounded-l">
                                    <option value="all">All Categories</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="sports">Sports</option>
                                </select>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 focus:outline-none"
                                        placeholder="Search products..."
                                    />
                                    <button className="absolute right-0 top-0 bottom-0 px-4 bg-blue-700 text-white">
                                        <Search className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center text-white">
                                <Search className="h-6 w-6 hidden" />
                            </div>
                            <div className="flex items-center text-white">
                                <Link href='/OrderTracking'>
                                    <Image src='/Images/track.png' width={50} height={30} className="h-10 w-10" alt='tracking'  />
                                </Link>
                                
                            </div>
                            <div className="flex items-center text-white">
                                <CartArea />
                            </div>
                            <button className="bg-blue-700 text-white px-6 py-2 rounded hidden md:block">
                                Sign up / Login
                            </button>
                            <button className="text-white md:hidden" onClick={toggleMenu}>
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-gray-800/95 backdrop-blur-sm px-4 py-2">
                            <div className="flex flex-col space-y-4">
                                <button className="bg-blue-700 text-white px-6 py-2 rounded">
                                    Sign up / Login
                                </button>
                                <div className="flex">
                                    <select className="bg-blue-700 text-white px-4 py-2 flex items-center rounded-l">
                                        <option value="all">All Categories</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="home">Home</option>
                                        <option value="beauty">Beauty</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 focus:outline-none"
                                            placeholder="Search products..."
                                        />
                                        <button className="absolute right-0 top-0 bottom-0 px-4 bg-blue-700 text-white">
                                            <Search className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            
        </>
    );
};

export default MainNav;