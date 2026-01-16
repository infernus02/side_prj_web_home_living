import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../assets/css/auth.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const adminEmail = 'admin@gmail.com';
      const adminPassword = '1234';

      if (email === adminEmail && password === adminPassword) {
        const userData = {
          id: 1,
          name: 'Admin',
          email: email,
          avatar: 'https://via.placeholder.com/150',
          role: 'admin'
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: `Xin chào Admin`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/admin/dashboard');
        });
      } else if (email && password) {
        const userData = {
          id: Math.random(),
          name: email.split('@')[0],
          email: email,
          avatar: 'https://via.placeholder.com/150',
          role: 'user'
        };

        localStorage.setItem('currentUser', JSON.stringify(userData));

        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: `Xin chào ${userData.name}`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Vui lòng nhập email và mật khẩu'
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-wrapper">
          {/* Left Side - Form */}
          <div className="auth-form-side">
            <div className="auth-form-content">
              <h1>Đăng Nhập</h1>
              <p className="auth-subtitle">Chào mừng quay trở lại Home Living</p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mật Khẩu</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`fa-solid fa-eye${showPassword ? '' : '-slash'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-remember">
                  <label>
                    <input type="checkbox" />
                    <span>Ghi nhớ tôi</span>
                  </label>
                  <a href="/" onClick={(e) => e.preventDefault()} className="forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Đang đăng nhập...
                    </>
                  ) : (
                    'Đăng Nhập'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>Hoặc</span>
              </div>

              <div className="social-login">
                <button className="social-btn google" onClick={(e) => e.preventDefault()}>
                  <i className="fa-brands fa-google"></i>
                  <span>Google</span>
                </button>
                <button className="social-btn facebook" onClick={(e) => e.preventDefault()}>
                  <i className="fa-brands fa-facebook"></i>
                  <span>Facebook</span>
                </button>
              </div>

              <p className="auth-footer">
                Bạn chưa có tài khoản?{' '}
                <Link to="/register" className="auth-link">
                  Tạo tài khoản mới
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="auth-image-side">
            <div className="auth-image-content">
              <img
                src="https://via.placeholder.com/500x600?text=Home+Living"
                alt="Home Living"
              />
              <div className="auth-image-overlay">
                <h2>Home Living</h2>
                <p>Cửa hàng nội thất hàng đầu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
