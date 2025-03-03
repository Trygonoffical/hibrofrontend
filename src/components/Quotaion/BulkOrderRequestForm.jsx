// 'use client'

// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { toast } from 'react-hot-toast';
// import Cookies from 'js-cookie';

// const BulkOrderRequestForm = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const productId = searchParams.get('product');
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     company_name: '',
//     product: '',
//     quantity_required: 10,
//     additional_notes: ''
//   });
  
//   const [productData, setProductData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [products, setProducts] = useState([]);
  
//   useEffect(() => {
//     console.log('Product ID from query:', productId);
    
//     if (productId) {
//       fetchProductDetails(productId);
//       setFormData(prev => ({ ...prev, product: productId }));
//     } else {
//       fetchProducts();
//     }
    
//     // Pre-fill form with saved data if available
//     const savedEmail = localStorage.getItem('quotationEmail') || Cookies.get('quotationEmail');
//     if (savedEmail) {
//       setFormData(prev => ({ ...prev, email: savedEmail }));
//     }
//   }, [productId]);
  
//   const fetchProductDetails = async (id) => {
//     try {
//       setLoading(true);
//       console.log('Fetching product details for ID:', id);
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch product: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('Product details fetched:', data);
//       setProductData(data);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       toast.error('Failed to load product details');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
      
//       if (!response.ok) {
//         throw new Error(`Failed to fetch products: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('All products fetched:', data);
      
//       if (data && data.length > 0) {
//         setProducts(data);
        
//         // If no product is selected, default to the first one
//         if (!formData.product) {
//           setFormData(prev => ({ ...prev, product: data[0].id }));
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     // If product selection changes, fetch that product's details
//     if (name === 'product' && value) {
//       fetchProductDetails(value);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!formData.name || !formData.email || !formData.phone || !formData.product || !formData.quantity_required) {
//       toast.error('Please fill in all required fields');
//       return;
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       toast.error('Please enter a valid email address');
//       return;
//     }
    
//     // Phone validation
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       toast.error('Please enter a valid 10-digit phone number');
//       return;
//     }
    
//     try {
//       setSubmitting(true);
      
//       console.log('Submitting form data:', formData);
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to submit request');
//       }
      
//       const data = await response.json();
//       console.log('Quotation request submitted successfully:', data);
      
//       toast.success('Quotation request submitted successfully!');
      
//       // Store email in local storage or cookie for future quotation lookups
//       localStorage.setItem('quotationEmail', formData.email);
//       Cookies.set('quotationEmail', formData.email, { expires: 30 });
      
//       // Redirect to quotation success page
//       router.push('/quotation?view=success');
//     } catch (error) {
//       console.error('Error submitting quotation request:', error);
//       toast.error(error.message || 'Failed to submit quotation request');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold mb-6">Request Bulk Order Quotation</h1>
        
//         {productData && (
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center">
//             <div className="w-16 h-16 mr-4">
//               {productData.images && productData.images.length > 0 ? (
//                 <img 
//                   src={productData.images[0].image} 
//                   alt={productData.name}
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
//                   <span className="text-gray-500 text-xs">No image</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <h2 className="font-semibold">{productData.name}</h2>
//               <p className="text-sm text-gray-600">Regular Price: ₹{parseFloat(productData.regular_price).toLocaleString()}</p>
//             </div>
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Contact Information */}
//             <div>
//               <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
            
//             <div>
//               <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-1 font-medium">Phone <span className="text-red-500">*</span></label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//                 pattern="[0-9]{10}"
//                 title="Please enter a valid 10-digit phone number"
//               />
//             </div>
            
//             <div>
//               <label className="block mb-1 font-medium">Company Name</label>
//               <input
//                 type="text"
//                 name="company_name"
//                 value={formData.company_name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>
          
//           {/* Product Selection (only show if no productId in URL) */}
//           {!productId && products.length > 0 && (
//             <div>
//               <label className="block mb-1 font-medium">Product <span className="text-red-500">*</span></label>
//               <select
//                 name="product"
//                 value={formData.product}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select a product</option>
//                 {products.map(product => (
//                   <option key={product.id} value={product.id}>
//                     {product.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
          
//           {/* Quantity */}
//           <div>
//             <label className="block mb-1 font-medium">Quantity Required <span className="text-red-500">*</span></label>
//             <input
//               type="number"
//               name="quantity_required"
//               value={formData.quantity_required}
//               onChange={handleChange}
//               min="5"
//               className="w-full p-2 border rounded"
//               required
//             />
//             <p className="text-sm text-gray-500 mt-1">Minimum order quantity: 5 units</p>
//           </div>
          
