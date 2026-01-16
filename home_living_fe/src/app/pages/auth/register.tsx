import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../../assets/css/auth.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Swal.fire('Lỗi', 'Vui lòng nhập họ tên', 'error');
      return false;
    }
    if (!formData.email.includes('@')) {
      Swal.fire('Lỗi', 'Email không hợp lệ', 'error');
      return false;
    }
    if (formData.password.length < 6) {
      Swal.fire('Lỗi', 'Mật khẩu phải ít nhất 6 ký tự', 'error');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Lỗi', 'Mật khẩu không trùng khớp', 'error');
      return false;
    }
    if (!formData.agreeTerms) {
      Swal.fire('Lỗi', 'Vui lòng đồng ý với điều khoản dịch vụ', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        avatar: 'https://via.placeholder.com/150'
      };

      localStorage.setItem('currentUser', JSON.stringify(userData));

      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        text: 'Tài khoản của bạn đã được tạo',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-wrapper">
          {/* Left Side - Image */}
          <div className="auth-image-side">
            <div className="auth-image-content">
              <img
                src="https://via.placeholder.com/500x600?text=Home+Living"
                alt="Home Living"
              />
              <div className="auth-image-overlay">
                <h2>Home Living</h2>
                <p>Tham gia cộng đồng của chúng tôi</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-form-side">
            <div className="auth-form-content">
              <h1>Tạo Tài Khoản</h1>
              <p className="auth-subtitle">Đăng ký để bắt đầu mua sắm</p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="fullName">Họ Tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Nhập họ tên"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Số Điện Thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="0123456789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mật Khẩu</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Ít nhất 6 ký tự"
                      value={formData.password}
                      onChange={handleChange}
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

                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu</label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label="Toggle password visibility"
                    >
                      <i className={`fa-solid fa-eye${showConfirmPassword ? '' : '-slash'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="form-agree">
                  <label>
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <span>
                      Tôi đồng ý với{' '}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        Điều khoản dịch vụ
                      </a>{' '}
                      và{' '}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        Chính sách bảo mật
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Đang tạo tài khoản...
                    </>
                  ) : (
                    'Tạo Tài Khoản'
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
                Bạn đã có tài khoản?{' '}
                <Link to="/login" className="auth-link">
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
