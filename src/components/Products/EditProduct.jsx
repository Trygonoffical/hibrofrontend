// 'use client'
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import Cookies from 'js-cookie';
// import { Editor } from '@tinymce/tinymce-react';
// import { useRouter } from 'next/navigation';


// const ProductUpdate = ({productSlug}) => {
   
//     // Main product data
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         regular_price: '',
//         selling_price: '',
//         bp_value: 0,
//         gst_percentage: 0,
//         stock: 0,
//         is_featured: false,
//         is_bestseller: false,
//         is_new_arrival: false,
//         is_trending: false,
//         is_active: true,
//         categories: []
//     });

//     const router = useRouter();

//     // Images and features
//     const [featureImage, setFeatureImage] = useState(null);
//     const [galleryImages, setGalleryImages] = useState([]);
//     const [existingImages, setExistingImages] = useState([]);
//     const [features, setFeatures] = useState([{ title: '', content: '' }]);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchCategories();
//         if (productSlug) {
//             fetchProductData();
//         }
//     }, [productSlug]);

//     // Handle main form data changes
//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     // Editor content handler
//     const handleEditorChange = (content) => {
//         setFormData(prev => ({
//             ...prev,
//             description: content
//         }));
//     };

//     // Handle features
//     const handleFeatureChange = (index, field, value) => {
//         const newFeatures = [...features];
//         newFeatures[index] = { ...newFeatures[index], [field]: value };
//         setFeatures(newFeatures);
//     };

//     const addFeature = () => {
//         setFeatures(prev => [...prev, { title: '', content: '' }]);
//     };

//     const removeFeature = (index) => {
//         setFeatures(prev => prev.filter((_, i) => i !== index));
//     };

//     // Image handling
//     const handleFeatureImageChange = (e) => {
//         if (e.target.files[0]) {
//             setFeatureImage(e.target.files[0]);
//         }
//     };

//     const handleGalleryImagesChange = (e) => {
//         const files = Array.from(e.target.files);
//         setGalleryImages(prev => [...prev, ...files]);
//     };

//     const removeGalleryImage = (index) => {
//         setGalleryImages(prev => prev.filter((_, i) => i !== index));
//     };



//     const fetchProductData = async () => {
//         try {
//             const token = Cookies.get('token');
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
//             const data = await response.json();
//             console.log('product info - '  , data)
//             if (response.ok) {
//                 setFormData({
//                     name: data.name || '',
//                     description: data.description || '',
//                     regular_price: data.regular_price || '',
//                     selling_price: data.selling_price || '',
//                     bp_value: data.bp_value || 0,
//                     gst_percentage: data.gst_percentage || 0,
//                     stock: data.stock || 0,
//                     is_featured: data.is_featured ?? false,
//                     is_bestseller: data.is_bestseller ?? false,
//                     is_new_arrival: data.is_new_arrival ?? false,
//                     is_trending: data.is_trending ?? false,
//                     is_active: data.is_active ?? false,
//                     categories: Array.isArray(data.categories) ? data.categories : []  // Ensure categories is always an array
//                 });
    
//                 setExistingImages(data.images || []);
//                 setFeatures(data.features?.length > 0 ? data.features : [{ title: '', content: '' }]);
                

//             }else{
//                 // toast.error('No Product Found !!');
//                 router.push('/auth/dashboard/product')
//             }
//         } catch (error) {
//             console.error('Error fetching product:', error);
//             toast.error('Error fetching product data');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
//             const data = await response.json();
//             setCategories(data);
//         } catch (error) {
//             toast.error('Error fetching categories');
//         }
//     };

//     const handleImageDelete = async (imageId) => {
//         try {
//             const token = Cookies.get('token');
//             const response = await fetch(
//                 `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/delete_image/`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ image_id: imageId })
//                 }
//             );

//             if (response.ok) {
//                 setExistingImages(prev => prev.filter(img => img.id !== imageId));
//                 toast.success('Image deleted successfully');
//             } else {
//                 toast.error('Error deleting image');
//             }
//         } catch (error) {
//             toast.error('Error deleting image');
//         }
//     };

//     const handleupdateSubmit = async (e) => {
//         e.preventDefault();
        
//         const form = new FormData();

//         // Add main product data
//         Object.keys(formData).forEach(key => {
//             if (key === 'categories') {
//                 // Handle categories separately
//                 formData.categories.forEach(categoryId => {
//                     form.append('categories', categoryId);
//                 });
//             } else {
//                 if (typeof formData[key] === 'boolean') {
//                     form.append(key, formData[key].toString());
//                 } else {
//                     form.append(key, formData[key]);
//                 }
//             }
//         });

//         // Add categories
//         // formData.categories.forEach(catId => {
//         //     form.append('categories', catId);
//         // });

//         // Add new images
//         if (featureImage) {
//             form.append('uploaded_images', featureImage);
//         }

//         galleryImages.forEach(image => {
//             form.append('uploaded_images', image);
//         });

//         // Handle features
//         if (features.length > 0) {
//             const featureList = features
//                 .filter(feature => feature.title.trim() || feature.content.trim())
//                 .map(feature => ({
//                     title: feature.title.trim(),
//                     content: feature.content.trim()
//                 }));

//             if (featureList.length > 0) {
//                 form.append('feature_list', JSON.stringify(featureList));
//             }
//         }

//         try {
//             const token = Cookies.get('token');
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: form
//             });
            
//             const responseData = await response.json();

//             if (response.ok) {
//                 toast.success('Product updated successfully');
//                 // Refresh product data
//                 fetchProductData();
//                 // Clear new image selections
//                 setFeatureImage(null);
//                 setGalleryImages([]);
//                 const fileInputs = document.querySelectorAll('input[type="file"]');
//                 fileInputs.forEach(input => {
//                     input.value = '';
//                 });
//                 router.push('/auth/dashboard/product')
//             } else {
//                 toast.error(responseData.error || 'Error updating product');
//             }
//         } catch (error) {
//             toast.error('Error updating product');
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="p-6">
//             <div className='flex justify-between mb-5 align-middle'>
//                 <h1 className="text-2xl font-bold mb-6">Update Product</h1>
//                 <a href='/auth/dashboard/product' className="bg-green-600 text-white rounded hover:bg-green-700 pt-4 px-4">
//                     All Products
//                 </a>
//             </div>

//             <form onSubmit={handleupdateSubmit} className="space-y-6" encType="multipart/form-data">
//                 {/* Form fields same as ProductForm component */}
//                 {/* Basic Information */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//                     <div className="">
//                         <div>
//                             <label className="block mb-1">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <div className='mt-2'>
//                             <label className="block mb-1">Description</label>
//                             <Editor
//                                 apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
//                                 init={{
//                                     height: 400,
//                                     menubar: true,
//                                     plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
//                                     ],
//                                     toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
//                                 }}
//                                 value={formData.description}
//                                 onEditorChange={handleEditorChange}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Pricing and Stock */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Pricing and Stock</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <label className="block mb-1">Regular Price</label>
//                             <input
//                                 type="number"
//                                 name="regular_price"
//                                 value={formData.regular_price}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                                 step="0.01"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1">Selling Price</label>
//                             <input
//                                 type="number"
//                                 name="selling_price"
//                                 value={formData.selling_price}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                                 step="0.01"
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1">BP Value</label>
//                             <input
//                                 type="number"
//                                 name="bp_value"
//                                 value={formData.bp_value}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1">Stock</label>
//                             <input
//                                 type="number"
//                                 name="stock"
//                                 value={formData.stock}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1">GST Percentage</label>
//                             <input
//                                 type="number"
//                                 name="gst_percentage"
//                                 value={formData.gst_percentage}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border rounded"
//                                 step="0.01"
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Categories */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Categories</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         {categories.map(category => (
//                             <label key={category.id} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={formData.categories.includes(category.id)}
//                                     onChange={(e) => {
//                                         const newCategories = e.target.checked
//                                             ? [...formData.categories, category.id]
//                                             : formData.categories.filter(id => id !== category.id);
//                                         setFormData(prev => ({ ...prev, categories: newCategories }));
//                                     }}
//                                 />
//                                 <span>{category.name}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Display Options */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Display Options</h2>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 name="is_featured"
//                                 checked={formData.is_featured}
//                                 onChange={handleChange}
//                             />
//                             <span>Featured</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 name="is_bestseller"
//                                 checked={formData.is_bestseller}
//                                 onChange={handleChange}
//                             />
//                             <span>Bestseller</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 name="is_new_arrival"
//                                 checked={formData.is_new_arrival}
//                                 onChange={handleChange}
//                             />
//                             <span>New Arrival</span>
//                         </label>
//                         <label className="flex items-center space-x-2">
//                             <input
//                                 type="checkbox"
//                                 name="is_trending"
//                                 checked={formData.is_trending}
//                                 onChange={handleChange}
//                             />
//                             <span>Trending</span>
//                         </label>
//                     </div>
//                 </div>
                

//                 {/* Existing Images */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Existing Images</h2>
//                     <div className="grid grid-cols-4 gap-4">
//                         {existingImages.map((image) => (
//                             <div key={image.id} className="relative">
//                                 <img
//                                     src={image.image}
//                                     alt={image.alt_text || 'Product image'}
//                                     className="w-full h-32 object-cover rounded"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => handleImageDelete(image.id)}
//                                     className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                                 >
//                                     ×
//                                 </button>
//                                 {image.is_feature && (
//                                     <span className="absolute bottom-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm rounded">
//                                         Feature Image
//                                     </span>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Add New Images section */}
//                 {/* ... Same as ProductForm component ... */}

//                 {/* Features section */}
//                 {/* ... Same as ProductForm component ... */}
//                 {/* Images */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                    
//                     {/* Feature Image */}
//                     <div className="mb-4">
//                         <label className="block mb-1">Feature Image</label>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFeatureImageChange}
//                             className="w-full p-2 border rounded"
//                         />
//                         {featureImage && (
//                             <div className="mt-2">
//                                 <img
//                                     src={URL.createObjectURL(featureImage)}
//                                     alt="Feature"
//                                     className="w-32 h-32 object-cover rounded"
//                                 />
//                             </div>
//                         )}
//                     </div>
                
//                     {/* Gallery Images */}
//                     <div>
//                         <label className="block mb-1">Gallery Images</label>
//                         <input
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={handleGalleryImagesChange}
//                             className="w-full p-2 border rounded"
//                         />
//                         {galleryImages.length > 0 && (
//                             <div className="mt-4 grid grid-cols-4 gap-4">
//                                 {galleryImages.map((file, index) => (
//                                     <div key={index} className="relative">
//                                         <img
//                                             src={URL.createObjectURL(file)}
//                                             alt={`Gallery ${index}`}
//                                             className="w-full h-32 object-cover rounded"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => removeGalleryImage(index)}
//                                             className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
//                                         >
//                                             ×
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Features */}
//                 <div className="bg-white rounded-lg shadow p-6">
//                     <h2 className="text-xl font-semibold mb-4">Product Features</h2>
//                     {features.map((feature, index) => (
//                         <div key={index} className="mb-4 p-4 border rounded">
//                             <div className="flex justify-between mb-2">
//                                 <h3>Feature {index + 1}</h3>
//                                 <button
//                                     type="button"
//                                     onClick={() => removeFeature(index)}
//                                     className="text-red-500"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                             <div className="space-y-2">
//                                 <input
//                                     type="text"
//                                     value={feature.title}
//                                     onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
//                                     placeholder="Feature Title"
//                                     className="w-full p-2 border rounded"
//                                 />
//                                 <textarea
//                                     value={feature.content}
//                                     onChange={(e) => handleFeatureChange(index, 'content', e.target.value)}
//                                     placeholder="Feature Content"
//                                     className="w-full p-2 border rounded"
//                                 />
                                
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         onClick={addFeature}
//                         className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                     >
//                         Add Feature
//                     </button>
//                 </div>

//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={Boolean(formData.is_active)}
//                         onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
//                         className="mr-2"
//                     />
//                     <label>Active</label>
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     Update Product
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ProductUpdate;


'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { FileUp, FileDown } from 'lucide-react';

const ProductUpdate = ({productSlug}) => {
   
    // Main product data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        regular_price: '',
        selling_price: '',
        bp_value: 0,
        gst_percentage: 0,
        stock: 0,
        is_featured: false,
        is_bestseller: false,
        is_new_arrival: false,
        is_trending: false,
        is_active: true,
        categories: []
    });

    const router = useRouter();

    // Images and features
    const [featureImage, setFeatureImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [features, setFeatures] = useState([{ title: '', content: '' }]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Product brochure states
    const [productBrochure, setProductBrochure] = useState(null);
    const [existingBrochure, setExistingBrochure] = useState(null);

    useEffect(() => {
        fetchCategories();
        if (productSlug) {
            fetchProductData();
        }
    }, [productSlug]);

    // Handle main form data changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Editor content handler
    const handleEditorChange = (content) => {
        setFormData(prev => ({
            ...prev,
            description: content
        }));
    };

    // Handle features
    const handleFeatureChange = (index, field, value) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFeatures(newFeatures);
    };

    const addFeature = () => {
        setFeatures(prev => [...prev, { title: '', content: '' }]);
    };

    const removeFeature = (index) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
    };

    // Image handling
    const handleFeatureImageChange = (e) => {
        if (e.target.files[0]) {
            setFeatureImage(e.target.files[0]);
        }
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImages(prev => [...prev, ...files]);
    };

    const removeGalleryImage = (index) => {
        setGalleryImages(prev => prev.filter((_, i) => i !== index));
    };

    // Handle brochure file upload
    const handleBrochureChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            // Check if the file is a PDF
            if (file.type === 'application/pdf') {
                setProductBrochure(file);
            } else {
                toast.error('Please upload a PDF file for the brochure');
                e.target.value = null; // Reset the input
            }
        }
    };

    // Remove brochure
    const removeBrochure = () => {
        setProductBrochure(null);
    };

    // Remove existing brochure
    const removeExistingBrochure = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/remove_brochure/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                setExistingBrochure(null);
                toast.success('Brochure removed successfully');
            } else {
                toast.error('Failed to remove brochure');
            }
        } catch (error) {
            console.error('Error removing brochure:', error);
            toast.error('Error removing brochure');
        }
    };

    const fetchProductData = async () => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('product info - ', data);
            if (response.ok) {
                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    regular_price: data.regular_price || '',
                    selling_price: data.selling_price || '',
                    bp_value: data.bp_value || 0,
                    gst_percentage: data.gst_percentage || 0,
                    stock: data.stock || 0,
                    is_featured: data.is_featured ?? false,
                    is_bestseller: data.is_bestseller ?? false,
                    is_new_arrival: data.is_new_arrival ?? false,
                    is_trending: data.is_trending ?? false,
                    is_active: data.is_active ?? false,
                    categories: Array.isArray(data.categories) ? data.categories : []  // Ensure categories is always an array
                });
    
                setExistingImages(data.images || []);
                setFeatures(data.features?.length > 0 ? data.features : [{ title: '', content: '' }]);
                
                // Set existing brochure if available
                if (data.product_brochure) {
                    setExistingBrochure(data.product_brochure);
                }
            } else {
                // toast.error('No Product Found !!');
                router.push('/auth/dashboard/product');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error fetching product data');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Error fetching categories');
        }
    };

    const handleImageDelete = async (imageId) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/delete_image/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image_id: imageId })
                }
            );

            if (response.ok) {
                setExistingImages(prev => prev.filter(img => img.id !== imageId));
                toast.success('Image deleted successfully');
            } else {
                toast.error('Error deleting image');
            }
        } catch (error) {
            toast.error('Error deleting image');
        }
    };

    const downloadBrochure = async () => {
        if (!existingBrochure) {
            toast.error('No brochure available for this product');
            return;
        }
        
        try {
            toast.loading('Downloading brochure...');
            
            // Make a request to download the brochure
            const token = Cookies.get('token');
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/download_brochure/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('Failed to download brochure');
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
            const filename = existingBrochure.split('/').pop() || `product-brochure.pdf`;
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
            toast.error('Failed to download brochure');
        }
    };

    const handleupdateSubmit = async (e) => {
        e.preventDefault();
        
        const form = new FormData();

        // Add main product data
        Object.keys(formData).forEach(key => {
            if (key === 'categories') {
                // Handle categories separately
                formData.categories.forEach(categoryId => {
                    form.append('categories', categoryId);
                });
            } else {
                if (typeof formData[key] === 'boolean') {
                    form.append(key, formData[key].toString());
                } else {
                    form.append(key, formData[key]);
                }
            }
        });

        // Add new images
        if (featureImage) {
            form.append('uploaded_images', featureImage);
        }

        galleryImages.forEach(image => {
            form.append('uploaded_images', image);
        });

        // Add product brochure if a new one is selected
        if (productBrochure) {
            form.append('product_brochure', productBrochure);
        }

        // Handle features
        if (features.length > 0) {
            const featureList = features
                .filter(feature => feature.title.trim() || feature.content.trim())
                .map(feature => ({
                    title: feature.title.trim(),
                    content: feature.content.trim()
                }));

            if (featureList.length > 0) {
                form.append('feature_list', JSON.stringify(featureList));
            }
        }

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productSlug}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: form
            });
            
            const responseData = await response.json();

            if (response.ok) {
                toast.success('Product updated successfully');
                // Refresh product data
                fetchProductData();
                // Clear new image selections
                setFeatureImage(null);
                setGalleryImages([]);
                setProductBrochure(null);
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => {
                    input.value = '';
                });
                router.push('/auth/dashboard/product');
            } else {
                toast.error(responseData.error || 'Error updating product');
            }
        } catch (error) {
            toast.error('Error updating product');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className='flex justify-between mb-5 align-middle'>
                <h1 className="text-2xl font-bold mb-6">Update Product</h1>
                <a href='/auth/dashboard/product' className="bg-green-600 text-white rounded hover:bg-green-700 pt-4 px-4">
                    All Products
                </a>
            </div>

            <form onSubmit={handleupdateSubmit} className="space-y-6" encType="multipart/form-data">
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                    <div className="">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className='mt-2'>
                            <label className="block mb-1">Description</label>
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                init={{
                                    height: 400,
                                    menubar: true,
                                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
                                }}
                                value={formData.description}
                                onEditorChange={handleEditorChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing and Stock */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Pricing and Stock</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1">Regular Price</label>
                            <input
                                type="number"
                                name="regular_price"
                                value={formData.regular_price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Selling Price</label>
                            <input
                                type="number"
                                name="selling_price"
                                value={formData.selling_price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">BP Value</label>
                            <input
                                type="number"
                                name="bp_value"
                                value={formData.bp_value}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">GST Percentage</label>
                            <input
                                type="number"
                                name="gst_percentage"
                                value={formData.gst_percentage}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={formData.categories.includes(category.id)}
                                    onChange={(e) => {
                                        const newCategories = e.target.checked
                                            ? [...formData.categories, category.id]
                                            : formData.categories.filter(id => id !== category.id);
                                        setFormData(prev => ({ ...prev, categories: newCategories }));
                                    }}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Display Options */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Display Options</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                            />
                            <span>Featured</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="is_bestseller"
                                checked={formData.is_bestseller}
                                onChange={handleChange}
                            />
                            <span>Bestseller</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="is_new_arrival"
                                checked={formData.is_new_arrival}
                                onChange={handleChange}
                            />
                            <span>New Arrival</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="is_trending"
                                checked={formData.is_trending}
                                onChange={handleChange}
                            />
                            <span>Trending</span>
                        </label>
                    </div>
                </div>
                
                {/* Product Brochure Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Product Brochure</h2>
                    
                    {/* Display existing brochure if available */}
                    {existingBrochure && (
                        <div className="mb-4 p-4 bg-gray-50 rounded border">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <FileDown className="text-blue-600" />
                                    <span>Existing brochure</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={downloadBrochure}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                    >
                                        Download
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeExistingBrochure}
                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Upload new brochure */}
                    <div>
                        <label className="block mb-1">
                            {existingBrochure ? 'Replace Brochure (PDF)' : 'Upload Brochure (PDF)'}
                        </label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleBrochureChange}
                            className="w-full p-2 border rounded"
                        />
                        {productBrochure && (
                            <div className="mt-4 flex items-center justify-between p-4 border rounded bg-gray-50">
                                <div className="flex items-center">
                                    <FileUp className="text-blue-500 mr-2" />
                                    <span>{productBrochure.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeBrochure}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Existing Images */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Existing Images</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="relative">
                                <img
                                    src={image.image}
                                    alt={image.alt_text || 'Product image'}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleImageDelete(image.id)}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                >
                                    ×
                                </button>
                                {image.is_feature && (
                                    <span className="absolute bottom-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm rounded">
                                        Feature Image
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                    
                    {/* Feature Image */}
                    <div className="mb-4">
                        <label className="block mb-1">Feature Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFeatureImageChange}
                            className="w-full p-2 border rounded"
                        />
                        {featureImage && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(featureImage)}
                                    alt="Feature"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                
                    {/* Gallery Images */}
                    <div>
                        <label className="block mb-1">Gallery Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleGalleryImagesChange}
                            className="w-full p-2 border rounded"
                        />
                        {galleryImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {galleryImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Gallery ${index}`}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Product Features</h2>
                    {features.map((feature, index) => (
                        <div key={index} className="mb-4 p-4 border rounded">
                            <div className="flex justify-between mb-2">
                                <h3>Feature {index + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={feature.title}
                                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                                    placeholder="Feature Title"
                                    className="w-full p-2 border rounded"
                                />
                                <textarea
                                    value={feature.content}
                                    onChange={(e) => handleFeatureChange(index, 'content', e.target.value)}
                                    placeholder="Feature Content"
                                    className="w-full p-2 border rounded"
                                />
                                
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="w-full p-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Add Feature
                    </button>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={Boolean(formData.is_active)}
                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                        className="mr-2"
                    />
                    <label>Active</label>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default ProductUpdate;