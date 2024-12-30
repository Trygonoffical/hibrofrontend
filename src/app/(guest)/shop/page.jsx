'use client'

import React, { useState, useEffect } from 'react';
import { Star, Search, Filter, X, ShoppingCart } from 'lucide-react';
import PageHead from '@/components/Pagehead/PageHead';
import ProductCard from '@/components/Products/ProCard/SingleProCard';

const ShopPage = () => {
  // Initial product data
  const initialProducts = [
    {
      id: 1,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Fly Catcher & Killer Machine',

      
    },
    {
      id: 2,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Fly Catcher & Killer Machine',

    },
    {
      id: 3,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Fly Catcher & Killer Machine',

    },
    {
      id: 4,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Rodent Bait Station' 

    },
    {
      id: 5,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Bird Spikes' 

    },
    {
      id: 6,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Bird Spikes' 

    },
    {
      id: 7,
      name: "Rodent Trap Box",
      brand: "hibro",
      currentPrice: 30679,
      originalPrice: 63199,
      price: 1000, oldPrice: 2000, rating: 5,
      discount: "51.46% OFF",
      image: "/Product/1.webp",
      category: 'Bird Spikes' 

    },
  ];

  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [cart, setCart] = useState([]);

  const categories = ['All', 'Fly Catcher & Killer Machine', 'Bird Spikes', 'Agriculture Sprayers', 'Rodent Bait Station' ,'Insecticide Chemicals', 'Nylon Bird Net','Animal Repellent','Agricultural Hand Sprayers','PVC Strip Curtain'];

  // Filter and search function
  const filterProducts = () => {
    let result = [...products];

    // Apply search filter
    if (searchTerm.trim()) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  // Effect to run filtering when any filter changes
  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  // Add to cart functionality
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Handle price range change
  const handlePriceRangeChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    filterProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
    <PageHead title={'Shop Now'} />
      <div className="max-w-7xl mx-auto px-4 mt-10">
        {/* Header with search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Our Products</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>

          {/* Sort dropdown and mobile filter button */}
          <div className="flex gap-4 items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>

            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(e, 'min')}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(e, 'max')}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="form-radio text-green-600"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Mobile Filters Content */}
              <div className="space-y-6">
                {/* Price Range Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 'min')}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                      <input
                        type="range"
                        min="0"
                        max="3000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 'max')}
                        className="w-full"
                      />
                      <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Categories Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="form-radio text-green-600"
                        />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;