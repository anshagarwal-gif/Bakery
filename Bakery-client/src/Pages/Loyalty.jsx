import { useState } from 'react';
import { Pencil, Search } from 'lucide-react';

export default function LoyaltyProgram() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const customers = [
    { id: 1, name: 'Sneha Gupta', phone: '6543210987', tier: 'Platinum', points: 720, totalSpent: '₹31,800', lastVisit: '2023-06-07' },
    { id: 2, name: 'Kavita Joshi', phone: '2109876543', tier: 'Platinum', points: 690, totalSpent: '₹28,600', lastVisit: '2023-06-04' },
    { id: 3, name: 'Neha Kapoor', phone: '4321098765', tier: 'Gold', points: 560, totalSpent: '₹24,700', lastVisit: '2023-06-05' },
    { id: 4, name: 'Rahul Sharma', phone: '9876543210', tier: 'Gold', points: 450, totalSpent: '₹18,750', lastVisit: '2023-06-06' },
    { id: 5, name: 'Vikram Reddy', phone: '5432109876', tier: 'Silver', points: 320, totalSpent: '₹14,800', lastVisit: '2023-06-01' },
    { id: 6, name: 'Priya Patel', phone: '8765432109', tier: 'Silver', points: 280, totalSpent: '₹12,300', lastVisit: '2023-06-02' },
    { id: 7, name: 'Raj Malhotra', phone: '3210987654', tier: 'Bronze', points: 110, totalSpent: '₹5,300', lastVisit: '2023-05-25' },
    { id: 8, name: 'Amit Singh', phone: '7654321098', tier: 'Bronze', points: 85, totalSpent: '₹4,250', lastVisit: '2023-05-28' },
  ];

  const tiers = ['All', 'Bronze', 'Silver', 'Gold', 'Platinum'];

  const filteredCustomers = selectedFilter === 'All'
    ? customers
    : customers.filter(customer => customer.tier === selectedFilter);
  
  const getBgColor = (tier) => {
    switch(tier) {
      case 'Bronze': return 'bg-amber-100 text-amber-800';
      case 'Silver': return 'bg-slate-100 text-slate-800';
      case 'Gold': return 'bg-amber-100 text-amber-800';
      case 'Platinum': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Loyalty Program</h1>
          <p className="text-xs text-gray-500">Manage your customer loyalty program</p>
        </div>
        <button className="flex items-center bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm">
          <span className="mr-1">+</span>
          Add Customer
        </button>
      </div>
      
      <div className="flex gap-3 h-3/5">
        <div className="flex flex-col bg-white rounded-lg shadow flex-1 overflow-hidden">
          <div className="flex items-center justify-between p-2 border-b">
            <div className="flex space-x-1">
              {tiers.map(tier => (
                <button
                  key={tier}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    selectedFilter === tier
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedFilter(tier)}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="h-3 w-3 absolute left-2 top-2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search customers..." 
                className="pl-7 pr-2 py-1 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs w-48"
              />
            </div>
          </div>
          
          <div className="overflow-auto flex-1">
            <table className="min-w-full">
              <thead className="bg-white">
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Customer</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Tier</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Points</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Total Spent</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Last Visit</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">
                      <div>
                        <div className="text-xs font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.phone}</div>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getBgColor(customer.tier)}`}>
                        {customer.tier}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-xs text-gray-900">{customer.points}</td>
                    <td className="py-2 px-3 text-xs text-gray-900">{customer.totalSpent}</td>
                    <td className="py-2 px-3 text-xs text-gray-900">{customer.lastVisit}</td>
                    <td className="py-2 px-3">
                      <button className="text-indigo-500 hover:bg-indigo-50 p-1 rounded">
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="w-64 bg-white rounded-lg shadow flex flex-col">
          <div className="flex flex-col items-center justify-center p-6 flex-1">
            <div className="text-gray-300 mb-3">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
              </svg>
            </div>
            <h3 className="font-medium text-sm text-gray-900 mb-1">Select a Customer</h3>
            <p className="text-xs text-center text-gray-500">Select a customer to view their details and loyalty stats</p>
          </div>
        </div>
      </div>

      <div className="mt-3 h-2/5 overflow-hidden">
        <div className="bg-white rounded-lg shadow h-full flex flex-col">
          <div className="p-3 bg-red-50 border-b border-red-100">
            <h2 className="font-medium text-sm text-gray-900">How Our Loyalty Program Works</h2>
            <p className="text-xs text-gray-600 mt-1">Our tiered loyalty program rewards customers for their continued patronage. Customers earn rewards and advance through tiers based on their spending and engagement.</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="text-center">
              <div className="font-medium text-xs text-amber-800 mb-1">Bronze</div>
              <div className="font-bold text-xs text-gray-900 mb-1">0-299 points</div>
              <div className="text-xs text-gray-500">Basic rewards</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-xs text-slate-800 mb-1">Silver</div>
              <div className="font-bold text-xs text-gray-900 mb-1">300-599 points</div>
              <div className="text-xs text-gray-500">5% birthday discount</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-xs text-amber-800 mb-1">Gold</div>
              <div className="font-bold text-xs text-gray-900 mb-1">600-999 points</div>
              <div className="text-xs text-gray-500">10% birthday discount</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-xs text-indigo-800 mb-1">Platinum</div>
              <div className="font-bold text-xs text-gray-900 mb-1">1000+ points</div>
              <div className="text-xs text-gray-500">15% birthday discount</div>
            </div>
          </div>
          
          <div className="p-3 border-t flex-1 flex flex-col justify-between">
            <div className="mb-2">
              <h3 className="font-medium text-sm text-gray-900 mb-2">Points System</h3>
              <div className="flex items-center mb-1">
                <svg className="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-xs text-gray-600">Earn 2 points for every ₹100 spent</span>
              </div>
              <div className="flex items-center mb-1">
                <svg className="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-xs text-gray-600">Bonus points on birthdays and special occasions</span>
              </div>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-green-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-xs text-gray-600">Redeem points for discounts on purchases</span>
              </div>
            </div>
            
            <button className="w-full bg-indigo-500 text-white font-medium py-1.5 text-sm rounded-lg hover:bg-indigo-600 transition-colors">
              View All Benefits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}