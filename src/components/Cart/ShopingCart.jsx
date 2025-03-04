'use client'

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { showCartSidebar, hideCartSidebar, removeItemFromCart, updateQuantity } from '@/redux/slices/cartSlice';
import { XMarkIcon, ShoppingBagIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

function CartArea() {
    const router = useRouter();
    const dispatch = useDispatch();

    // Get cart state from Redux
    const {
        cartItems = [],
        cartCount = 0,
        subTotal = 0,
        totalGST = 0,
        total = 0,
        isCartSidebarVisible = false,
    } = useSelector((state) => state.cart);

    const handleRemoveItem = (itemId, selectedAttributes) => {
        dispatch(removeItemFromCart({ itemID: itemId, selectedAttributes }));
    };

    const handleQuantityChange = (itemId, selectedAttributes, change) => {
        dispatch(updateQuantity({ 
            itemID: itemId, 
            selectedAttributes, 
            change 
        }));
    };

    return (
        <>
            <button 
                className="group flex items-center p-2" 
                onClick={() => dispatch(showCartSidebar())}
                aria-label="Shopping cart"
            >
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 group-hover:text-gray-600"
                    aria-hidden="true"
                />
                <span className="ml-1 text-sm font-medium group-hover:text-gray-600">
                    {cartCount}
                </span>
                <span className="sr-only">items in cart, view bag</span>
            </button>

            {/* Cart Sidebar Dialog */}
            <Dialog 
                open={isCartSidebarVisible} 
                onClose={() => dispatch(hideCartSidebar())}
                className="relative z-[9999]"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    {/* Header */}
                                    <div className="flex items-start justify-between p-4">
                                        <Dialog.Title className="text-lg font-medium">
                                            Shopping Cart ({cartCount} items)
                                        </Dialog.Title>
                                        <button
                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={() => dispatch(hideCartSidebar())}
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="flex-1 overflow-y-auto p-4">
                                        <div className="space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex space-x-4">
                                                    <div className="relative h-24 w-24 flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="rounded-md object-cover"
                                                        />
                                                    </div>

                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div>
                                                            <h3 className="text-sm font-medium">{item.name}</h3>
                                                            <p className="mt-1 text-sm text-gray-500">
                                                                ₹{item.selling_price}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, item.selectedAttributes, -1)}
                                                                    className="rounded-full p-1 hover:bg-gray-100"
                                                                >
                                                                    <MinusIcon className="h-4 w-4" />
                                                                </button>
                                                                <span>{item.qnt}</span>
                                                                <button
                                                                    onClick={() => handleQuantityChange(item.id, item.selectedAttributes, 1)}
                                                                    className="rounded-full p-1 hover:bg-gray-100"
                                                                >
                                                                    <PlusIcon className="h-4 w-4" />
                                                                </button>
                                                            </div>

                                                            <button
                                                                onClick={() => handleRemoveItem(item.id, item.selectedAttributes)}
                                                                className="text-red-500 hover:text-red-600"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cart Footer */}
                                    <div className="border-t border-gray-200 p-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Subtotal</span>
                                                <span>₹{subTotal}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>GST</span>
                                                <span>₹{totalGST}</span>
                                            </div>
                                            <div className="flex justify-between text-base font-medium">
                                                <span>Total</span>
                                                <span>₹{total}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                                onClick={() => {
                                                    dispatch(hideCartSidebar());
                                                    router.push('/cart');
                                                }}
                                            >
                                                Checkout
                                            </button>
                                        </div>

                                        <div className="mt-4 text-center text-sm text-gray-500">
                                            or {' '}
                                            <Link
                                                href="/shop"
                                                className="text-blue-600 hover:text-blue-500"
                                                onClick={() => dispatch(hideCartSidebar())}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> →</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CartArea;