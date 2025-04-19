import {
  ChevronLeft, ChevronRight, LayoutGrid,
  CreditCard,
  Package2,
  Heart,
  BarChart2,
  Users,
} from 'lucide-react';

const Sidebar = ({ setCurrentPage, currentPage, isExpanded, setIsExpanded }) => {
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutGrid size={20} /> },
    { name: 'Billing', icon: <CreditCard size={20} /> },
    { name: 'Inventory', icon: <Package2 size={20} /> },
    { name: 'Loyalty', icon: <Heart size={20} /> },
    { name: 'Sales', icon: <BarChart2 size={20} /> },
    { name: 'Referrals', icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`h-screen bg-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'
        } flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          {isExpanded ? (
            <div className="flex-shrink-0 bg-purple-400 rounded-md mr-2 w-8 h-8"></div>
          ) : (
            // Button to expand the sidebar
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full bg-gray-100 text-gray-500"
            >
              <ChevronRight size={18} />
            </button>
          )}
          {isExpanded && <h1 className="font-semibold text-gray-800 text-lg">Sweet POS</h1>}
        </div>
        {isExpanded && (
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-gray-100 text-gray-500"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-2">
        <ul>
          {navItems.map((item) => {
            const isActive = item.name === currentPage;
            return (
              <li key={item.name}>
                <button
                  onClick={() => setCurrentPage(item.name)}
                  className={`flex items-center w-full text-left ${isExpanded ? 'px-4 py-3' : 'px-4 py-3 justify-center'
                    } transition-all ${isActive
                      ? 'bg-purple-50 border-l-4 border-purple-400 text-purple-600'
                      : 'hover:bg-purple-50 text-gray-600'
                    }`}
                >
                  <span className={isActive ? 'text-purple-600' : 'text-gray-500'}>{item.icon}</span>
                  {isExpanded && <span className={`ml-3 ${isActive ? 'text-purple-600 font-medium' : 'text-gray-600'}`}>{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              A
            </div>
            {isExpanded && (
              <div className="ml-3">
                <div className="text-gray-700 font-medium">Admin</div>
                <div className="text-gray-500 text-sm">Bakery Staff</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
