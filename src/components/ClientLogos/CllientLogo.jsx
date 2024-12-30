"use client"
import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import './Client.module.css'

const ClientCarousel = () => {
    const clients = [
        { id: 1, name: 'Client 1', logo: '/clients/01.webp' },
        { id: 2, name: 'Client 2', logo: '/clients/02.svg' },
        { id: 3, name: 'Client 3', logo: '/clients/03.webp' },
        { id: 4, name: 'Client 4', logo: '/clients/04.webp' },
        { id: 5, name: 'Client 5', logo: '/clients/05.svg' },
        { id: 6, name: 'Client 6', logo: '/clients/06.webp' },
        { id: 7, name: 'Client 7', logo: '/clients/07.webp' },
        { id: 8, name: 'Client 8', logo: '/clients/08.webp' },
    ];

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row items-stretch">
                {/* Left section with "Our Clients" */}
                <div className="w-full md:w-1/3 relative mb-4 md:mb-0">
                    {/* Base shape */}
                    <div className="bg-gray-200 h-full w-full relative">
                        {/* Modified shape using clip-path */}
                        <div 
                            className="absolute top-0 left-0 h-full w-full bg-gray-200"
                            style={{
                                clipPath: 'polygon(0 0, 100% 15%, 85% 100%, 0% 100%)'
                            }}
                        />
                        {/* Overlay for additional styling */}
                        <div 
                            className="absolute top-0 right-0 h-full w-full bg-white"
                            style={{
                                clipPath: 'polygon(85% 0, 100% 0, 100% 100%, 70% 100%)'
                            }}
                        />
                        {/* Text content */}
                        <div className="h-full flex items-center relative z-10 py-4 md:py-0">
                            <h2 className="text-2xl md:text-3xl font-bold px-6 md:px-12">Our Clients</h2>
                        </div>
                    </div>
                </div>

                {/* Right section with carousel */}
                <div className="w-full md:w-2/3 px-4 md:pl-12 py-2 md:py-4">
                    <Slider {...settings} className="clients-slider">
                        {clients.map((client) => (
                            <div key={client.id} className="px-2 p-2 md:px-4">
                                <Image
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    width={120}
                                    height={150}
                                    className="w-auto h-auto mx-auto"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ClientCarousel;