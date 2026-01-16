// Product page interactions
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.btn-icon .fa-cart-plus');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.closest('.product-card').querySelector('.product-info h3 a').textContent;
      console.log(`Added to cart: ${productName}`);
    });
  });

  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll('.btn-icon .fa-heart');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      const productName = this.closest('.product-card').querySelector('.product-info h3 a').textContent;
      console.log(`Toggled wishlist: ${productName}`);
    });
  });

  // Quick view buttons
  const quickViewButtons = document.querySelectorAll('.btn-icon .fa-eye');
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.closest('.product-card').querySelector('.product-info h3 a').textContent;
      console.log(`Quick view: ${productName}`);
    });
  });
});
