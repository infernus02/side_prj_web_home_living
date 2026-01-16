import React from 'react';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const banners = [
    {
      image: require('../../assets/images/banner/banner1.jpg'),
      title: 'Bộ sưu tập mùa xuân 2026',
      desc: 'Làm mới không gian sống của bạn',
    },
    {
      image: require('../../assets/images/banner/banner2.jpg'),
      title: 'Khuyến mãi đặc biệt',
      desc: 'Giảm giá lên đến 50%',
    },
    {
      image: require('../../assets/images/banner/banner3.jpg'),
      title: 'Sản phẩm mới',
      desc: 'Cập nhật hàng tuần',
    },
    {
      image: require('../../assets/images/banner/banner4.jpg'),
      title: 'Chất lượng cao cấp',
      desc: 'Sản phẩm chính hãng 100%',
    },
    {
      image: require('../../assets/images/banner/banner5.jpg'),
      title: 'Giao hàng nhanh',
      desc: 'Miễn phí vận chuyển từ 500k',
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const products = [
    {
      id: 1,
      name: 'Bộ chén sứ cao cấp 12 món',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=300&fit=crop',
      badge: { type: 'sale', text: '-20%' },
      rating: 4.5,
      reviews: 48,
      oldPrice: 500000,
      newPrice: 400000,
    },
    {
      id: 2,
      name: 'Gối tựa lưng sofa sang trọng',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      badge: { type: 'new', text: 'Mới' },
      rating: 4,
      reviews: 32,
      newPrice: 250000,
    },
    {
      id: 3,
      name: 'Đèn bàn LED hiện đại',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      rating: 5,
      reviews: 67,
      newPrice: 350000,
    },
    {
      id: 4,
      name: 'Thảm trải sàn phòng khách',
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&h=300&fit=crop',
      badge: { type: 'sale', text: '-15%' },
      rating: 4,
      reviews: 41,
      oldPrice: 600000,
      newPrice: 510000,
    },
  ];

  const bestSellingProducts = [
    {
      id: 5,
      name: 'Bình nước thủy tinh 2L',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
      rating: 5,
      reviews: 89,
      newPrice: 180000,
    },
    {
      id: 6,
      name: 'Bộ hộp đựng thực phẩm 5 món',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop',
      badge: { type: 'hot', text: 'Hot' },
      rating: 4.5,
      reviews: 76,
      newPrice: 320000,
    },
    {
      id: 7,
      name: 'Rèm cửa chống nắng cao cấp',
      image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=300&h=300&fit=crop',
      rating: 4,
      reviews: 54,
      newPrice: 450000,
    },
    {
      id: 8,
      name: 'Giỏ tre đựng đồ handmade',
      image: 'https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?w=300&h=300&fit=crop',
      badge: { type: 'sale', text: '-25%' },
      rating: 5,
      reviews: 92,
      oldPrice: 400000,
      newPrice: 300000,
    },
  ];

  const categories = [
    { name: 'Nhà bếp', icon: 'fa-kitchen-set', count: 120, link: '/category/kitchen' },
    { name: 'Phòng ngủ', icon: 'fa-bed', count: 85, link: '/category/bedroom' },
    { name: 'Phòng tắm', icon: 'fa-bath', count: 65, link: '/category/bathroom' },
    { name: 'Phòng khách', icon: 'fa-couch', count: 95, link: '/category/living' },
    { name: 'Trang trí', icon: 'fa-lightbulb', count: 150, link: '/category/decor' },
    { name: 'Lưu trữ', icon: 'fa-box', count: 78, link: '/category/storage' },
  ];

  const features = [
    { icon: 'fa-truck-fast', title: 'Giao hàng nhanh', desc: 'Miễn phí vận chuyển đơn từ 500k' },
    { icon: 'fa-shield-halved', title: 'Thanh toán an toàn', desc: 'Bảo mật thông tin 100%' },
    { icon: 'fa-rotate-left', title: 'Đổi trả dễ dàng', desc: 'Trong vòng 30 ngày' },
    { icon: 'fa-headset', title: 'Hỗ trợ 24/7', desc: 'Tư vấn nhiệt tình' },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (i < rating) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
    return stars;
  };

  const ProductCard: React.FC<any> = ({ product }) => (
    <div className="product-card">
      {product.badge && (
        <div className={`product-badge ${product.badge.type}`}>{product.badge.text}</div>
      )}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="btn-icon"><i className="fa-solid fa-heart"></i></button>
          <button className="btn-icon"><i className="fa-solid fa-eye"></i></button>
          <button className="btn-icon"><i className="fa-solid fa-cart-plus"></i></button>
        </div>
      </div>
      <div className="product-info">
        <h3><a href="#">{product.name}</a></h3>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          {product.oldPrice && <span className="price-old">{product.oldPrice.toLocaleString()}đ</span>}
          <span className="price-new">{product.newPrice.toLocaleString()}đ</span>
        </div>
      </div>
    </div>
  );

  return (
    <main>
      <section className="hero-slider">
        <div className="slider-container">
          {banners.map((banner, idx) => (
            <div key={idx} className={`slide ${idx === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url(${banner.image})` }}></div>
          ))}
          <div className="slide-content">
            <h1>Bộ sưu tập mùa xuân 2026</h1>
            <p>Làm mới không gian sống của bạn</p>
            <a href="/products" className="btn btn-primary">Khám phá ngay</a>
          </div>
          <button className="slider-btn prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="slider-btn next" onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <div className="slider-dots">
            {banners.map((_, idx) => (
              <button key={idx} className={`dot ${idx === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(idx)}></button>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-item">
                <i className={`fa-solid ${feature.icon}`}></i>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Danh mục sản phẩm</h2>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <a key={idx} href={cat.link} className="category-card">
                <i className={`fa-solid ${cat.icon}`}></i>
                <h3>{cat.name}</h3>
                <span>{cat.count} sản phẩm</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản phẩm nổi bật</h2>
            <a href="/products" className="view-all">Xem tất cả <i className="fa-solid fa-arrow-right"></i></a>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="banner-section">
        <div className="container">
          <div className="banner-grid">
            <div className="banner-item">
              <div className="banner-content">
                <h3>Bộ sưu tập nhà bếp</h3>
                <p>Giảm giá lên đến 30%</p>
                <a href="/category/kitchen" className="btn btn-light">Mua ngay</a>
              </div>
            </div>
            <div className="banner-item">
              <div className="banner-content">
                <h3>Trang trí nội thất</h3>
                <p>Phong cách hiện đại</p>
                <a href="/category/decor" className="btn btn-light">Khám phá</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản phẩm bán chạy</h2>
            <a href="/products" className="view-all">Xem tất cả <i className="fa-solid fa-arrow-right"></i></a>
          </div>
          <div className="products-grid">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Đăng ký nhận tin</h2>
              <p>Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
            </div>
            <div className="newsletter-form">
              <input type="email" placeholder="Nhập email của bạn" />
              <button className="btn btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
