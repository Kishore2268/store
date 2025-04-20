import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store/:storeId" element={<StorePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </main>
        <footer className="py-6 text-center text-gray-500 border-t">
          <div className="container mx-auto">
            <p>&copy; {new Date().getFullYear()} Hyperlocal Store. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;