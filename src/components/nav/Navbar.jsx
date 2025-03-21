'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, PhoneIcon, PlayCircleIcon, ShoppingCartIcon, TruckIcon, UserIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'
import CartArea from '../Cart/ShopingCart'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
       <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 ">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt="Logo"
              src="/images/logo.png"
              className="h-16 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden space-x-3">
            <div className='flex space-x-3'>
                <div className="flex items-center cursor-pointer">
                <UserIcon className="w-7 h-7 text-gray-600" />
                </div>
                <div className="flex items-center relative cursor-pointer">
                <ShoppingCartIcon className="w-7 h-7 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-[#8B6D4D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                </span>
                </div>
            </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
        <div className="flex h-12">
              {/* Categories Dropdown */}
              <div className="relative">
                <select 
                  className="h-full py-2 px-6 bg-[#8B6D4D] text-white text-sm font-medium rounded-l-md outline-none appearance-none cursor-pointer min-w-[160px]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '16px',
                    borderRadius: '39px 0px 0px 39px',
                  }}
                >
                  <option>All Categories</option>
                  <option> Categories</option>
                  <option> Categories</option>
                  <option> Categories</option>
                </select>
              </div>

              {/* Search Input and Button */}
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search for Products......"
                  className="w-full min-w-[412px]  px-4 py-2 border-y border-r-0 border-l border-gray-300 focus:outline-none text-gray-600"
                />
                  
                <button 
                    className="px-4
                    bg-[#6B8E5F] hover:bg-[#5c7a51]
                      transition-colors rounded-r-md flex items-center justify-center"
                      style={{
                        borderRadius: '0px 39px 39px 0px',
                      }}
                      >
                    <MagnifyingGlassIcon  
                    className=" text-white w-6 h-6"
                     />
                </button>
              </div>
            </div>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-6">
            <div className="flex items-center cursor-pointer">
              {/* <TruckIcon className="w-7 h-7 text-gray-600" /> */}
                <Link href='/OrderTracking'>
                        <Image src='/images/tracking.png' alt='tracking Icon' width={35} height={35} />
                </Link>
            </div>
            <div className="flex items-center cursor-pointer">
                <Link href='/account'>
                        <Image src='/images/user.png' alt='User Icon' width={30} height={30} />
                </Link>
            </div>
            <div className="flex items-center relative cursor-pointer">
              {/* <ShoppingCartIcon className="w-7 h-7 text-gray-600" /> */}
              {/* <Image src='/images/shopping-cart.png' alt='shoppingCart Icon' width={30} height={30} />
              <span className="absolute -top-2 -right-2 bg-[#8B6D4D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span> */}
              <CartArea />
            </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt=""
                src="/Images/logo.png"
                className="h-8 w-auto"
                width={100}
                height={100}
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
   
   
   
  )
}
