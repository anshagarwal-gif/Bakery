import { useState,useEffect } from "react";
import { Search, X, Minus, Plus, ShoppingBag } from "lucide-react";
import axios from "axios";

export default function BakeryBillingSystem() {
  const [products, setProducts] = useState([
    
  ]);

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [phoneNumber, setPhoneNumber] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const GST_RATE = 0.18;

  const categories = [
    "All",
    "Pastries",
    "Muffins",
    "Cupcakes",
    "Breads",
    "Cookies",
    "Cakes",
    "Pies",
    "Tarts",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const fetchProducts=async()=>{
    try {
      const res = await axios.get(`${apiBaseUrl}/api/inventory/1`)
      const data = res.data;

        const extractedProducts = data.map(item => ({
          ...item.product,
          stockQuantity: item.stockQuantity,
          status: item.status,
          lastUpdated: item.lastUpdated
        }));
        console.log(extractedProducts)
        setProducts(extractedProducts);
    } catch (error) {
      console.log({message:error})
    }
  }
  useState(()=>{
    fetchProducts()
  },[])
  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map((item) => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return (
    <div className="bg-gray-50 w-full h-screen flex flex-col">
      <div className="flex flex-col md:flex-row p-4 gap-4 h-full overflow-hidden">
        {/* Left Section - Products */}
        <div className="w-full md:w-2/3 flex flex-col min-h-0">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Billing System</h1>
              <p className="text-gray-500">Create new orders and generate invoices</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-64"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-4 overflow-x-auto whitespace-nowrap pb-2">
            <div className="inline-flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category
                      ? "bg-purple-500 text-white"
                      : "bg-purple-100 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid - WITH FIXED HEIGHT AND SCROLLABLE */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex-1 flex flex-col min-h-0">
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-purple-50 rounded-lg p-4 flex flex-col"
                  >
                    {/* <div className="flex items-center justify-center mb-4">
                      <div className="bg-gradient-to-br from-pink-200 to-purple-100 p-4 rounded-full">
                        <div className="text-4xl">{product.icon}</div>
                      </div>
                    </div> */}
                    <div className="mt-auto">
                      <h3 className="font-medium text-gray-800">{product.productName}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-700">₹{product.price}</span>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-purple-500 text-white h-8 w-8 rounded-full flex items-center justify-center hover:bg-purple-600"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Cart */}
        <div className="w-full md:w-1/3 flex flex-col min-h-0">
          <div className="bg-white p-6 rounded-lg shadow flex-1 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Current Order</h2>
            
            {/* Customer Phone */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Customer Phone</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className="bg-white text-purple-500 border border-purple-300 px-4 py-2 rounded-lg hover:bg-purple-50">
                  Fetch
                </button>
              </div>
            </div>

            {/* Cart Items - WITH FIXED HEIGHT AND SCROLLABLE */}
            <div className="overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-gray-400 mb-4">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-gray-500 font-medium">Your cart is empty</p>
                  <p className="text-gray-400 text-sm">Add items to begin a new order</p>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{item.icon}</span>
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-gray-500 text-sm">₹{item.price} × {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 bg-red-100 text-red-500 hover:bg-red-200 h-6 w-6 rounded-full flex items-center justify-center"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="text-gray-800">₹{Math.round(gst)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{Math.round(total)}</span>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <button className="w-full bg-purple-500 text-white py-3 rounded-lg mt-6 hover:bg-purple-600 font-medium">
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}