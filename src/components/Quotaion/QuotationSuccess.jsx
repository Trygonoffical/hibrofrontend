'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, ListChecks } from 'lucide-react';
import Cookies from 'js-cookie';

const QuotationSuccess = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Get email from cookie or localStorage
    const quotationEmail = Cookies.get('quotationEmail') || localStorage.getItem('quotationEmail');
    if (quotationEmail) {
      setEmail(quotationEmail);
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Quotation Request Successful!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your quotation request. Our team will review your requirements and get back to you
          shortly with pricing information.
        </p>
        
        {email && (
          <div className="bg-blue-50 p-4 rounded-lg mb-8">
            <p className="text-gray-700">
              A confirmation email has been sent to <span className="font-semibold">{email}</span>
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => router.push('/shop')}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <ArrowRight className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          
          <button
            onClick={() => router.push('/quotation?view=history')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ListChecks className="w-5 h-5" />
            <span>View My Quotations</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationSuccess;