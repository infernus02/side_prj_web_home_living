import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { StorageKeys } from '../enums/StorageKeys';
import AdminFooter from './AdminFooter';

interface AdminNavbarLayoutProps {
  children: React.ReactNode;
}

const AdminNavbarLayout: React.FC<AdminNavbarLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const user = localStorage.getItem(StorageKeys.AUTH_USER);
    if (!user) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'ADMIN' && userData.role !== 'STAFF') {
      Swal.fire({
        icon: 'error',
        title: 'Không có quyền truy cập',
        text: 'Chỉ admin/staff mới có thể truy cập trang này',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
      });
      return;
    }

    setCurrentUser(userData);
  }, [navigate]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem(StorageKeys.AUTH_USER);
    localStorage.removeItem(StorageKeys.AUTH_TOKEN);
    localStorage.removeItem(StorageKeys.AUTH_ROLE);
    localStorage.removeItem(StorageKeys.AUTH_USERNAME);
    Swal.fire({
      icon: 'success',
      title: 'Đăng xuất thành công!',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      navigate('/login');
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/admin/dashboard" className={isActive('/admin/dashboard')}>
                <i className="fa-solid fa-chart-line"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/products" className={isActive('/admin/products')}>
                <i className="fa-solid fa-box"></i> Sản phẩm
              </a>
            </li>
            <li>
              <a href="/admin/categories" className={isActive('/admin/categories')}>
                <i className="fa-solid fa-list"></i> Danh mục
              </a>
            </li>
            <li>
              <a href="/admin/orders" className={isActive('/admin/orders')}>
                <i className="fa-solid fa-shopping-cart"></i> Đơn hàng
              </a>
            </li>
            <li>
              <a href="/admin/users" className={isActive('/admin/users')}>
                <i className="fa-solid fa-users"></i> Người dùng
              </a>
            </li>
            <li>
              <a href="/admin/blogs" className={isActive('/admin/blogs')}>
                <i className="fa-solid fa-newspaper"></i> Blog
              </a>
            </li>
            <li>
              <a href="/admin/feedback" className={isActive('/admin/feedback')}>
                <i className="fa-solid fa-comments"></i> Phản hồi
              </a>
            </li>
            <li>
              <a href="/admin/settings" className={isActive('/admin/settings')}>
                <i className="fa-solid fa-cog"></i> Cài đặt
              </a>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <img src={currentUser.avatar} alt={currentUser.name} />
            <div>
              <p className="user-name">{currentUser.name}</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <div className="header-title">
            <h1>Dashboard</h1>
            <p>Chào mừng quay trở lại, {currentUser.name}</p>
          </div>
          <div className="header-actions">
            <button className="btn-icon" title="Notifications">
              <i className="fa-solid fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <div className="user-menu">
              <img src={currentUser.avatar} alt={currentUser.name} />
              <div className="dropdown">
                <a href="/" onClick={(e) => e.preventDefault()}>Tài khoản</a>
                <a href="/" onClick={(e) => e.preventDefault()}>Cài đặt</a>
                <a href="/" onClick={handleLogout}>Đăng xuất</a>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-main">
          {children}
        </div>

        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminNavbarLayout;
