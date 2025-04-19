import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import AddProductModal from '../components/AddProductModal';

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filters = ['All', 'Pastries', 'Muffins', 'Cupcakes', 'Breads', 'Cookies', 'Cakes'];
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const itemsPerPage = 10;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  // Filter products based on category and search term
  const filteredProducts = products
    .filter(product => selectedFilter === 'All' || product.product.category === selectedFilter)
    .filter(product =>
      searchTerm === '' ||
      product.product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiBaseUrl}/api/inventory/1`);
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log({ message: error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleIncrement = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, stockQuantity: product.stockQuantity + 1 } : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.stockQuantity > 0 ? { ...product, stockQuantity: product.stockQuantity - 1 } : product
    ));
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = dateString.split('T')[0];
    return date;
  };

  return (
    <div className="h-screen flex flex-col bg-white rounded-lg shadow p-4 md:p-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-sm text-gray-500">Manage your products and inventory</p>
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center w-full sm:w-auto justify-center"  onClick={toggleModal}>
          <Plus size={18} className="mr-1" />
          Add Product
        </button>
        <AddProductModal isVisible={isModalVisible} toggleModal={toggleModal} />
      </div>

      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${selectedFilter === filter
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-auto sm:ml-auto relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Restocked</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.length > 0 ? (
                    currentItems.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.product.productName}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{product.product.category}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${product.product.category === 'Pastries' ? 'bg-red-100 text-red-500' :
                              product.product.category === 'Muffins' ? 'bg-pink-100 text-pink-500' :
                                product.product.category === 'Cookies' ? 'bg-orange-100 text-orange-500' :
                                  product.product.category === 'Breads' ? 'bg-blue-100 text-blue-500' :
                                    product.product.category === 'Cakes' ? 'bg-purple-100 text-purple-500' :
                                      product.product.category === 'Cupcakes' ? 'bg-green-100 text-green-500' :
                                        'bg-gray-100 text-gray-500'
                            }`}>
                            {product.product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">₹{product.product.price}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDecrement(product.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="text-sm w-6 text-center">{product.stockQuantity}</span>
                            <button
                              onClick={() => handleIncrement(product.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap hidden md:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                            }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {formatDate(product.lastUpdated)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                              <Edit size={16} />
                            </button>
                            <button className="text-red-500 hover:text-red-700 focus:outline-none">
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex space-x-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  }`}
              >
                <ChevronLeft size={16} />
              </button>
              {totalPages <= 5 ? (
                // Show all pages if total pages are 5 or less
                [...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === index + 1
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))
              ) : (
                // Show limited pages with ellipsis for many pages
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === 1
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                      }`}
                  >
                    1
                  </button>

                  {currentPage > 3 && (
                    <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">...</span>
                  )}

                  {/* Pages around current page */}
                  {[...Array(5)].map((_, index) => {
                    const pageNumber = Math.max(2, currentPage - 1) + index;
                    if (pageNumber > 1 && pageNumber < totalPages) {
                      return (
                        <button
                          key={index}
                          onClick={() => goToPage(pageNumber)}
                          className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === pageNumber
                              ? 'bg-purple-500 text-white'
                              : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                            }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  }).filter(Boolean)}

                  {currentPage < totalPages - 2 && (
                    <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700">...</span>
                  )}

                  <button
                    onClick={() => goToPage(totalPages)}
                    className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === totalPages
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                      }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500'
                  }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}