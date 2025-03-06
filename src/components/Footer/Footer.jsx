'use client'
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Footer = () => {

  const [companyInfo, setCompanyInfo] = useState({});
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState([]);
      
    
    const [loading, setLoading] = useState(false);
    
    const fetchCompanyInfo = async () => {
        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company-info/`);
            if (!response.ok) throw new Error('Failed to fetch company info');
            const data = await response.json();
            console.log('compnay info - ' , data)
            setCompanyInfo(data)
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to load company information');
        } finally {
            setLoading(false);
        }
    };
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setSubscribing(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletters/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        throw new Error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setSubscribing(false);
    }
  };

  
    useEffect(() => {
            fetchCompanyInfo();
            fetchCategories();
            fetchPages();
        }, []);

    const socialLinks = [
        {
            icon: '/Images/facebook-logo.png',
            link:  companyInfo.facebook_link?companyInfo.facebook_link:'#',
            name: 'facebook'
        },
        {
            icon: '/Images/instagram.png',
            link:  companyInfo.instagram_link?companyInfo.instagram_link:'#',
            name: 'instagram'

        },
        {
            icon: '/Images/youtube.png',
            link:  companyInfo.youtube_link?companyInfo.youtube_link:'#',
            name: 'youtube'

        },
        {
            icon: '/Images/twitter.png',
            link:  companyInfo.twitter_link?companyInfo.twitter_link:'#',
            name: 'twitter'

        },
    ]

  const fetchCategories = async () => {
    try {
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
        const data2 = await res2.json();
        console.log('cats -- ', data2)
        setCategories(data2);
    } catch (error) {
        console.log('Error fetching categories:', error);
    }
};

const fetchPages = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/custom-pages/`);
        const data = await response.json();
        if (response.ok) {
          console.log('page data - ' , data)
          setPages(data);
        }
        
    } catch (error) {
        console.log('Error fetching pages:', error);
    } finally {
        setLoading(false);
    }
};


  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-blue-400">About Us</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-blue-400">Shop Now</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400">Contact</a></li>
              {pages && pages.map(page=>(
                    <li key={page.id}>
                      {page.show_in_footer && (
                        <Link href={`/${page.slug}`}  className="hover:text-gray-300">{page.title}</Link>
                      )}
                    </li>
                  ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
            {categories && categories.map(cats=>(
                    <li key={cats.id}><Link href={`/category/${cats.slug}`}  className="hover:text-gray-300">{cats.name}</Link></li>
                  ))}
              {/* <li><a href="/about" className="text-gray-300 hover:text-blue-400">About Us</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-blue-400">Shop Now</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400">Contact</a></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Chuna Mandi, New Delhi, Delhi</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@hibroproduct.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex mx-auto">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 bg-gray-700 text-white border border-gray-600 rounded-l focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-700 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              type="submit"
              disabled={subscribing}
              >
              {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        <div className="text-center  py-10">
            <h2 className="font-bold text-xl mb-2">
            Have a question or want to place Bulk order?
            </h2>
            <p>
            Helpline Number: Call: <a href="tel:+919999999999 ">+91 9999999999 </a> <br />
            (Mon-Sun: 9am-6pm)
            </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Hibro Product Designed by <a href="#" className="text-blue-300">TRYGON</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;