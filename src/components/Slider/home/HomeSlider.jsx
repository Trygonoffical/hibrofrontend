"use client"
import React, { useState, useEffect, useCallback } from 'react';

const HomeSlider = () => {
    const slides = [
        {
            image: 'https://picsum.photos/800/400?random=1',
            alt: 'Slide 1',
            link: '/product1'
        },
        {
            image: 'https://picsum.photos/800/400?random=2',
            alt: 'Slide 2',
            link: '/product2'
        },
        {
            image: 'https://picsum.photos/800/400?random=3',
            alt: 'Slide 3',
            link: '/product3'
        }
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length]);

    // Auto-sliding effect
    useEffect(() => {
        let slideInterval;
        
        if (!isPaused) {
            slideInterval = setInterval(() => {
                goToNext();
            }, 3000); // Change slide every 3 seconds
        }

        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };
    }, [isPaused, goToNext]);

    return (
        <div 
            className="relative w-full aspect-[16/9] max-h-[600px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
                onClick={goToPrevious}
            >
                <span className="text-2xl">&#10094;</span>
            </button>
            <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
                onClick={goToNext}
            >
                <span className="text-2xl">&#10095;</span>
            </button>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {index === currentIndex && (
                        <a href={slide.link} className="block w-full h-full">
                            <img 
                                src={slide.image} 
                                alt={slide.alt} 
                                className="w-full h-full object-cover"
                            />
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomeSlider;