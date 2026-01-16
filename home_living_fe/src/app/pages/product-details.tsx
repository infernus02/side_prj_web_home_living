import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import '../../assets/css/product-details.css';
import { initProductDetails } from '../../assets/js/product-details';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  specs: { label: string; value: string }[];
  images: string[];
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - replace with API call
  const product: Product = {
    id: parseInt(id || '1'),
    name: 'Bộ chén sứ cao cấp 12 món',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
    category: 'kitchen',
    price: 400000,
    oldPrice: 500000,
    rating: 4.5,
    reviews: 48,
    description: 'Bộ chén sứ cao cấp được làm từ sứ trắng nguyên chất, có độ bền cao và an toàn cho sức khỏe. Thiết kế hiện đại, phù hợp với mọi không gian bếp.',
    specs: [
      { label: 'Chất liệu', value: 'Sứ trắng nguyên chất' },
      { label: 'Số lượng', value: '12 món' },
      { label: 'Kích thước', value: 'Đa dạng' },
      { label: 'Bảo hành', value: '2 năm' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
      { label: 'Trọng lượng', value: '3.5 kg' },
    ],
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop',
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize product details functionality
    setTimeout(() => {
      initProductDetails();
    }, 100);
  }, [id]);

  const handleAddToCart = () => {
    toast.success(`${product.name} x${quantity} đã được thêm vào giỏ hàng!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    Swal.fire({
      icon: 'success',
      title: isWishlisted ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích',
      text: `${product.name} ${isWishlisted ? 'đã được xóa khỏi' : 'đã được thêm vào'} danh sách yêu thích!`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

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

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <main className="product-details-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/products">Sản phẩm</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="product-details-container">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="thumbnail-gallery">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${idx === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating-section">
              <div className="rating-stars">{renderStars(product.rating)}</div>
              <span className="rating-text">{product.rating} / 5</span>
              <span className="rating-count">({product.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="product-price-section">
              {product.oldPrice && (
                <span className="price-old">{product.oldPrice.toLocaleString()}đ</span>
              )}
              <span className="price-new">{product.price.toLocaleString()}đ</span>
              {discount > 0 && <span className="discount-badge">-{discount}%</span>}
            </div>

            {/* Description */}
            <div className="product-description">
              <h4>Mô tả sản phẩm</h4>
              <p>{product.description}</p>
              <ul>
                <li>Chất lượng cao, bền bỉ</li>
                <li>Thiết kế hiện đại, sang trọng</li>
                <li>An toàn cho sức khỏe</li>
                <li>Dễ dàng vệ sinh</li>
              </ul>
            </div>

            {/* Specs */}
            <div className="product-specs">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <div className="action-buttons">
                <button className="btn-add-cart" onClick={handleAddToCart}>
                  <i className="fa-solid fa-cart-plus"></i>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
                  onClick={handleAddToWishlist}
                  title="Thêm vào yêu thích"
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>Sản phẩm liên quan</h2>
          <div className="related-grid">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="product-card" style={{ cursor: 'pointer' }}>
                <div className="product-image">
                  <img
                    src={`https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=300&fit=crop&t=${item}`}
                    alt={`Related product ${item}`}
                  />
                </div>
                <div className="product-info">
                  <h3>
                    <a href="#">Sản phẩm liên quan {item}</a>
                  </h3>
                  <div className="product-rating">
                    {renderStars(4.5)}
                    <span>({Math.floor(Math.random() * 100) + 10})</span>
                  </div>
                  <div className="product-price">
                    <span className="price-new">{(300000 + item * 50000).toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
