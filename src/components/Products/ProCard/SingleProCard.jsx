// "use client"
// import React, { useState, useRef, useEffect } from 'react';
// import { Truck, ChevronDown, X } from 'lucide-react';
// import Image from 'next/image';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '@/redux/slices/cartSlice';
// import { useRouter } from 'next/navigation';
// const ProductCard = ({ 
//   product
// }) => {
//   const [showBulkDiscount, setShowBulkDiscount] = useState(false);
//   const bulkDiscountRef = useRef(null);
//   const router = useRouter();

//   const dispatch = useDispatch();


//   const handleAddToCart = () => {
//       // Calculate prices as numbers to ensure proper calculations
//       const sellingPrice = parseFloat(product.selling_price);
//       const gstPercentage = parseFloat(product.gst_percentage);
//       const gstAmount = (sellingPrice * gstPercentage) / 100;
//       const totalPrice = sellingPrice + gstAmount;

//       const cartItem = {
//           id: product.id,
//           name: product.name,
//           slug: product.slug,
//           image: product.images[0].image, // Feature image
//           regular_price: parseFloat(product.regular_price),
//           selling_price: sellingPrice,
//           gst_percentage: gstPercentage,
//           gst_amount: gstAmount,
//           total_price: totalPrice,
//           qnt: 1,
//           stock: product.stock,
//           selectedAttributes: {} // For future use if needed
//       };

//       dispatch(addItemToCart(cartItem));
//   };

//   const BuyNow = ()=>{
//     handleAddToCart();
//     router.push('/checkout');
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (bulkDiscountRef.current && !bulkDiscountRef.current.contains(event.target)) {
//         setShowBulkDiscount(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const bulkOptions = [
//     {
//       quantity: '2-3',
//       price: Math.round(currentPrice * 0.9),
//       discount: '10% OFF'
//     },
//     {
//       quantity: '4-5',
//       price: Math.round(currentPrice * 0.87),
//       discount: '13% OFF'
//     },
//     {
//       quantity: '6-7',
//       price: Math.round(currentPrice * 0.85),
//       discount: '15% OFF'
//     },
//     {
//       quantity: '8-10',
//       price: Math.round(currentPrice * 0.82),
//       discount: '18% OFF'
//     }
//   ];

//   return (
//     <div className="relative w-full bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
//       {/* Best Seller Badge */}
//       {isBestSeller && (
//         <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full">
//           Best Seller
//         </div>
//       )}

//       {/* Shipping Badge */}
//       <div className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm mb-4">
//         <Truck className="w-4 h-4 mr-2" />
//         Ships within 24 hrs
//       </div>

//       {/* Main Content */}
//       <div className="relative">
//         {/* Product Image */}
//         <div className="relative aspect-square mb-4">
//           <Image
//             src={product.images[0].image}
//             alt={product.name}
//             className="object-contain"
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             priority={isBestSeller}
//           />
//         </div>
        

//         {/* Product Details */}
        
//           <div className="space-y-3 ">
//             <h2 className="text-xl font-semibold line-clamp-2">
//               {product.name}
//             </h2>
            
//             {/* <div className="flex items-center text-sm">
//               <span>By</span>
//               <span className="text-blue-600 ml-1">{brand}</span>
//             </div> */}

//             {/* Price Section */}
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-2xl font-bold">₹{product.regular_price.toLocaleString()}</span>
//               <span className="text-gray-500 line-through">₹{product.regular_price.toLocaleString()}</span>
//               <span className="text-green-600 border border-green-600 px-2 py-1 rounded text-sm">
//                 {discount}
//               </span>
//             </div>

//             {/* Bulk Discount Toggle */}
//             {/* <div 
//               className="flex items-center justify-between border rounded-lg p-2 cursor-pointer hover:bg-gray-50"
//               onClick={() => setShowBulkDiscount(true)}
//             >
//               <span className="text-green-600 font-medium">Bulk Discount</span>
//               <div className="flex items-center gap-2">
//                 <span>Qty(1)</span>
//                 <ChevronDown className="w-4 h-4" />
//               </div>
//             </div> */}

//             {/* Action Buttons */}
//             <div className="grid grid-cols-2 gap-3">
//               <button onClick={handleAddToCart}
//                     disabled={product.stock === 0}
//                     className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-medium">
//                 Add to Cart
//               </button>
//               <button 
//                 onClick={BuyNow}
//                 disabled={product.stock === 0}
//                 className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium">
//                 Buy Now
//               </button> 
//             </div>
//           </div>
       
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Truck, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const [showBulkDiscount, setShowBulkDiscount] = useState(false);
  const bulkDiscountRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Define currentPrice from the product's selling price
  const currentPrice = parseFloat(product.selling_price);
  
  // Calculate discount percentage
  const discount = product.regular_price > 0 
    ? `${Math.round(((product.regular_price - currentPrice) / product.regular_price) * 100)}% OFF` 
    : '';
  
  // Check if product is a bestseller
  const isBestSeller = product.is_bestseller;

  const handleAddToCart = () => {
      // Calculate prices as numbers to ensure proper calculations
      const sellingPrice = parseFloat(product.selling_price);
      const gstPercentage = parseFloat(product.gst_percentage);
      const gstAmount = (sellingPrice * gstPercentage) / 100;
      const totalPrice = sellingPrice + gstAmount;

      const cartItem = {
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.images[0].image, // Feature image
          regular_price: parseFloat(product.regular_price),
          selling_price: sellingPrice,
          gst_percentage: gstPercentage,
          gst_amount: gstAmount,
          total_price: totalPrice,
          qnt: 1,
          stock: product.stock,
          selectedAttributes: {} // For future use if needed
      };

      dispatch(addItemToCart(cartItem));
  };

  const BuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bulkDiscountRef.current && !bulkDiscountRef.current.contains(event.target)) {
        setShowBulkDiscount(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bulkOptions = [
    {
      quantity: '2-3',
      price: Math.round(currentPrice * 0.9),
      discount: '10% OFF'
    },
    {
      quantity: '4-5',
      price: Math.round(currentPrice * 0.87),
      discount: '13% OFF'
    },
    {
      quantity: '6-7',
      price: Math.round(currentPrice * 0.85),
      discount: '15% OFF'
    },
    {
      quantity: '8-10',
      price: Math.round(currentPrice * 0.82),
      discount: '18% OFF'
    }
  ];

  return (
    <div className="relative w-full bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
      {/* Best Seller Badge */}
      {isBestSeller && (
        <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-sm font-medium px-3 py-1 rounded-full">
          Best Seller
        </div>
      )}

      {/* Shipping Badge */}
      <div className="inline-flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm mb-4">
        <Truck className="w-4 h-4 mr-2" />
        Ships within 24 hrs
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Product Image */}
        <div className="relative aspect-square mb-4">
          <Image
            src={product.images[0].image}
            alt={product.name}
            className="object-contain"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isBestSeller}
          />
        </div>
        
        {/* Product Details */}
        <div className="space-y-3 ">
          <Link href={`/product/${product.slug}`}>
            <h2 className="text-xl font-semibold line-clamp-2">
              {product.name}
            </h2>
          </Link>
          
          
          {/* Price Section */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-bold">₹{currentPrice.toLocaleString()}</span>
            <span className="text-gray-500 line-through">₹{product.regular_price.toLocaleString()}</span>
            {discount && (
              <span className="text-green-600 border border-green-600 px-2 py-1 rounded text-sm">
                {discount}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-medium">
              Add to Cart
            </button>
            <button 
              onClick={BuyNow}
              disabled={product.stock === 0}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium">
              Buy Now
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;