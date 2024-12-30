const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400">Projects</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-blue-400">About Us</a></li>
              <li><a href="/shop" className="text-gray-300 hover:text-blue-400">Shop Now</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400">Contact</a></li>
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
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 bg-gray-700 text-white border border-gray-600 rounded-l focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-700 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                Subscribe
              </button>
            </div>
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