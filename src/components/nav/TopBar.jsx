import { XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function TopBar() {
  return (
    <>
    {/* Top banner - not sticky */}
    <div className="w-full bg-white py-1 px-4 text-center text-sm">
          For any query, <a href="mailto:care@hibroproducts.com" className="text-blue-600">email us at care@hibroproducts.com</a> or call us on <span className="text-blue-600">+91 999999999</span>
     </div>
    </>
     
  )
}
