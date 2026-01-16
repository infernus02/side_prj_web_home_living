import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './app/context/ThemeContext';
import { CartProvider } from './app/context/CartContext';
import { FavoritesProvider } from './app/context/FavoritesContext';
import Header from './app/layout/Header';
import Footer from './app/layout/Footer';
import HomePage from './app/pages/index';
import ProductsPage from './app/pages/products';
import ProductDetailsPage from './app/pages/product-details';
import BlogsPage from './app/pages/blogs';
import BlogDetailsPage from './app/pages/blog-details';
import LoginPage from './app/pages/auth/login';
import RegisterPage from './app/pages/auth/register';
import ProfilePage from './app/pages/profile';
import CartPage from './app/pages/cart';
import FavoritesPage from './app/pages/favorites';
import AdminDashboard from './app/pages/admin/dashboard';
import ProductsManagement from './app/pages/admin/products-management';
import CategoriesManagement from './app/pages/admin/categories-management';
import OrdersManagement from './app/pages/admin/orders-management';
import UsersManagement from './app/pages/admin/users-management';
import BlogsManagement from './app/pages/admin/blogs-management';
import FeedbackManagement from './app/pages/admin/feedback-management';
import Settings from './app/pages/admin/settings';
import './assets/css/index.css';
import './assets/css/header.css';
import './assets/css/product.css';
import './assets/css/blogs.css';
import './assets/css/auth.css';
import './assets/css/profile.css';
import './assets/css/cart.css';
import './assets/css/favorites.css';
import './assets/css/admin.css';
import './assets/css/admin-footer.css';
import './assets/css/products-management.css';
import './assets/css/categories-management.css';
import './assets/css/orders-management.css';
import './assets/css/users-management.css';
import './assets/css/blogs-management.css';
import './assets/css/feedback-management.css';
import './assets/css/settings.css';
import './assets/css/pagination.css';

const pageTitles: Record<string, string> = {
  '/': 'Home Living - Cửa hàng nội thất hàng đầu',
  '/products': 'Sản phẩm - Home Living',
  '/product/:id': 'Chi tiết sản phẩm - Home Living',
  '/blog': 'Blog - Home Living',
  '/blog/:id': 'Chi tiết bài viết - Home Living',
  '/login': 'Đăng nhập - Home Living',
  '/register': 'Đăng ký - Home Living',
  '/profile': 'Thông tin cá nhân - Home Living',
  '/cart': 'Giỏ hàng - Home Living',
  '/favorites': 'Sản phẩm yêu thích - Home Living',
  '/admin/dashboard': 'Admin Dashboard - Home Living',
  '/admin/products': 'Quản Lý Sản Phẩm - Home Living',
  '/admin/categories': 'Quản Lý Danh Mục - Home Living',
  '/admin/orders': 'Quản Lý Đơn Hàng - Home Living',
  '/admin/users': 'Quản Lý Người Dùng - Home Living',
  '/admin/blogs': 'Quản Lý Blog - Home Living',
  '/admin/feedback': 'Quản Lý Phản Hồi - Home Living',
  '/admin/settings': 'Cài Đặt - Home Living'
};

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    const path = location.pathname;
    let title = 'Home Living';

    for (const [route, pageTitle] of Object.entries(pageTitles)) {
      if (route === path || path.match(route.replace(':id', '[^/]+'))) {
        title = pageTitle;
        break;
      }
    }

    document.title = title;
  }, [location.pathname]);

  return (
    <div className="App">
      {!isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsManagement />} />
        <Route path="/admin/categories" element={<CategoriesManagement />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/blogs" element={<BlogsManagement />} />
        <Route path="/admin/feedback" element={<FeedbackManagement />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
      {!isAdminPage && <Footer />}
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <AppContent />
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
