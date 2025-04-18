
"use client"
import { useState, useEffect } from 'react'
import CustomerAddress from '@/components/Profile/CustomerAddress'
import CustomerProfile from '@/components/Profile/CustomerProfile'
import { Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { ArrowDownIcon, InboxArrowDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastContainer } from "react-toastify"
import { useSelector } from 'react-redux'
import OrderHistory from '@/components/Order/OrderHistory'
import 'react-toastify/dist/ReactToastify.css'
import CustomerAds from '@/components/Ads/CustomerAds'

const Account = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);
    
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        // Check for 'tab' query parameter
        const tabParam = searchParams.get('tab');
        
        if (tabParam === 'orders') {
            setSelectedTab(1);
        }
    }, [searchParams]);

    // Redirect if no user info
    useEffect(() => {
        if (!userInfo) {
            router.push('/');
        }
    }, [userInfo, router]);

    if (!userInfo) {
        return null; // Prevent render while redirecting
    }

    return (
        <>
            <CustomerAds />
            <section className='mx-auto max-w-7xl lg:px-8 py-8'>
                <TabGroup 
                    vertical 
                    selectedIndex={selectedTab}
                    onChange={setSelectedTab}
                    className='md:grid md:grid-cols-4 gap-2 p-4'
                >
                    <TabList className='flex justify-center md:justify-start md:flex-col  p-2'>
                        <Tab className='py-4 flex justify-between px-2 mr-5 md:mr-0 border-b-2 border-gray-200  ui-selected:bg-gray-800 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black items-center'>
                            <span className='flex justify-start items-center'>
                                <UserIcon className='w-8 h-8 mr-1' />
                                My Profile 
                            </span>
                            <ArrowRightIcon className='hidden md:block w-4 h-4 mr-1' />
                            <ArrowDownIcon className='md:hidden w-4 h-4 ml-1' />
                        </Tab>
                        <Tab className='py-4 flex justify-between px-2 border-b-2 border-gray-200  ui-selected:bg-gray-800 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black items-center'>
                            <span className='flex justify-start items-center'>
                                <InboxArrowDownIcon className='w-8 h-8 mr-1' />
                                My Order 
                            </span>
                            <ArrowRightIcon className='hidden md:block w-4 h-4 mr-1' />
                            <ArrowDownIcon className='md:hidden w-4 h-4 ml-1' />
                        </Tab>
                    </TabList>

                    <TabPanels className='p-4 py-10 border border-slate-100 col-span-3 '>
                        <TabPanel>
                            <CustomerProfile />
                            <hr className='my-10' />
                            <CustomerAddress />
                        </TabPanel>
                        <TabPanel>
                            <OrderHistory />
                        </TabPanel>
                    </TabPanels>
                </TabGroup> 
            </section>
            <ToastContainer />
        </>
    )
}

export default Account