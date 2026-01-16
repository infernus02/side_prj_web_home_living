import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import '../../assets/css/product.css';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: { type: string; text: string };
}

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Bộ chén sứ cao cấp 12 món',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=300&fit=crop',
      category: 'kitchen',
      price: 400000,
      oldPrice: 500000,
      rating: 4.5,
      reviews: 48,
      badge: { type: 'sale', text: '-20%' },
    },
    {
      id: 2,
      name: 'Gối tựa lưng sofa sang trọng',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      category: 'living',
      price: 250000,
      rating: 4,
      reviews: 32,
      badge: { type: 'new', text: 'Mới' },
    },
    {
      id: 3,
      name: 'Đèn bàn LED hiện đại',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      category: 'decor',
      price: 350000,
      rating: 5,
      reviews: 67,
    },
    {
      id: 4,
      name: 'Thảm trải sàn phòng khách',
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&h=300&fit=crop',
      category: 'living',
      price: 510000,
      oldPrice: 600000,
      rating: 4,
      reviews: 41,
      badge: { type: 'sale', text: '-15%' },
    },
    {
      id: 5,
      name: 'Bình nước thủy tinh 2L',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
      category: 'kitchen',
      price: 180000,
      rating: 5,
      reviews: 89,
    },
    {
      id: 6,
      name: 'Bộ hộp đựng thực phẩm 5 món',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop',
      category: 'kitchen',
      price: 320000,
      rating: 4.5,
      reviews: 76,
      badge: { type: 'hot', text: 'Hot' },
    },
    {
      id: 7,
      name: 'Rèm cửa chống nắng cao cấp',
      image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=300&h=300&fit=crop',
      category: 'bedroom',
      price: 450000,
      rating: 4,
      reviews: 54,
    },
    {
      id: 8,
      name: 'Giỏ tre đựng đồ handmade',
      image: 'https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?w=300&h=300&fit=crop',
      category: 'storage',
      price: 300000,
      oldPrice: 400000,
      rating: 5,
      reviews: 92,
      badge: { type: 'sale', text: '-25%' },
    },
    {
      id: 9,
      name: 'Tấm thảm yoga cao cấp',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
      category: 'decor',
      price: 280000,
      rating: 4.5,
      reviews: 35,
    },
    {
      id: 10,
      name: 'Bộ chăn ga gối cotton',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=300&fit=crop',
      category: 'bedroom',
      price: 550000,
      rating: 4.5,
      reviews: 62,
    },
    {
      id: 11,
      name: 'Bàn ăn gỗ tự nhiên',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
      category: 'living',
      price: 2500000,
      rating: 5,
      reviews: 28,
    },
    {
      id: 12,
      name: 'Ghế sofa 3 chỗ',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      category: 'living',
      price: 3500000,
      rating: 4.5,
      reviews: 45,
    },
    {
      id: 13,
      name: 'Tủ lạnh mini',
      image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=300&h=300&fit=crop',
      category: 'kitchen',
      price: 1200000,
      rating: 4,
      reviews: 38,
    },
    {
      id: 14,
      name: 'Máy rửa bát',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
      category: 'kitchen',
      price: 4500000,
      rating: 4.5,
      reviews: 52,
    },
    {
      id: 15,
      name: 'Bồn tắm massage',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop',
      category: 'bathroom',
      price: 8000000,
      rating: 5,
      reviews: 18,
    },
  ];

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} đã được thêm vào giỏ hàng!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    Swal.fire({
      icon: 'success',
      title: 'Thêm vào yêu thích',
      text: `${product.name} đã được thêm vào danh sách yêu thích!`,
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

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="product-card">
      {product.badge && (
        <div className={`product-badge ${product.badge.type}`}>{product.badge.text}</div>
      )}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button className="btn-icon" onClick={() => handleAddToWishlist(product)}>
            <i className="fa-solid fa-heart"></i>
          </button>
          <button className="btn-icon" onClick={() => navigate(`/product/${product.id}`)}>
            <i className="fa-solid fa-eye"></i>
          </button>
          <button className="btn-icon" onClick={() => handleAddToCart(product)}>
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          {product.oldPrice && <span className="price-old">{product.oldPrice.toLocaleString()}đ</span>}
          <span className="price-new">{product.price.toLocaleString()}đ</span>
        </div>
      </div>
    </div>
  );

  return (
    <main className="products-page">
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <h1>Sản phẩm</h1>
            <p>Khám phá bộ sưu tập đầy đủ của chúng tôi</p>
          </div>

          <div className="products-content">
            {/* Sidebar Filters */}
            <aside className="products-sidebar">
              <div className="filter-group">
                <h3>Tìm kiếm</h3>
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="search-input"
                />
              </div>

              <div className="filter-group">
                <h3>Danh mục</h3>
                <div className="category-filter">
                  {[
                    { value: 'all', label: 'Tất cả' },
                    { value: 'kitchen', label: 'Nhà bếp' },
                    { value: 'bedroom', label: 'Phòng ngủ' },
                    { value: 'bathroom', label: 'Phòng tắm' },
                    { value: 'living', label: 'Phòng khách' },
                    { value: 'decor', label: 'Trang trí' },
                    { value: 'storage', label: 'Lưu trữ' },
                  ].map(cat => (
                    <label key={cat.value}>
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={selectedCategory === cat.value}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Khoảng giá</h3>
                <div className="price-filter">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([priceRange[0], parseInt(e.target.value)]);
                      setCurrentPage(1);
                    }}
                    className="price-range"
                  />
                  <div className="price-display">
                    <span>0đ - {priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-main">
              <div className="products-toolbar">
                <div className="results-info">
                  Hiển thị {paginatedProducts.length} / {filteredProducts.length} sản phẩm
                </div>
                <div className="sort-options">
                  <label>Sắp xếp:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-low">Giá: Thấp đến Cao</option>
                    <option value="price-high">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>
              </div>

              {paginatedProducts.length > 0 ? (
                <>
                  <div className="products-grid">
                    {paginatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                      >
                        <i className="fa-solid fa-chevron-left"></i> Trước
                      </button>

                      <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                      >
                        Sau <i className="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-products">
                  <i className="fa-solid fa-inbox"></i>
                  <p>Không tìm thấy sản phẩm nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
