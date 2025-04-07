import { useState } from 'react';
import {
  Home,
  BarChart2,
  Package,
  Settings,
  CreditCard,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} /> },
    { name: 'Analytics', icon: <BarChart2 size={20} /> },
    { name: 'Inventory', icon: <Package size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
    { name: 'Subscription', icon: <CreditCard size={20} /> },
    { name: 'Referral', icon: <Share2 size={20} /> },
  ];

  const SidebarContent = () => (
    <div
      className={`h-screen bg-white text-white transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      } flex flex-col shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-500 p-2 rounded-md mr-2">
            <div className="w-6 h-6 text-white flex items-center justify-center font-bold">S</div>
          </div>
          {isExpanded && <h1 className="font-bold text-[color:var(--bakery-purple)] text-lg">ShopName</h1>}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-[color:var(--bakery-purple)] bg-[color:var(--bakery-purple)]/50 hidden md:inline"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-4 overflow-auto">
        <ul className="p-[5px]">
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center ${
                    isExpanded ? 'px-4 py-3' : 'px-4 py-3 justify-center'
                  } transition-all ${
                    isActive
                      ? 'bg-[color:var(--bakery-purple)]/30 border-l-[5px] border-[color:var(--bakery-purple)] text-[color:var(--bakery-purple)]'
                      : 'hover:bg-[color:var(--bakery-purple)]/30 text-black'
                  }`}
                >
                  <span>{item.icon}</span>
                  {isExpanded && <span className="ml-3 font-semibold">{item.name}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {isExpanded ? (
          <div className="text-xs text-gray-400">© 2025 ShopName</div>
        ) : (
          <div className="flex justify-center text-gray-400">©</div>
        )}
      </div>
    </div>
  );

  const BottomTabNav = () => (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden">
      {navItems.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`p-2 ${
              isActive ? 'text-[color:var(--bakery-purple)] bg-[color:var(--bakery-purple)]/50 border-b-[5px] border-b-[color--var(--bakery-purple)]' : 'text-gray-500'
            } hover:text-[color:var(--bakery-purple)] transition-colors`}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );

  const MobileTopBar = () => (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 py-3 px-4 z-50">
      <h1 className="text-xl font-semibold text-[color:var(--bakery-purple)]">bakeryPulse</h1>
    </div>
  );

  return (
    <>
      {/* Sidebar for desktop */}
      <div className="hidden md:block">{SidebarContent()}</div>

      {/* Topbar + Bottom tab for mobile */}
      <div className="md:hidden">
        {MobileTopBar()}
        <div className="h-14" /> {/* Spacer below topbar */}
        {BottomTabNav()}
      </div>
    </>
  );
};

export default Sidebar;
