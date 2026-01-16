import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import '../../assets/css/favorites.css';
import { toast } from 'react-toastify';

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleRemoveFromFavorites = (id: number) => {
    removeFromFavorites(id);
    toast.info('Đã xóa khỏi danh sách yêu thích');
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleViewProduct = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        <h1>Sản Phẩm Yêu Thích</h1>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <i className="fa-solid fa-heart"></i>
            <p>Bạn chưa có sản phẩm yêu thích nào</p>
            <button className="btn-continue-shopping" onClick={handleContinueShopping}>
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="favorites-content">
            <div className="favorites-info">
              <p>Bạn có <strong>{favorites.length}</strong> sản phẩm yêu thích</p>
              <button className="btn-clear-all" onClick={() => {
                clearFavorites();
                toast.info('Đã xóa tất cả sản phẩm yêu thích');
              }}>
                Xóa tất cả
              </button>
            </div>

            <div className="favorites-grid">
              {favorites.map(item => (
                <div key={item.id} className="favorite-card">
                  <div className="card-image">
                    <img src={item.image} alt={item.name} />
                    <button
                      className="btn-remove-favorite"
                      onClick={() => handleRemoveFromFavorites(item.id)}
                      title="Xóa khỏi yêu thích"
                    >
                      <i className="fa-solid fa-heart"></i>
                    </button>
                  </div>

                  <div className="card-content">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-category">{item.category}</p>
                    <p className="card-price">{formatCurrency(item.price)}</p>

                    <div className="card-actions">
                      <button
                        className="btn-view"
                        onClick={() => handleViewProduct(item.id)}
                      >
                        <i className="fa-solid fa-eye"></i> Xem chi tiết
                      </button>
                      <button
                        className="btn-add-cart"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i className="fa-solid fa-shopping-cart"></i> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
