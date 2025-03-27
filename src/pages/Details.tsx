import { Navigate } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { TableData } from '../types';
import DetailsDisplay from '../components/DetailsDisplay';
import useWindowWidth from '../hooks/useWindowWidth';
import { useSidebar } from '../context/SidebarContext';

const mockData: TableData[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-03-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-03-09',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-03-08',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-03-07',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Editor',
    status: 'inactive',
    lastLogin: '2024-03-06',
  },
  {
    id: 6,
    name: 'Eva Davis',
    email: 'eva@example.com',
    role: 'User',
    status: 'active',
    lastLogin: '2024-03-05',
  },
];

export const Details = () => {
  const { state } = useAuth();
  const width = useWindowWidth() as number;
  const { isCollapsed } = useSidebar();
  
  const isSmallerScreen = (w: number) => (w < 770) ? isCollapsed ? true : false : true


  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 text-transparent">Loading </div>
      </div>
    );
  }

  if (!state.user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {
        isSmallerScreen(width) &&
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6 overflow-y-auto">
            {/* <DataTable data={mockData} /> */}
            <DetailsDisplay data={mockData} />
          </main>
        </div>
      }
    </div>
  );
};