import { useState } from 'react';
import { Menu, User, LogOut, Trash2, SidebarClose } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';

export const Navbar = () => {
  const { state, logout, deleteAccount } = useAuth();
  const { toggleSidebar, isCollapsed } = useSidebar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto px-4 w-full">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-1 ">
            {isCollapsed && <button
              onClick={toggleSidebar}
              className="hover:bg-gray-100 cursor-pointer transition-colors p-2 "
            >

              <Menu className="h-6 w-6 text-gray-600 " />
                 {/* <SidebarClose className="h-6 w-6 text-gray-600" /> */}
            </button>
            }
            <span className="text-xl  font-semibold pb-1 pt-0.5 pl-2">Dashboard</span>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <User className="h-6 w-6" />
              </button>

              {isMenuOpen && (
                <div className="z-10 border border-gray-100 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    {state.user?.email}
                  </div>
                  <button
                    onClick={logout}
                    className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                  <button
                    onClick={deleteAccount}
                    className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};