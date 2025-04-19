import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Pages/Dashboard'
import Inventory from './components/Pages/Inventory'
import Billing from './components/Pages/Billing'
import Loyalty from './components/Pages/Loyalty'
import Sales from './components/Pages/Sales'
import Referral from './components/Pages/Referral'

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />
      case 'Billing':
        return <Billing />
      case 'Inventory':
        return <Inventory />
      case 'Loyalty':
        return <Loyalty />
      case 'Sales':
        return <Sales />
      case 'Referrals':
        return <Referral />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar stays fixed height and width */}
      <div className="w-64 h-full bg-gray-800 text-white">
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>

      {/* Main content scrolls vertically */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
