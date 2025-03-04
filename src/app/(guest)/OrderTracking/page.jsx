'use client'

import React, { useState } from 'react';
import { PackageSearch, Truck, Box, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  // Mock order data - replace with actual API call
  const mockOrders = {
    'ORD123456': {
      status: 'delivered',
      date: '2024-01-15',
      details: {
        orderDate: '2024-01-10',
        deliveryDate: '2024-01-15',
        currentLocation: 'Local Delivery Center',
        steps: [
          { id: 1, status: 'completed', label: 'Order Placed', date: '2024-01-10' },
          { id: 2, status: 'completed', label: 'Processing', date: '2024-01-11' },
          { id: 3, status: 'completed', label: 'Shipped', date: '2024-01-12' },
          { id: 4, status: 'completed', label: 'Delivered', date: '2024-01-15' }
        ]
      }
    },
    'ORD789012': {
      status: 'in_transit',
      date: '2024-01-18',
      details: {
        orderDate: '2024-01-16',
        expectedDelivery: '2024-01-20',
        currentLocation: 'Regional Hub',
        steps: [
          { id: 1, status: 'completed', label: 'Order Placed', date: '2024-01-16' },
          { id: 2, status: 'completed', label: 'Processing', date: '2024-01-17' },
          { id: 3, status: 'in_progress', label: 'Shipped', date: '2024-01-18' },
          { id: 4, status: 'pending', label: 'Delivery', date: 'Expected 2024-01-20' }
        ]
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOrderStatus(null);
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mockOrders[orderNumber]) {
      setOrderStatus(mockOrders[orderNumber]);
    } else {
      setError('Invalid order number. Please check and try again.');
    }

    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your order number to track your package</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter order number (e.g., ORD123456)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !orderNumber}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Tracking...</>
              ) : (
                <><PackageSearch className="w-5 h-5" /> Track</>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Order Status */}
        {orderStatus && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Status Summary */}
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold mb-2">Order Status</h2>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="font-medium">
                  Current Status: {orderStatus.details.currentLocation}
                </span>
              </div>
              {orderStatus.details.expectedDelivery && (
                <p className="text-gray-600 mt-1">
                  Expected Delivery: {orderStatus.details.expectedDelivery}
                </p>
              )}
            </div>

            {/* Status Timeline */}
            <div className="space-y-8">
              {orderStatus.details.steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {index !== orderStatus.details.steps.length - 1 && (
                    <div 
                      className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%+32px)] -bottom-2 
                        ${step.status === 'completed' ? 'bg-blue-500' : 'bg-gray-200'}`}
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center
                      ${getStatusColor(step.status)} 
                      ${step.status === 'completed' ? 'border-green-500 bg-green-50' : 
                        step.status === 'in_progress' ? 'border-blue-500 bg-blue-50' : 
                        'border-gray-200 bg-gray-50'}`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : step.status === 'in_progress' ? (
                        <Box className="w-5 h-5" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-medium ${getStatusColor(step.status)}`}>
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;