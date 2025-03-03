'use client'

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Clock, CheckCircle, XCircle, AlertCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const UserQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Get email from cookie or localStorage or let user input it
    const quotationEmail = Cookies.get('quotationEmail') || localStorage.getItem('quotationEmail');
    
    if (quotationEmail) {
      setEmail(quotationEmail);
      fetchQuotations(quotationEmail);
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchQuotations = async (userEmail) => {
    try {
      setLoading(true);
      console.log('Fetching quotations for email:', userEmail);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/user_requests/?email=${userEmail}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quotations: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quotations data:', data);
      setQuotations(data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      toast.error('Failed to load quotations');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Store email for future use
    localStorage.setItem('quotationEmail', email);
    Cookies.set('quotationEmail', email, { expires: 30 });
    
    // Fetch quotations
    fetchQuotations(email);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </span>
        );
      case 'quoted':
        return (
          <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Quoted</span>
          </span>
        );
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            <span>Rejected</span>
          </span>
        );
      default:
        return (
          <span className="text-gray-600">Unknown</span>
        );
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your quotations...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Quotation Requests</h1>
          <button 
            onClick={() => router.push('/quotation')} 
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Quotation Form</span>
          </button>
        </div>
        
        {!email ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Enter Your Email</h2>
            <p className="text-gray-600 mb-4">
              Please enter the email address you used when requesting quotations.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-grow p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Quotations
              </button>
            </form>
          </div>
        ) : quotations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-xl text-gray-600 mb-6">
              You don't have any quotation requests yet.
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {quotations.map((quotation) => (
              <div key={quotation.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{quotation.product_name}</h2>
                      <p className="text-gray-600">
                        Requested on {formatDate(quotation.created_at)}
                      </p>
                    </div>
                    <div>
                      {getStatusBadge(quotation.status)}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <span className="ml-2 font-medium">{quotation.quantity_required} units</span>
                      </div>
                      
                      {quotation.price_per_unit && (
                        <div>
                          <span className="text-gray-600">Price per unit:</span>
                          <span className="ml-2 font-medium">₹{parseFloat(quotation.price_per_unit).toLocaleString()}</span>
                        </div>
                      )}
                      
                      {quotation.total_price && (
                        <div>
                          <span className="text-gray-600">Total price:</span>
                          <span className="ml-2 font-medium">₹{parseFloat(quotation.total_price).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {quotation.additional_notes && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Additional Notes:</h3>
                        <p className="text-sm bg-gray-50 p-3 rounded">{quotation.additional_notes}</p>
                      </div>
                    )}
                    
                    {quotation.status === 'quoted' && (
                      <div className="flex justify-end gap-3 pt-4">
                        <button 
                          onClick={() => router.push(`/product/${quotation.product_slug}`)}
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                          View Product
                        </button>
                        <button 
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                          onClick={() => {
                            // Here you would implement approval/ordering logic
                            toast.success('Feature coming soon!');
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Place Order</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {email && quotations.length > 0 && (
          <div className="mt-8 flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Viewing quotations for: <span className="font-medium">{email}</span>
            </p>
            <button
              onClick={() => {
                // Clear email and quotations
                setEmail('');
                setQuotations([]);
                localStorage.removeItem('quotationEmail');
                Cookies.remove('quotationEmail');
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              Change Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuotations;