import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-black/30 border-t border-white/10 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">YEPPER</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              The innovative platform connecting advertisers and publishers with AI-powered solutions for maximum engagement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-4">
              <a href="mailto:olympusexperts@gmail.com" className="flex items-center text-white/60 hover:text-blue-400 transition-colors text-sm">
                <Mail size={16} className="mr-3" />
                olympusexperts@gmail.com
              </a>
              <div className="pt-4">
                <Link to="/privacy" className="text-white/60 hover:text-blue-400 transition-colors text-sm mr-6">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-white/60 hover:text-blue-400 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Yepper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;