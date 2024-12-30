import React from 'react';
import ProductCard from './ProCard/SingleProCard';  // Your existing ProductCard component

const BestSellingProducts = () => {
  const bestSellers = [
    {
      id: 1,
      name: "AgriPro 3 HP Butterfly Combined Rice Mill Machine",
      brand: "AgriPro",
      currentPrice: 30679,
      originalPrice: 63199,
      discount: "51.46% OFF",
      image: "/Product/1.webp"  // Replace with actual image path
    },
    {
      id: 2,
      name: "AgriPro 5 HP Combined Rice Mill Machine",
      brand: "AgriPro",
      currentPrice: 45999,
      originalPrice: 89999,
      discount: "48.89% OFF",
      image: "/Product/1.webp"  // Replace with actual image path
    },
    {
      id: 3,
      name: "AgriPro Multi Crop Thresher",
      brand: "AgriPro",
      currentPrice: 35999,
      originalPrice: 71999,
      discount: "50% OFF",
      image: "/Product/1.webp"  // Replace with actual image path
    },
    {
        id: 4,
        name: "AgriPro Multi Crop Thresher",
        brand: "AgriPro",
        currentPrice: 35999,
        originalPrice: 71999,
        discount: "50% OFF",
        image: "/Product/1.webp"  // Replace with actual image path
      },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Best Selling Products</h2>
        <p className="text-gray-600">Our most popular products based on sales</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestSellers.map((product) => (
          <div key={product.id} className="relative">
            {/* Best Seller Badge */}
            <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full">
              Best Seller
            </div>
            
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;