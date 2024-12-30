"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Cat.module.css'
const CategoryCard = ({ name, image, isNew }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="relative mb-2">
      <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center relative">
        {isNew && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-medium px-1 py-0.5 rounded-full z-10">
            New
          </div>
        )}
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>
    <span className="text-sm font-medium text-gray-700 text-center">{name}</span>
  </div>
);

const AllCategories = () => {
  

  const categories = [
    { name: 'Fly Catcher & Killer Machine', image: '/Images/cat1.webp', isNew: true },
    { name: 'Bird Spikes', image: '/Images/cat1.webp' },
    { name: 'Agriculture Sprayers', image: '/Images/cat1.webp' },
    { name: 'Rodent Bait Station', image: '/Images/cat1.webp' },
    { name: 'Insecticide Chemicals', image: '/Images/cat1.webp' },
    { name: 'Nylon Bird Net', image: '/Images/cat1.webp' },
    { name: 'Animal Repellent', image: '/Images/cat1.webp' },
    { name: 'Agricultural Hand Sprayers', image: '/Images/cat1.webp' },
    { name: 'PVC Strip Curtain', image: '/Images/cat1.webp' },
    { name: 'All Categoreis', image: '/Images/cat1.webp' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    prevArrow: <button className="slick-prev"><ChevronLeft className="w-6 h-6" /></button>,
    nextArrow: <button className="slick-next"><ChevronRight className="w-6 h-6" /></button>,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Explore Our Categories
        </h2>
        <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-2"></div>
      </div>

        <div className="md:hidden">
            <Slider {...sliderSettings} className=" categories-slider ">
            {categories.map((category, idx) => (
                <div key={idx} className="px-2">
                <CategoryCard {...category} />
                </div>
            ))}
            </Slider>
        </div>
        

        <div className="hidden md:grid">
            <div className="grid grid-cols-5 gap-1 mb-8">
            {categories.map((category, idx) => (
              <div key={idx}>
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default AllCategories;