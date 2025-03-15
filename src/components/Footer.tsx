
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border/40 pt-16 pb-8 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Authentic Indian cuisine crafted with love and served with passion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">123 Culinary Street, Flavor Town, FT 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">+91 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">info@saawariyarasoi.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Hours</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Mon - Fri:</span> 11:00 AM - 10:00 PM
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Sat - Sun:</span> 10:00 AM - 11:00 PM
              </li>
              <li className="text-sm text-muted-foreground mt-3">
                <span className="font-medium text-foreground">Delivery Hours:</span> 11:30 AM - 9:30 PM
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Saawariya Rasoi. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
