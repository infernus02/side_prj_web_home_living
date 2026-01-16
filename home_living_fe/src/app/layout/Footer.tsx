import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h3>Về Home Living</h3>
            <p>Chúng tôi cung cấp các sản phẩm đồ gia dụng chất lượng cao, giúp không gian sống của bạn trở nên hoàn hảo hơn.</p>
            <div className="social-links">
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
              <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Hỗ trợ khách hàng</h3>
            <ul>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Hướng dẫn mua hàng</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Danh mục</h3>
            <ul>
              <li><a href="/category/kitchen">Nhà bếp</a></li>
              <li><a href="/category/bedroom">Phòng ngủ</a></li>
              <li><a href="/category/bathroom">Phòng tắm</a></li>
              <li><a href="/category/living">Phòng khách</a></li>
              <li><a href="/category/decor">Trang trí</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Liên hệ</h3>
            <ul className="contact-list">
              <li><i className="fa-solid fa-location-dot"></i> 123 Đường ABC, Quận 1, TP.HCM</li>
              <li><i className="fa-solid fa-phone"></i> 1900 1234</li>
              <li><i className="fa-solid fa-envelope"></i> support@homeliving.vn</li>
              <li><i className="fa-solid fa-clock"></i> 8:00 - 22:00 (Hàng ngày)</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Home Living. All rights reserved.</p>
          <div className="payment-methods">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-cc-paypal"></i>
            <i className="fa-solid fa-money-bill"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
