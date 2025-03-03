// 'use client'

// import React, { useState } from 'react';
// import { Star, ChevronDown, ShoppingCart, Truck, Shield } from 'lucide-react';
// import Image from 'next/image';

// const ProductDetail = () => {
//   const [mainImage, setMainImage] = useState('/Products/p4.jpeg');
//   const [quantity, setQuantity] = useState(1);
//   const [selectedFaq, setSelectedFaq] = useState(null);

//   const thumbnails = [
//     '/Product/1.webp',
//     '/Product/2.webp',
//     '/Product/3.webp',
//     '/Product/4.webp',
//     '/Product/5.webp'
//   ];

//   const featuredProducts = [
//     { id: 1, name: 'Test Product', rating: 5, image: '/Product/1.webp' },
//     { id: 2, name: 'Test Product', rating: 5, image: '/Product/2.webp' },
//     { id: 3, name: 'Test Product', rating: 5, image: '/Product/3.webp' },
//     { id: 4, name: 'Test Product', rating: 5, image: '/Product/4.webp' }
//   ];


//   const toggleFaq = (id) => {
//     setSelectedFaq(selectedFaq === id ? null : id);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Product Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//         {/* Image Gallery */}
//         <div className="space-y-4">
//           <div className="aspect-square">
//             <Image
//               src={mainImage}
//               alt="Product"
//               className="w-full h-full object-cover rounded-lg"
//               height={150}
//               width={150}
//             />
//           </div>
//           <div className="grid grid-cols-5 gap-2">
//             {thumbnails.map((thumb, index) => (
//               <button
//                 key={index}
//                 onClick={() => setMainImage(thumb)}
//                 className={`aspect-square rounded-lg overflow-hidden border-2 ${
//                   mainImage === thumb ? 'border-green-500' : 'border-transparent'
//                 }`}
//               >
//                 <Image
//                   src={thumb}
//                   alt={`Thumbnail ${index + 1}`}
//                   className="w-full h-full object-cover"
//                   width={50}
//                   height={50}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold">Test Product</h1>
          
//           {/* Rating */}
//           <div className="flex items-center gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//             ))}
//           </div>

//           {/* Price */}
//           <div className="space-y-2">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold">₹1000</span>
//               <span className="text-gray-500 line-through">₹2000</span>
//             </div>
//             <span className="text-green-600">50% OFF</span>
//           </div>

//           {/* Benefits */}
//           <div className="flex items-center gap-4 text-sm text-gray-600">
//             <div className="flex items-center gap-1">
//               <Truck className="w-4 h-4" />
//               <span>Free Shipping</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Shield className="w-4 h-4" />
//               <span>Secure Payment</span>
//             </div>
//           </div>

//           {/* Quantity and Add to Cart */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <span>Qty:</span>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
//                 className="w-20 px-3 py-2 border rounded-lg"
//               />
//             </div>
//             <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
//               ADD TO CART
//             </button>
//             <button className="w-full bg-[#744d8b] text-white py-3 rounded-lg hover:opacity-90 transition-opacity">
//               BUY NOW
//             </button>
//           </div>