//           {/* Additional Notes */}
//           <div>
//             <label className="block mb-1 font-medium">Additional Notes</label>
//             <textarea
//               name="additional_notes"
//               value={formData.additional_notes}
//               onChange={handleChange}
//               rows="4"
//               className="w-full p-2 border rounded"
//               placeholder="Any specific requirements or questions?"
//             ></textarea>
//           </div>
          
//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={submitting}
//             className={`w-full p-3 bg-blue-600 text-white rounded-lg font-medium ${
//               submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
//             }`}
//           >
//             {submitting ? 'Submitting...' : 'Request Quotation'}
//           </button>
//         </form>
        
//         {/* View Quote History Link */}
//         <div className="mt-6 text-center">
//           <button 
//             onClick={() => router.push('/quotation?view=history')}
//             className="text-blue-600 hover:underline font-medium"
//           >
//             View Your Quotation History
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkOrderRequestForm;

'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const BulkOrderRequestForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productSlug = searchParams.get('product');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    product: '',
    quantity_required: 10,
    additional_notes: ''
  });
  
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    console.log('Product slug from query:', productSlug);
    
    if (productSlug) {
      fetchProductDetails(productSlug);
    } else {
      fetchProducts();
    }
    
    // Pre-fill form with saved data if available
    const savedEmail = localStorage.getItem('quotationEmail') || Cookies.get('quotationEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, [productSlug]);
  
  const fetchProductDetails = async (slug) => {
    try {
      setLoading(true);
      console.log('Fetching product details for slug:', slug);
      
      // Use the correct endpoint to fetch by slug
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/?slug=${slug}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Product details fetched:', data);
      
      if (data && data.length > 0) {
        const product = data[0];
        setProductData(product);
        // Set the product ID in the form data
        setFormData(prev => ({ ...prev, product: product.id }));
      } else {
        toast.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('All products fetched:', data);
      
      if (data && data.length > 0) {
        setProducts(data);
        
        // If no product is selected, default to the first one
        if (!formData.product) {
          setFormData(prev => ({ ...prev, product: data[0].id }));
          setProductData(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // If product selection changes, find that product's details from the products list
    if (name === 'product' && value && products.length > 0) {
      const selectedProduct = products.find(p => p.id.toString() === value.toString());
      if (selectedProduct) {
        setProductData(selectedProduct);
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.product || !formData.quantity_required) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    try {
      setSubmitting(true);
      
      console.log('Submitting form data:', formData);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit request');
      }
      
      const data = await response.json();
      console.log('Quotation request submitted successfully:', data);
      
      toast.success('Quotation request submitted successfully!');
      
      // Store email in local storage or cookie for future quotation lookups
      localStorage.setItem('quotationEmail', formData.email);
      Cookies.set('quotationEmail', formData.email, { expires: 30 });
      
      // Redirect to quotation success page
      router.push('/quotation?view=success');
    } catch (error) {
      console.error('Error submitting quotation request:', error);
      toast.error(error.message || 'Failed to submit quotation request');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Request Bulk Order Quotation</h1>
        
        {productData && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center">
            <div className="w-16 h-16 mr-4">
              {productData.images && productData.images.length > 0 ? (
                <img 
                  src={productData.images[0].image} 
                  alt={productData.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-xs">No image</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{productData.name}</h2>
              <p className="text-sm text-gray-600">Regular Price: ₹{parseFloat(productData.regular_price).toLocaleString()}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div>
              <label className="block mb-1 font-medium">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          {/* Product Selection (only show if no productSlug in URL) */}
          {!productSlug && products.length > 0 && (
            <div>
              <label className="block mb-1 font-medium">Product <span className="text-red-500">*</span></label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Quantity */}
          <div>
            <label className="block mb-1 font-medium">Quantity Required <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="quantity_required"
              value={formData.quantity_required}
              onChange={handleChange}
              min="5"
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Minimum order quantity: 5 units</p>
          </div>
          
          {/* Additional Notes */}
          <div>
            <label className="block mb-1 font-medium">Additional Notes</label>
            <textarea
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border rounded"
              placeholder="Any specific requirements or questions?"
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full p-3 bg-blue-600 text-white rounded-lg font-medium ${
              submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Submitting...' : 'Request Quotation'}
          </button>
        </form>
        
        {/* View Quote History Link */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => router.push('/quotation?view=history')}
            className="text-blue-600 hover:underline font-medium"
          >
            View Your Quotation History
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderRequestForm;