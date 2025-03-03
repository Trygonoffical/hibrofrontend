'use client'

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, Clipboard, Users, Settings, 
  LogOut, ChevronDown, Menu, Package, FileText
} from 'lucide-react';
import AdminQuotationManagement from '@/components/Admin/AdminQuotationManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('quotations');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    // Check authentication
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    
    // Get user info
    const validateToken = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validate-token/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Invalid token');
        }
        
        const data = await response.json();
        
        // Verify if user is admin
        if (data.role !== 'ADMIN') {
          router.push('/');
          return;
        }
        
        setUserRole(data.role);
        setUserName(data.username);
      } catch (error) {
        console.error('Token validation error:', error);
        Cookies.remove('token');
        router.push('/auth/login');
      }
    };
    
    validateToken();
    
    // Get active tab from URL if present
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setActiveTab(hash);
    }
  }, [router]);
  
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/auth/login');
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'quotations', label: 'Quotations', icon: <FileText className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'quotations':
        return <AdminQuotationManagement />;
      case 'dashboard':
        return <div className="p-6">Dashboard Content</div>;
      case 'products':
        return <div className="p-6">Products Management</div>;
      case 'orders':
        return <div className="p-6">Orders Management</div>;
      case 'customers':
        return <div className="p-6">Customers Management</div>;
      case 'settings':
        return <div className="p-6">Settings</div>;
      default:
        return <div className="p-6">Select a tab</div>;
    }
  };
  
  // If user role is still loading, show a loading screen
  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
            ) : (
              <span className="text-xl font-bold text-blue-600">AP</span>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      {sidebarOpen && <span className="ml-3">{item.label}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          {/* User Info and Logout */}
          <div className="p-4 border-t">
            <div className="flex items-center text-sm">
              {sidebarOpen ? (
                <>
                  <div className="flex-1">
                    <p className="font-medium truncate">{userName}</p>
                    <p className="text-gray-500 truncate">{userRole}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-1 text-gray-500 hover:text-red-500"
                  >
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="p-1 text-gray-500 hover:text-red-500 mx-auto"
                >
                  <LogOut size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <span className="mr-1">{userName}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;