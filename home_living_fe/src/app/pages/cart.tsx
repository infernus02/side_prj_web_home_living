import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../../assets/css/cart.css';
import { toast } from 'react-toastify';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast.info('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    toast.success('Tiến hành thanh toán');
    // TODO: Implement checkout logic
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
    <div className="cart-page">
      <div className="cart-container">
        <h1>Giỏ Hàng</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fa-solid fa-shopping-cart"></i>
            <p>Giỏ hàng của bạn trống</p>
            <button className="btn-continue-shopping" onClick={handleContinueShopping}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <div className="col-product">Sản phẩm</div>
                <div className="col-price">Giá</div>
                <div className="col-quantity">Số lượng</div>
                <div className="col-total">Tổng cộng</div>
                <div className="col-action">Hành động</div>
              </div>

              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="col-product">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <span className="item-name">{item.name}</span>
                  </div>
                  <div className="col-price">{formatCurrency(item.price)}</div>
                  <div className="col-quantity">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-total">{formatCurrency(item.price * item.quantity)}</div>
                  <div className="col-action">
                    <button
                      className="btn-remove"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Xóa"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Tóm tắt đơn hàng</h2>

                <div className="summary-row">
                  <span>Tổng sản phẩm:</span>
                  <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
                </div>

                <div className="summary-row">
                  <span>Tổng tiền:</span>
                  <span className="total-price">{formatCurrency(getTotalPrice())}</span>
                </div>

                <div className="summary-row">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row final">
                  <span>Thành tiền:</span>
                  <span>{formatCurrency(getTotalPrice())}</span>
                </div>

                <button className="btn-checkout" onClick={handleCheckout}>
                  Tiến hành thanh toán
                </button>

                <button className="btn-continue" onClick={handleContinueShopping}>
                  Tiếp tục mua sắm
                </button>

                <button className="btn-clear" onClick={() => {
                  clearCart();
                  toast.info('Đã xóa tất cả sản phẩm');
                }}>
                  Xóa giỏ hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