//           {/* Description & Specifications Tabs */}
//           <div className="space-y-4 border-t pt-6">
//             <div className="border rounded-lg">
//               <button
//                 onClick={() => toggleFaq('description')}
//                 className="flex justify-between items-center w-full p-4"
//               >
//                 <span className="font-semibold">Description</span>
//                 <ChevronDown className={`w-5 h-5 transition-transform ${
//                   selectedFaq === 'description' ? 'rotate-180' : ''
//                 }`} />
//               </button>
//               {selectedFaq === 'description' && (
//                 <div className="p-4 border-t">
//                   Product description goes here...
//                 </div>
//               )}
//             </div>
//             <div className="border rounded-lg">
//               <button
//                 onClick={() => toggleFaq('specifications')}
//                 className="flex justify-between items-center w-full p-4"
//               >
//                 <span className="font-semibold">Specifications</span>
//                 <ChevronDown className={`w-5 h-5 transition-transform ${
//                   selectedFaq === 'specifications' ? 'rotate-180' : ''
//                 }`} />
//               </button>
//               {selectedFaq === 'specifications' && (
//                 <div className="p-4 border-t">
//                   Product specifications go here...
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Featured Products */}
//       <div className="mb-16">
//         <h2 className="text-2xl font-bold mb-6">Feature Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {featuredProducts.map((product) => (
//             <div key={product.id} className="space-y-2">
//               <div className="aspect-square">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-lg"
//                   width={150}
//                   height={150}
//                 />
//               </div>
//               <div className="flex items-center gap-1">
//                 {[...Array(product.rating)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <h3 className="font-semibold">{product.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Featured Products */}
//       <div className="mb-16">
//         <h2 className="text-2xl font-bold mb-6">Similler Products</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {featuredProducts.map((product) => (
//             <div key={product.id} className="space-y-2">
//               <div className="aspect-square">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-lg"
//                   width={150}
//                   height={150}
//                 />
//               </div>
//               <div className="flex items-center gap-1">
//                 {[...Array(product.rating)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//               <h3 className="font-semibold">{product.name}</h3>
//             </div>
//           ))}
//         </div>
//       </div>

     
//     </div>
//   );
// };

// export default ProductDetail;

// 'use client'

// import React, { useState, useEffect, use } from 'react';
// import { Star, ChevronDown, ShoppingCart, Truck, Shield, FileDown, Download } from 'lucide-react';
// import Image from 'next/image';
// import { useDispatch } from 'react-redux';
// import { addItemToCart } from '@/redux/slices/cartSlice';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';

// const ProductDetail = ({params}) => {
//   const slug = use(params).slug;
  
//   const [mainImage, setMainImage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [selectedFaq, setSelectedFaq] = useState(null);
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [similarProducts, setSimilarProducts] = useState([]);
  
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     // console.log('slug product -' , slug)
//     // Fetch product data using slug
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/?slug=${slug}`);
//         const data = await response.json();
//         // console.log('featched product data - ', data)
//         // console.log('slug product at fetch  -' , slug)

//         if (data && data.length > 0) {
//           setProductData(data[0]);
          
//           // Set main image to feature image if available
//           if (data[0].images && data[0].images.length > 0) {
//             setMainImage(data[0].images[0].image);
//           }
          
//           // Now fetch similar products
//           fetchSimilarProducts();
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         toast.error('Failed to load product details');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (slug) {
//       fetchProduct();
//     }
//   }, [slug]);
  
//   const fetchSimilarProducts = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/similar_products/`);
//       const data = await response.json();
//       console.log('similar products response -', data);
      
//       if (data && data.length > 0) {
//         setSimilarProducts(data);
//       }
//     } catch (error) {
//       console.error('Error fetching similar products:', error);
//     }
//   };

//   const handleAddToCart = () => {
//     if (!productData) return;
    
//     // Calculate prices as numbers to ensure proper calculations
//     const sellingPrice = parseFloat(productData.selling_price);
//     const gstPercentage = parseFloat(productData.gst_percentage);
//     const gstAmount = (sellingPrice * gstPercentage) / 100;
//     const totalPrice = sellingPrice + gstAmount;

//     const cartItem = {
//       id: productData.id,
//       name: productData.name,
//       slug: productData.slug,
//       image: productData.images[0]?.image, // Feature image
//       regular_price: parseFloat(productData.regular_price),
//       selling_price: sellingPrice,
//       gst_percentage: gstPercentage,
//       gst_amount: gstAmount,
//       total_price: totalPrice,
//       qnt: quantity,
//       stock: productData.stock,
//       selectedAttributes: {} // For future use if needed
//     };

//     dispatch(addItemToCart(cartItem));
//     toast.success('Added to cart');
//   };

