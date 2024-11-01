import React from 'react';
import { Home, User, ShoppingCart, Settings, Shield, UserPlus } from 'lucide-react';

const BottomNavigation = ({ user, isAdmin }) => {
  if (!user) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden">
        <div className="flex justify-between items-center px-6">
          <a href="/" className="flex flex-col items-center justify-center text-gray-600">
            <Home size={20} className="mb-1" />
            <span className="text-xs"></span>
          </a>
          
          <a href="/ma-liste" className="flex flex-col items-center justify-center text-gray-600">
            <ShoppingCart size={20} className="mb-1" />
            <span className="text-xs"></span>
          </a>
          
          <a href="./src/components/auth/login/index.jsx" className="flex flex-col items-center justify-center text-gray-600">
            <User size={20} className="mb-1" />
            <span className="text-xs"></span>
          </a>
          
          <a href="./src/components/auth/register/index.jsx" className="flex flex-col items-center justify-center text-gray-600">
            <UserPlus size={20} className="mb-1" />
            <span className="text-xs"></span>
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden">
      <div className={`flex ${isAdmin ? 'justify-between' : 'justify-around'} items-center px-6`}>
        <a href="/" className="flex flex-col items-center justify-center text-gray-600">
          <Home size={20} className="mb-1" />
          <span className="text-xs"></span>
        </a>
        
        <a href="/ma-liste" className="flex flex-col items-center justify-center text-gray-600">
          <ShoppingCart size={20} className="mb-1" />
          <span className="text-xs"></span>
        </a>
        
        <a href="/settings" className="flex flex-col items-center justify-center text-gray-600">
          <Settings size={20} className="mb-1" />
          <span className="text-xs"></span>
        </a>

        {isAdmin && (
          <a href="/admin" className="flex flex-col items-center justify-center text-gray-600">
            <Shield size={20} className="mb-1" />
            <span className="text-xs"></span>
          </a>
        )}
      </div>
    </nav>
  );
};

export default BottomNavigation;