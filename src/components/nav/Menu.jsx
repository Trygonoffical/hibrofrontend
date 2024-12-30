// import Link from 'next/link'
// import React from 'react'

// const Menu = () => {
//   return (
//     <div className='hidden md:block w-full bg-[#f1f1f1]'>
//         <div className='mx-auto flex justify-center max-w-7xl py-2 px-4 lg:px-8 space-x-4'>
//             <Link href='#'>Menu</Link>
//             <Link href='#'>Menu</Link>
//             <Link href='#'>Menu</Link>
//             <Link href='#'>Menu</Link>
//             <Link href='#'>Menu</Link>
//             <Link href='#'>Menu</Link>
//         </div>
//     </div>
//   )
// }

// export default Menu

"use client"
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      id: 'safety',
      name: 'Safety Equipment',
      subCategories: [
        {
          name: 'Personal Protection',
          items: ['Safety Helmet', 'Safety Shoes', 'Safety Gloves']
        }
      ],
      featuredProducts: [
        {
          id: 1,
          name: 'Safety Helmet',
          image: '/products/helmet.jpg',
          price: '₹2999',
          callNow: '7011433755'
        },
        {
          id: 2,
          name: 'Safety Shoes',
          image: '/products/shoes.jpg',
          price: '₹1999',
          callNow: '7011433755'
        }
      ]
    },
    {
      id: 'industrial',
      name: 'Industrial Tools',
      subCategories: [
        {
          name: 'Power Tools',
          items: ['Drill Machine', 'Angle Grinder']
        },
        {
          name: 'Hand Tools',
          items: ['Wrench Set', 'Screwdriver Set']
        }
      ],
      featuredProducts: [
        {
          id: 3,
          name: 'Drill Machine',
          image: '/products/drill.jpg',
          price: '₹2999',
          callNow: '7011433755'
        },
        {
          id: 4,
          name: 'Angle Grinder',
          image: '/products/grinder.jpg',
          price: '₹1999',
          callNow: '7011433755'
        }
      ]
    }
  ];

  return (
    <div className=" hidden md:block relative ">
      {/* Main Navigation */}
      <nav className="bg-[#f1f1f1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-start space-x-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <button className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 transition-colors">
                  <span className="text-sm font-medium">{category.name}</span>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mega Menu Content */}
      {activeCategory && (
        <div 
          className="absolute left-0 right-0 bg-white shadow-lg z-50"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 p-6">
            {/* Left Sidebar - Categories */}
            <div className="col-span-1 border-r pr-6">
              {categories.find(cat => cat.id === activeCategory)?.subCategories.map((subCat, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">{subCat.name}</h3>
                  <ul className="space-y-2">
                    {subCat.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link 
                          href="#" 
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        >
                          <ChevronRight className="w-4 h-4 mr-1" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right Side - Featured Products */}
            <div className="col-span-3">
              <div className="grid grid-cols-3 gap-6">
                {categories.find(cat => cat.id === activeCategory)?.featuredProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        CALL NOW : {product.callNow}
                      </div>
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-medium">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <p className="text-sm text-gray-600">Free shipping on orders over ₹1000</p>
              <Link 
                href="#" 
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                View All Products →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;