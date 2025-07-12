// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/User';
import NavBar from './components/NavBar';
import RegisterUser from './pages/RegisterUser';
import UserDetail from './pages/UserDetail';
import CartsPage from './pages/CartsPage';
import LoginPage from './pages/LoginPage';
import UserProvider from './context/UserProvider';
import CartItemsPage from './pages/CartItemsPage';
import OrderPage from './pages/OrderPage';
import Footer from './components/Footer';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/cart" element={<CartsPage />} />
          <Route path="/cartitem" element={<CartItemsPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
