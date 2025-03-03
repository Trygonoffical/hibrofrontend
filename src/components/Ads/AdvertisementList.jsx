'use client'

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { TrashIcon, PencilIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AdvertisementForm from './AdvertisementForm';
import Image from 'next/image';

const AdvertisementList = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [editingAdvertisement, setEditingAdvertisement] = useState(null);
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        fetchAdvertisements();
    }, [refreshKey, typeFilter]);

    const fetchAdvertisements = async () => {
        try {
            setLoading(true);
            let url = `${process.env.NEXT_PUBLIC_API_URL}/advertisements/`;
            
            // Add type filter if selected
            if (typeFilter) {
                url += `?type=${typeFilter}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            setAdvertisements(data);
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            toast.error('Failed to load advertisements');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this advertisement?')) {
            return;
        }

        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/advertisements/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Advertisement deleted successfully');
                setRefreshKey(old => old + 1);
            } else {
                toast.error('Error deleting advertisement');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error deleting advertisement');
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/advertisements/${id}/toggle_status/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success(`Advertisement ${currentStatus ? 'deactivated' : 'activated'} successfully`);
                setRefreshKey(old => old + 1);
            } else {
                toast.error('Error updating advertisement status');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error updating advertisement status');
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'MULTI':
                return 'Multiple Ads';
            case 'SINGLE':
                return 'Full Length Ad';
            case 'PRODUCT':
                return 'Product Page Ad';
            default:
                return type;
        }
    };

    if (loading && advertisements.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Advertisements</h1>
                <AdvertisementForm setRefreshKey={setRefreshKey} />
            </div>

            {/* Type Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type:</label>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setTypeFilter('')}
                        className={`px-4 py-2 rounded ${!typeFilter ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setTypeFilter('MULTI')}
                        className={`px-4 py-2 rounded ${typeFilter === 'MULTI' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Multiple Ads
                    </button>
                    <button
                        onClick={() => setTypeFilter('SINGLE')}
                        className={`px-4 py-2 rounded ${typeFilter === 'SINGLE' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Full Length
                    </button>
                    <button
                        onClick={() => setTypeFilter('PRODUCT')}
                        className={`px-4 py-2 rounded ${typeFilter === 'PRODUCT' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        Product Page
                    </button>
                </div>
            </div>

            {advertisements.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center">
                    <p className="text-gray-500">No advertisements found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {advertisements.map(ad => (
                                <tr key={ad.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {ad.image_url && (
                                            <div className="w-16 h-16 relative">
                                                <Image
                                                    src={ad.image_url}
                                                    alt={ad.title || 'Advertisement'}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{ad.title || 'Untitled'}</div>
                                        {ad.link && (
                                            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate block max-w-xs">
                                                {ad.link}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {getTypeLabel(ad.type)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {ad.position || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ad.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {ad.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-2 justify-end">
                                            <button 
                                                onClick={() => setEditingAdvertisement(ad)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="Edit"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleToggleStatus(ad.id, ad.is_active)}
                                                className={`${ad.is_active ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                                                title={ad.is_active ? 'Deactivate' : 'Activate'}
                                            >
                                                {ad.is_active ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(ad.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingAdvertisement && (
                <AdvertisementForm 
                    advertisement={editingAdvertisement}
                    setRefreshKey={setRefreshKey}
                    onClose={() => setEditingAdvertisement(null)}
                />
            )}
        </div>
    );
};

export default AdvertisementList;