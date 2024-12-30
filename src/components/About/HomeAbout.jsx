"use client"
import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import './about.module.css'
const AboutSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div className="relative group">
          {/* Background decorative elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full 
                        group-hover:scale-150 transition-transform duration-500 ease-out" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full 
                        group-hover:scale-150 transition-transform duration-500 ease-out delay-100" />
          
          {/* Main image container */}
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-blue-500/20 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image
              src="/Images/aboutbg.png"
              alt="About Us"
              width={600}
              height={600}
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {/* Section Title */}
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              About Our Company
            </h2>
            <div className="w-1/2 h-1 bg-orange-500 transform origin-left hover:scale-x-150 transition-transform duration-300" />
          </div>

          {/* Main Content */}
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed animate-fadeIn">
              We are passionate about creating beautiful and functional spaces that inspire. 
              With over a decade of experience in furniture design and manufacturing, 
              we&apos;ve built a reputation for quality, innovation, and customer satisfaction.
            </p>
            <p className="leading-relaxed  animate-fadeIn animation-delay-200">
              Our team of skilled artisans and designers work tirelessly to bring you 
              furniture that combines aesthetics with practicality, ensuring each piece 
              tells its own unique story while serving its purpose perfectly.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 py-6 animate-fadeIn animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">10+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">50+</div>
                <div className="text-sm text-gray-500">Store Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">10k+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
            </div>

            {/* Download Button */}
            <button className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white 
                           rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-800
                            animate-fadeIn animation-delay-600">
              <span className="relative z-10">Download Profile</span>
              <Download className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-500 transform origin-left scale-x-0 
                           group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;