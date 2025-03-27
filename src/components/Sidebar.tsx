import { LayoutDashboard, SidebarClose, Table } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

export const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div
      className={`bg-gray-800 overflow-hidden text-white ${isCollapsed ? 'w-0' : 'w-64'
        } min-h-screen transition-all duration-350 ease-in-out relative`}
    >
      <div className={`${isCollapsed ? "hidden" : "px-4 py-3 block w-64"}`}>
          
          <button
            onClick={toggleSidebar}
            className=" bg-gray-800 p-2 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <SidebarClose className='text-gray-400 h-6 w-6'/>
          </button>

        <div className={`w-full flex flex-col justify-center items-center text-center  border-b border-gray-700 py-4`}>
          <LayoutDashboard className="h-16 w-16 mb-2 flex-shrink-0" />
          <span className="text-xl font-semibold text-gray-400">Algo Root Pvt</span>
        </div>

        <div className="mt-4">
          <div className={`flex items-center space-x-3 bg-gray-900 text-gray-300 py-2 ${isCollapsed ? 'justify-center px-2' : 'px-4'
            } rounded-md hover:bg-gray-700 transition-colors cursor-pointer`}>
            <Table className='h-5 w-5 flex-shrink-0' />
            {!isCollapsed && <span>Details</span>}
          </div>
        </div>
      </div>
    </div>
  );
};