//   const buyNow = () => {
//     handleAddToCart();
//     router.push('/checkout');
//   };

//   const toggleFaq = (id) => {
//     setSelectedFaq(selectedFaq === id ? null : id);
//   };
  
//   const downloadBrochure = async () => {
//     // Check if product_brochure is available
//     if (!productData || !productData.product_brochure) {
//       toast.error('No brochure available for this product');
//       return;
//     }
    
//     try {
//       toast.loading('Downloading brochure...');
      
//       // Make a request to download the brochure
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/download_brochure/`);
      
//       if (!response.ok) {
//         throw new Error('Failed to download brochure');
//       }
      
//       // Get the blob from the response
//       const blob = await response.blob();
      
//       // Create object URL for the blob
//       const url = window.URL.createObjectURL(blob);
      
//       // Create a temporary link element
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = url;
      
//       // Set the download attribute with a filename
//       // Extract filename from URL or use a default
//       const filename = productData.product_brochure?.split('/').pop() || `${productData.name}-brochure.pdf`;
//       a.download = filename;
      
//       // Append to the document
//       document.body.appendChild(a);
      
//       // Trigger click to start download
//       a.click();
      
//       // Cleanup
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
      
//       toast.dismiss();
//       toast.success('Brochure downloaded successfully');
//     } catch (error) {
//       console.error('Error downloading brochure:', error);
//       toast.dismiss();
//       toast.error('Failed to download brochure');
//     }
//   };
  
//   // Calculate discount percentage
//   const getDiscountPercentage = () => {
//     if (!productData) return null;
    
//     const regular = parseFloat(productData.regular_price);
//     const selling = parseFloat(productData.selling_price);
    
//     if (regular > selling) {
//       const discount = ((regular - selling) / regular) * 100;
//       return Math.round(discount);
//     }
    
//     return null;
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (!productData) {
//     return (
//       <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-xl text-gray-700">Product not found</p>
//           <button 
//             onClick={() => router.push('/shop')}
//             className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Browse Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Log product data to verify brochure field is present
//   console.log('Product data:', productData);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Product Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//         {/* Image Gallery */}
//         <div className="space-y-4">
//           <div className="aspect-square">
//             <img
//               src={mainImage}
//               alt={productData.name}
//               className="w-full h-full object-contain rounded-lg border"
//             />
//           </div>
//           {productData.images && productData.images.length > 1 && (
//             <div className="grid grid-cols-5 gap-2">
//               {productData.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setMainImage(image.image)}
//                   className={`aspect-square rounded-lg overflow-hidden border-2 ${
//                     mainImage === image.image ? 'border-green-500' : 'border-transparent'
//                   }`}
//                 >
//                   <img
//                     src={image.image}
//                     alt={`${productData.name} - Image ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold">{productData.name}</h1>
          
//           {/* Price */}
//           <div className="space-y-2">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold">₹{parseFloat(productData.selling_price).toLocaleString()}</span>
//               {parseFloat(productData.regular_price) > parseFloat(productData.selling_price) && (
//                 <span className="text-gray-500 line-through">₹{parseFloat(productData.regular_price).toLocaleString()}</span>
//               )}
//             </div>
//             {getDiscountPercentage() && (
//               <span className="text-green-600">{getDiscountPercentage()}% OFF</span>
//             )}
//             {productData.gst_percentage > 0 && (
//               <div className="text-sm text-gray-600">
//                 +{productData.gst_percentage}% GST
//               </div>
//             )}
//           </div>

//           {/* Brochure Download Button - show only if brochure exists */}
//           {(productData.product_brochure || productData.brochure_url) && (
//             <button 
//               onClick={downloadBrochure}
//               className="flex items-center gap-2 text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-4 py-2 rounded-lg"
//             >
//               <FileDown className="w-5 h-5" />
//               <span>Download Product Brochure</span>
//             </button>
//           )}

//           {/* Benefits */}
//           <div className="flex items-center gap-4 text-sm text-gray-600">
//             <div className="flex items-center gap-1">
//               <Truck className="w-4 h-4" />
//               <span>Free Shipping</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Shield className="w-4 h-4" />
//               <span>Secure Payment</span>
//             </div>
//           </div>

//           {/* Quantity and Add to Cart */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <span>Qty:</span>
//               <input
//                 type="number"
//                 min="1"
//                 max={productData.stock}
//                 value={quantity}
//                 onChange={(e) => setQuantity(Math.max(1, Math.min(productData.stock, parseInt(e.target.value) || 1)))}
//                 className="w-20 px-3 py-2 border rounded-lg"
//               />
//               <span className="text-sm text-gray-500">{productData.stock} available</span>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={productData.stock === 0}
//                 className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-medium flex items-center justify-center gap-2"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 <span>Add to Cart</span>
//               </button>
//               <button 
//                 onClick={buyNow}
//                 disabled={productData.stock === 0}
//                 className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
//               >
//                 Buy Now
//               </button>
//             </div>

//             {/* Get Quotation Button */}
//             <button 
//               onClick={() => router.push(`/quotation?product=${productData.id}`)}
//               className="w-full mt-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
//             >
//               Get Bulk Order Quotation
//             </button>
//           </div>

//           {/* Description & Features Tabs */}
//           <div className="space-y-4 border-t pt-6">
//             <div className="border rounded-lg">
//               <button
//                 onClick={() => toggleFaq('description')}
//                 className="flex justify-between items-center w-full p-4"
//               >
//                 <span className="font-semibold">Description</span>
//                 <ChevronDown className={`w-5 h-5 transition-transform ${
//                   selectedFaq === 'description' ? 'rotate-180' : ''
//                 }`} />
//               </button>
//               {selectedFaq === 'description' && (
//                 <div className="p-4 border-t">
//                   <div dangerouslySetInnerHTML={{ __html: productData.description }} />
//                 </div>
//               )}
//             </div>
            
//             {/* Features Tab */}
//             {/* {productData.features && productData.features.length > 0 && (
//               <div className="border rounded-lg">
//                 <button
//                   onClick={() => toggleFaq('features')}
//                   className="flex justify-between items-center w-full p-4"
//                 >
//                   <span className="font-semibold">Features</span>
//                   <ChevronDown className={`w-5 h-5 transition-transform ${
//                     selectedFaq === 'features' ? 'rotate-180' : ''
//                   }`} />
//                 </button>
//                 {selectedFaq === 'features' && (
//                   <div className="p-4 border-t">
//                     <ul className="space-y-4">
//                       {productData.features.map((feature, index) => (
//                         <li key={index} className="border-b pb-3 last:border-0 last:pb-0">
//                           <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
//                           <p className="text-gray-600">{feature.content}</p>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )} */}
//             {/* Description & Specifications Tabs */}
//             <div className="space-y-4 ">
//               {productData.features && productData.features.map(item =>(

//               <div className="border rounded-lg" key={item.id}>
//                 <button
//                   onClick={() => toggleFaq(item.title)}
//                   className="flex justify-between items-center w-full p-4"
//                 >
//                   <span className="font-semibold">{item.title}</span>
//                   <ChevronDown className={`w-5 h-5 transition-transform ${
//                     selectedFaq === item.title ? 'rotate-180' : ''
//                   }`} />
//                 </button>
//                 {selectedFaq === item.title && (
//                   <div className="p-4 border-t prose max-w-none">
//                     {/* {item.content} */}
//                     <div  dangerouslySetInnerHTML={{ __html: item.content }} />
//                   </div>
//                 )}
//               </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Similar Products */}
//       {similarProducts.length > 0 && (
//         <div className="mb-16">
//           <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {similarProducts.map((product) => (
//               <div 
//                 key={product.id} 
//                 className="space-y-2 cursor-pointer border rounded-lg p-4 hover:shadow-md transition-shadow"
//                 onClick={() => router.push(`/product/${product.slug}`)}
//               >
//                 <div className="aspect-square">
//                   {product.images && product.images.length > 0 ? (
//                     <img
//                       src={product.images[0].image}
//                       alt={product.name}
//                       className="w-full h-full object-contain rounded-lg"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
//                       <span className="text-gray-400">No image</span>
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="font-semibold line-clamp-2">{product.name}</h3>
//                 <div className="flex items-center justify-between">
//                   <span className="font-bold">₹{parseFloat(product.selling_price).toLocaleString()}</span>
//                   {parseFloat(product.regular_price) > parseFloat(product.selling_price) && (
//                     <span className="text-green-600 text-sm">
//                       {Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100)}% OFF
//                     </span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;

'use client'

import React, { useState, useEffect, use } from 'react';
import { Star, ChevronDown, ShoppingCart, Truck, Shield, FileDown, Download } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProductDetail = ({params}) => {
  const slug = use(params).slug;
  
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log('Using slug for product:', slug);
    // Fetch product data using slug
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Make sure URL is correctly formatted
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/?slug=${encodeURIComponent(slug)}`;
        console.log('Fetching product from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched product data:', data);
        
        if (data && data.length > 0) {
          const product = data[0];
          setProductData(product);
          
          // Debug the product data to check for brochure field
          console.log('Product brochure field:', product.product_brochure);
          console.log('Product brochure URL field:', product.brochure_url);
          
          // Set main image to feature image if available
          if (product.images && product.images.length > 0) {
            setMainImage(product.images[0].image);
          }
          
          // Now fetch similar products
          if (product.id) {
            fetchSimilarProducts(product.slug);
          }
        } else {
          console.error('No product found with slug:', slug);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  
  const fetchSimilarProducts = async (productSlug) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/similar_products/`;
      console.log('Fetching similar products from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Similar products response:', data);
      
      if (data && data.length > 0) {
        setSimilarProducts(data);
      }
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!productData) return;
    
    // Calculate prices as numbers to ensure proper calculations
    const sellingPrice = parseFloat(productData.selling_price);
    const gstPercentage = parseFloat(productData.gst_percentage);
    const gstAmount = (sellingPrice * gstPercentage) / 100;
    const totalPrice = sellingPrice + gstAmount;

    const cartItem = {
      id: productData.id,
      name: productData.name,
      slug: productData.slug,
      image: productData.images[0]?.image, // Feature image
      regular_price: parseFloat(productData.regular_price),
      selling_price: sellingPrice,
      gst_percentage: gstPercentage,
      gst_amount: gstAmount,
      total_price: totalPrice,
      qnt: quantity,
      stock: productData.stock,
      selectedAttributes: {} // For future use if needed
    };

    dispatch(addItemToCart(cartItem));
    toast.success('Added to cart');
  };

  const buyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const toggleFaq = (id) => {
    setSelectedFaq(selectedFaq === id ? null : id);
  };
  
  const downloadBrochure = async () => {
    // Check if product_brochure or brochure_url is available
    if (!productData || (!productData.product_brochure && !productData.brochure_url)) {
      toast.error('No brochure available for this product');
      return;
    }
    
    try {
      toast.loading('Downloading brochure...');
      
      // Make a request to download the brochure
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}/download_brochure/`;
      console.log('Downloading brochure from:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download brochure: ${response.status}`);
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create object URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Set the download attribute with a filename
      // Extract filename from URL or use a default
      const brochureUrl = productData.brochure_url || productData.product_brochure;
      const filename = brochureUrl?.split('/').pop() || `${productData.name}-brochure.pdf`;
      a.download = filename;
      
      // Append to the document
      document.body.appendChild(a);
      
      // Trigger click to start download
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.dismiss();
      toast.success('Brochure downloaded successfully');
    } catch (error) {
      console.error('Error downloading brochure:', error);
      toast.dismiss();
      toast.error('Failed to download brochure: ' + error.message);
    }
  };
  
  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!productData) return null;
    
    const regular = parseFloat(productData.regular_price);
    const selling = parseFloat(productData.selling_price);
    
    if (regular > selling) {
      const discount = ((regular - selling) / regular) * 100;
      return Math.round(discount);
    }
    
    return null;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!productData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">Product not found</p>
          <button 
            onClick={() => router.push('/shop')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square">
            <img
              src={mainImage}
              alt={productData.name}
              className="w-full h-full object-contain rounded-lg border"
            />
          </div>
          {productData.images && productData.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image.image)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    mainImage === image.image ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{productData.name}</h1>
          
          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{parseFloat(productData.selling_price).toLocaleString()}</span>
              {parseFloat(productData.regular_price) > parseFloat(productData.selling_price) && (
                <span className="text-gray-500 line-through">₹{parseFloat(productData.regular_price).toLocaleString()}</span>
              )}
            </div>
            {getDiscountPercentage() && (
              <span className="text-green-600">{getDiscountPercentage()}% OFF</span>
            )}
            {productData.gst_percentage > 0 && (
              <div className="text-sm text-gray-600">
                +{productData.gst_percentage}% GST
              </div>
            )}
          </div>

          {/* Brochure Download Button - show only if brochure exists */}
          {(productData.product_brochure || productData.brochure_url) && (
            <button 
              onClick={downloadBrochure}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 px-4 py-2 rounded-lg"
            >
              <FileDown className="w-5 h-5" />
              <span>Download Product Brochure</span>
            </button>
          )}

          {/* Benefits */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Truck className="w-4 h-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span>Qty:</span>
              <input
                type="number"
                min="1"
                max={productData.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(productData.stock, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-2 border rounded-lg"
              />
              <span className="text-sm text-gray-500">{productData.stock} available</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleAddToCart}
                disabled={productData.stock === 0}
                className="px-4 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button 
                onClick={buyNow}
                disabled={productData.stock === 0}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Buy Now
              </button>
            </div>

            {/* Get Quotation Button */}
            <button 
              onClick={() => router.push(`/quotation?product=${productData.slug}`)}
              className="w-full mt-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Get Bulk Order Quotation
            </button>
          </div>

          {/* Description & Features Tabs */}
          <div className="space-y-4 border-t pt-6">
            <div className="border rounded-lg">
              <button
                onClick={() => toggleFaq('description')}
                className="flex justify-between items-center w-full p-4"
              >
                <span className="font-semibold">Description</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${
                  selectedFaq === 'description' ? 'rotate-180' : ''
                }`} />
              </button>
              {selectedFaq === 'description' && (
                <div className="p-4 border-t">
                  <div dangerouslySetInnerHTML={{ __html: productData.description }} />
                </div>
              )}
            </div>
            
            {/* Features Tabs */}
            {productData.features && productData.features.map(item => (
              <div className="border rounded-lg" key={item.id}>
                <button
                  onClick={() => toggleFaq(item.title)}
                  className="flex justify-between items-center w-full p-4"
                >
                  <span className="font-semibold">{item.title}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${
                    selectedFaq === item.title ? 'rotate-180' : ''
                  }`} />
                </button>
                {selectedFaq === item.title && (
                  <div className="p-4 border-t prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <div 
                key={product.id} 
                className="space-y-2 cursor-pointer border rounded-lg p-4 hover:shadow-md transition-shadow"
                onClick={() => router.push(`/product/${product.slug}`)}
              >
                <div className="aspect-square">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0].image}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold">₹{parseFloat(product.selling_price).toLocaleString()}</span>
                  {parseFloat(product.regular_price) > parseFloat(product.selling_price) && (
                    <span className="text-green-600 text-sm">
                      {Math.round(((product.regular_price - product.selling_price) / product.regular_price) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;