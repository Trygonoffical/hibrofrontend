// constants/navItems.js
import { 
    Home, ShoppingCart, UserPlus, Wallet, 
    Network, FileText, Bell, User, TicketPercent 
  } from 'lucide-react';
  
  export const sidebarItemsAdmin = [
    { icon: Home, label: 'Dashboard', active: true, bgColor: 'bg-[#DEB887]' ,  href : '#' },
    // { icon: ShoppingCart, label: 'Reports' ,  href : '#' },
    { icon: Bell, label: 'Notification'  ,  href : '#' },
    { icon: User, label: 'Profile' ,  href : 'profile' },
    { icon: TicketPercent, label: 'Sliders' , href : 'sliders' },
    { icon: Bell, label: 'Categories' , href : 'category' },
    { icon: ShoppingCart, label: 'Products' , href : 'product' },
    { icon: ShoppingCart, label: 'Testimonials' , href : 'testimonial' },
    { icon: FileText, label: 'Advertisements' , href : 'ads' },
    { icon: FileText, label: 'About' , href : 'about' },
    { icon: FileText, label: 'Quotation' , href : 'quotation' },
    { icon: FileText, label: 'Menu' , href : 'menu' },
    { icon: FileText, label: 'Pages' , href : 'customPage' },
    // { icon: TicketPercent, label: 'Ticket' ,  href : '#' },

  ];