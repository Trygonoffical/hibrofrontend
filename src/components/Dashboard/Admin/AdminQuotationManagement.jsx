'use client'

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { 
  Search, Filter, ChevronDown, ChevronUp, Clock, CheckCircle, 
  XCircle, AlertCircle, Mail, Download, ArrowUpDown
} from 'lucide-react';

const AdminQuotationManagement = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuotation, setExpandedQuotation] = useState(null);
  const [processingQuotation, setProcessingQuotation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Manual price input for quotation processing
  const [manualPrice, setManualPrice] = useState('');
  
  useEffect(() => {
    fetchQuotations();
  }, []);
  
  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch quotations: ${response.status}`);
      }
      
      const data = await response.json();
      setQuotations(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching quotations:', error);
      setError(error.message);
      toast.error(`Failed to load quotations: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleProcessQuotation = (quotation) => {
    setProcessingQuotation(quotation);
    setManualPrice('');
  };
  
  const submitQuotation = async (id, useManualPrice = false) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      
      let requestData = {};
      if (useManualPrice && manualPrice) {
        requestData.price_per_unit = parseFloat(manualPrice);
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/${id}/process_quotation/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to process quotation: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update the quotation in the list
      setQuotations(prevQuotations => 
        prevQuotations.map(q => q.id === id ? data : q)
      );
      
      setProcessingQuotation(null);
      toast.success('Quotation processed successfully');
    } catch (error) {
      console.error('Error processing quotation:', error);
      toast.error(`Failed to process quotation: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (id, newStatus) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update the quotation in the list
      setQuotations(prevQuotations => 
        prevQuotations.map(q => q.id === id ? data : q)
      );
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(`Failed to update status: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const sendCustomerEmail = async (quotation) => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk-order-requests/${quotation.id}/send_email/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.status}`);
      }
      
      toast.success('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(`Failed to send email: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Filter and sort quotations
  const filteredQuotations = quotations
    .filter(q => {
      // Apply status filter
      if (statusFilter !== 'all' && q.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          q.name.toLowerCase().includes(searchLower) ||
          q.email.toLowerCase().includes(searchLower) ||
          q.phone.includes(searchTerm) ||
          (q.product_name && q.product_name.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      let comparison = 0;
      
      switch (sortField) {
        case 'created_at':
          comparison = new Date(a.created_at) - new Date(b.created_at);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'product':
          comparison = a.product_name?.localeCompare(b.product_name) || 0;
          break;
        case 'quantity':
          comparison = a.quantity_required - b.quantity_required;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  
  if (loading && quotations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
          <p className="ml-4 text-gray-600">Loading quotations...</p>
        </div>
      </div>
    );
  }
  
  if (error && quotations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={fetchQuotations}
            className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quotation Management</h1>
      
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="md:w-64">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="quoted">Quoted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <button
            onClick={fetchQuotations}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {/* Quotation Processing Modal */}
      {processingQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Process Quotation</h2>
            
            <div className="mb-4">
              <p><span className="font-semibold">Customer:</span> {processingQuotation.name}</p>
              <p><span className="font-semibold">Product:</span> {processingQuotation.product_name}</p>
              <p><span className="font-semibold">Quantity:</span> {processingQuotation.quantity_required} units</p>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Price Per Unit (Optional)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  ₹
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={manualPrice}
                  onChange={(e) => setManualPrice(e.target.value)}
                  placeholder="Leave empty for automatic pricing"
                  className="w-full p-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                If left empty, system will calculate price based on bulk pricing tiers.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProcessingQuotation(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => submitQuotation(processingQuotation.id, Boolean(manualPrice))}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Process Quotation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Table Header */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold border-b text-gray-700">
          <div className="col-span-2 flex items-center cursor-pointer" onClick={() => handleSort('name')}>
            Customer Info
            {sortField === 'name' && (
              sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
            )}
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('product')}>
            Product
            {sortField === 'product' && (
              sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
            )}
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('quantity')}>
            Quantity
            {sortField === 'quantity' && (
              sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
            )}
          </div>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('created_at')}>
            Date
            {sortField === 'created_at' && (
              sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
            )}
          </div>
          <div>Status</div>
        </div>
        
        {/* Quotation List */}
        {filteredQuotations.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No quotation requests found matching your filters.
          </div>
        ) : (
          filteredQuotations.map(quotation => (
            <div key={quotation.id} className="border-b last:border-b-0">
              {/* Summary Row */}
              <div 
                className={`grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 cursor-pointer ${expandedQuotation === quotation.id ? 'bg-blue-50' : ''}`}
                onClick={() => setExpandedQuotation(expandedQuotation === quotation.id ? null : quotation.id)}
              >
                <div className="col-span-2">
                  <div className="font-medium">{quotation.name}</div>
                  <div className="text-sm text-gray-600">{quotation.email}</div>
                  <div className="text-sm text-gray-600">{quotation.phone}</div>
                </div>
                <div>{quotation.product_name}</div>
                <div>{quotation.quantity_required} units</div>
                <div className="text-sm">{formatDate(quotation.created_at)}</div>
                <div>{getStatusBadge(quotation.status)}</div>
              </div>
              
              {/* Expanded Details */}
              {expandedQuotation === quotation.id && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Request Details</h3>
                      {quotation.company_name && (
                        <p className="mb-2">
                          <span className="font-medium">Company:</span> {quotation.company_name}
                        </p>
                      )}
                      {quotation.additional_notes && (
                        <div className="mb-2">
                          <p className="font-medium">Additional Notes:</p>
                          <p className="bg-white p-2 rounded border text-sm">{quotation.additional_notes}</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Pricing Details</h3>
                      {quotation.price_per_unit ? (
                        <div>
                          <p className="mb-1">
                            <span className="font-medium">Price Per Unit:</span> ₹{parseFloat(quotation.price_per_unit).toLocaleString()}
                          </p>
                          <p className="mb-1">
                            <span className="font-medium">Total Price:</span> ₹{parseFloat(quotation.total_price).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-600 italic">Not quoted yet</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                    {quotation.status === 'pending' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProcessQuotation(quotation);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Process Quotation
                      </button>
                    )}
                    
                    {quotation.status === 'quoted' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(quotation.id, 'approved');
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(quotation.id, 'rejected');
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sendCustomerEmail(quotation);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-1"
                    >
                      <Mail size={16} />
                      <span>Send Email</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Pagination can be added here if needed */}
    </div>
  );
};

export default AdminQuotationManagement;