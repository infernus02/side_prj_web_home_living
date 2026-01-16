import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import { authService } from '../services/authService';
import { User } from '../model/User';
import defaultAvatar from '../../assets/images/default.jpg';

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  React.useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    // Listen for auth changes (login/logout)
    const handleAuthChange = (event: any) => {
      const { user } = event.detail;
      setCurrentUser(user);
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    authService.logout();
    setCurrentUser(null);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <div className="logo">
            <a href="/">
              <i className="fa-solid fa-house-chimney"></i>
              <span>Home Living</span>
            </a>
          </div>

          <ul className="nav-menu">
            <li><a href="/" className={`${isActive('/')}`}><i className="fa-solid fa-house"></i> Trang chủ</a></li>
            <li><a href="/products" className={`${isActive('/products')}`}><i className="fa-solid fa-grid-2"></i> Sản phẩm</a></li>
            <li className="dropdown">
              <a href="#"><i className="fa-solid fa-list"></i> Danh mục <i className="fa-solid fa-chevron-down"></i></a>
              <ul className="dropdown-menu">
                <li><a href="/category/kitchen">Nhà bếp</a></li>
                <li><a href="/category/bedroom">Phòng ngủ</a></li>
                <li><a href="/category/bathroom">Phòng tắm</a></li>
                <li><a href="/category/living">Phòng khách</a></li>
                <li><a href="/category/decor">Trang trí</a></li>
              </ul>
            </li>
            <li><a href="/deals"><i className="fa-solid fa-fire"></i> Khuyến mãi</a></li>
            <li><a href="/blog"><i className="fa-solid fa-newspaper"></i> Blog</a></li>
          </ul>

          <div className="header-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </button>
            <a href="/wishlist" className="header-icon" title="Yêu thích">
              <i className="fa-solid fa-heart"></i>
              <span className="badge">3</span>
            </a>
            <a href="/cart" className="header-icon" title="Giỏ hàng">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="badge">2</span>
            </a>
            {currentUser ? (
              <>
                <a href="/profile" className="header-icon user-profile" title={currentUser.fullName || currentUser.userName}>
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <img src={defaultAvatar} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </a>
                <span className="user-name">{currentUser.fullName || currentUser.userName}</span>
                <a href="#" onClick={handleLogout} className="header-link">Đăng xuất</a>
              </>
            ) : (
              <a href="/login" className="header-link">Đăng nhập</a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
