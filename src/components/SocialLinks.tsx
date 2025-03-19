
import React from 'react';
import { Youtube, Instagram, Facebook, MessageCircle } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  const links = [
    { 
      name: 'YouTube', 
      url: 'https://www.youtube.com/@SaawariyaRasoi', 
      icon: <Youtube size={20} /> 
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/saawariyarasoi/', 
      icon: <Instagram size={20} /> 
    },
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/SaawariyaRasoi', 
      icon: <Facebook size={20} /> 
    },
    { 
      name: 'WhatsApp', 
      url: 'https://chat.whatsapp.com/JUMpHfSAytWJwPsueyQJj2', 
      icon: <MessageCircle size={20} /> 
    }
  ];
  
  return (
    <div className={`flex space-x-4 ${className || ''}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
