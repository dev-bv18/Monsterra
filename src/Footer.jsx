import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4 text-sm">All credits reserved. © 2024</p>

        <div className="flex justify-center space-x-6 mb-4 text-md">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="mailto:contact@example.com" className="hover:text-yellow-400">
            <i className="fas fa-envelope"></i> Contact Us
          </a>
        </div>

        <div className="flex justify-center space-x-4">
          <p className='text-sm'>Privacy Policy</p>
          <p className='text-sm'> | </p>
          <p className='text-sm'> Terms of Service</p>
          <p className='text-sm'>  | </p>
          <p className='text-sm'>Sitemap</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
