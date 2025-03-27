import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { TableProvider } from './context/TableContext';
import { SidebarProvider } from './context/SidebarContext';
import { Auth } from './pages/Auth';
import { Details } from './pages/Details';

function App() {
  return (
    <AuthProvider>
      <TableProvider>
        <SidebarProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/details" element={<Details />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </SidebarProvider>
      </TableProvider>
    </AuthProvider>
  );
}

export default App;