import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Inventory from './Pages/Inventory';
import Billing from './Pages/Billing';
import Loyalty from './Pages/Loyalty';
import Sales from './Pages/Sales';
import Referral from './Pages/Referral';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Billing':
        return <Billing />;
      case 'Inventory':
        return <Inventory />;
      case 'Loyalty':
        return <Loyalty />;
      case 'Sales':
        return <Sales />;
      case 'Referrals':
        return <Referral />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed height and width */}
      <div
        className={`transition-all duration-300 ${
          isSidebarExpanded ? 'w-64' : 'w-16'
        } h-full bg-gray-800 text-white`}
      >
        <Sidebar
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isExpanded={isSidebarExpanded}
          setIsExpanded={setIsSidebarExpanded}
        />
      </div>

      {/* Main content scrolls vertically */}
      <main className="flex-1 overflow-y-auto bg-gray-100 pl-2">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
