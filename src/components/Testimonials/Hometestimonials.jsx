"use client"
import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Test.module.css'
const TestimonialCard = ({ name, role, company, image, content, rating }) => (
  <div className="p-6 h-full">
    <div className="bg-white rounded-xl p-6 shadow-lg h-full relative group hover:shadow-xl transition-shadow duration-300">
      {/* Decorative Elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-orange-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-blue-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
      
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="bg-orange-500 p-2 rounded-lg shadow-lg">
          <Quote className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="relative space-y-4">
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
          {content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{role} at {company}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      company: "Modern Spaces",
      image: "/Images/user.png",
      content: "The furniture pieces are not just beautiful but also incredibly functional. The attention to detail and quality craftsmanship is evident in every piece. I've recommended them to all my clients!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Home Owner",
      company: "Tech Innovations",
      image: "/Images/user.png",
      content: "I was skeptical about ordering furniture online, but their customer service and product quality exceeded my expectations. The delivery was prompt, and the assembly was a breeze.",
      rating: 4
    },
    {
      name: "Emily Rodriguez",
      role: "Architect",
      company: "Design Studios",
      image: "/Images/user.png",
      content: "What sets them apart is their commitment to sustainability without compromising on style. Each piece tells a story and adds character to any space.",
      rating: 5
    },
    {
      name: "David Wilson",
      role: "Project Manager",
      company: "Urban Living",
      image: "/Images/user.png",
      content: "The modular furniture collection is ingenious! Perfect for our office space that needed flexible solutions. The quality and durability are outstanding.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "Real Estate Agent",
      company: "Premier Properties",
      image: "/Images/user.png",
      content: "My clients love the wide range of styles available. The quality-to-price ratio is excellent, and the customer service is always helpful and professional.",
      rating: 4
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <ChevronLeft className="w-6 h-6" />,
    nextArrow: <ChevronRight className="w-6 h-6" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto" />
        </div>

        {/* Testimonial Slider */}
        <div className="testimonial-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </Slider>
        </div>
      </div>

      
    </div>
  );
};

export default TestimonialSection;