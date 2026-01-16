import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginImage from '../../../assets/images/login.jpg';
import { authService } from '../../services/authService';
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

    try {
      const response = await authService.login({
        username: email,
        password: password
      });

      if (response.code === 200 && response.data) {
        const role = response.data.role;
        // Wait for fetchUserInfo to complete before navigating
        const userInfoSuccess = await authService.fetchUserInfo(response.data.token, response.data.role);

        if (userInfoSuccess) {
          if (role === 'ADMIN' || role === 'STAFF') {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        } else {
          toast.error('Không thể tải thông tin người dùng');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
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
                src={loginImage}
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
