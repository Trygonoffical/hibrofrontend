"use client"
import React from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProCard/SingleProCard';
import './Slide.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Custom arrow components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-6 h-6 text-gray-600" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
    aria-label="Next slide"
  >
    <ChevronRight className="w-6 h-6 text-gray-600" />
  </button>
);

const BestSelling = ({title}) => {
  const products = [
    {
      id: 1,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"
    },
    {
      id: 2,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"
    },
    {
      id: 3,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"
    },
    {
      id: 4,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"
    },
    {
      id: 5,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
          dots: true // Show dots on mobile
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
        {title}
        </h2>
        <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-2"></div>
      </div>
      
      <div className="relative px-4 ">
        <Slider {...settings} className="best-selling-slider">
          {products.map((product, idx) => (
            <div key={idx} className="px-2 pb-5">
              <ProductCard {...product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSelling;