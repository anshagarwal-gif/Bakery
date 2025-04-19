import { useState } from 'react';
import { Search, Plus, Edit, Trash } from 'lucide-react';

export default function InventoryManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Cinnamon Roll', category: 'Pastries', price: 110, quantity: 8, status: 'Low Stock', lastRestocked: '2023-06-02' },
    { id: 2, name: 'Blueberry Muffin', category: 'Muffins', price: 90, quantity: 18, status: 'In Stock', lastRestocked: '2023-06-07' },
    { id: 3, name: 'Cheese Danish', category: 'Pastries', price: 130, quantity: 22, status: 'In Stock', lastRestocked: '2023-06-03' },
    { id: 4, name: 'Chocolate Chip Cookie', category: 'Cookies', price: 60, quantity: 60, status: 'In Stock', lastRestocked: '2023-06-04' },
    { id: 5, name: 'Chocolate Croissant', category: 'Pastries', price: 120, quantity: 45, status: 'In Stock', lastRestocked: '2023-06-05' },
    { id: 6, name: 'French Baguette', category: 'Breads', price: 150, quantity: 12, status: 'In Stock', lastRestocked: '2023-06-07' },
    { id: 7, name: 'Macarons (5pcs)', category: 'Cookies', price: 250, quantity: 30, status: 'In Stock', lastRestocked: '2023-06-01' },
    { id: 8, name: 'Red Velvet Cake Slice', category: 'Cakes', price: 180, quantity: 14, status: 'In Stock', lastRestocked: '2023-06-05' },
    { id: 9, name: 'Sourdough Bread', category: 'Breads', price: 200, quantity: 9, status: 'In Stock', lastRestocked: '2023-06-06' },
    { id: 10, name: 'Vanilla Cupcake', category: 'Cupcakes', price: 85, quantity: 35, status: 'In Stock', lastRestocked: '2023-06-03' }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Pastries', 'Muffins', 'Cupcakes', 'Breads', 'Cookies', 'Cakes'];

  const filteredProducts = selectedFilter === 'All'
    ? products
    : products.filter(product => product.category === selectedFilter);

  const handleIncrement = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product => 
      product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-white rounded-lg shadow p-6 w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-500">Manage your products and inventory</p>
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center">
          <Plus size={20} className="mr-1" />
          Add Product
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full ${
                  selectedFilter === filter
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="ml-auto relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-3 text-left text-gray-500 font-medium">Product</th>
                <th className="py-3 text-left text-gray-500 font-medium">Category</th>
                <th className="py-3 text-left text-gray-500 font-medium">Price</th>
                <th className="py-3 text-left text-gray-500 font-medium">Quantity</th>
                <th className="py-3 text-left text-gray-500 font-medium">Status</th>
                <th className="py-3 text-left text-gray-500 font-medium">Last Restocked</th>
                <th className="py-3 text-left text-gray-500 font-medium">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full">
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      product.category === 'Pastries' ? 'bg-red-100 text-red-500' :
                      product.category === 'Muffins' ? 'bg-pink-100 text-pink-500' :
                      product.category === 'Cookies' ? 'bg-orange-100 text-orange-500' :
                      product.category === 'Breads' ? 'bg-blue-100 text-blue-500' :
                      product.category === 'Cakes' ? 'bg-purple-100 text-purple-500' :
                      'bg-green-100 text-green-500'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4">₹{product.price}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDecrement(product.id)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span>{product.quantity}</span>
                      <button 
                        onClick={() => handleIncrement(product.id)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4">{product.lastRestocked}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}