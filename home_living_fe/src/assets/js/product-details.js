// Product Details Page JavaScript

// Image gallery functionality
export function initImageGallery() {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.querySelector('.main-image img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      this.classList.add('active');
      
      // Update main image
      const newSrc = this.querySelector('img').src;
      mainImage.src = newSrc;
    });
  });

  // Set first thumbnail as active
  if (thumbnails.length > 0) {
    thumbnails[0].classList.add('active');
  }
}

// Quantity selector functionality
export function initQuantitySelector() {
  const decreaseBtn = document.querySelector('.quantity-btn:first-child');
  const increaseBtn = document.querySelector('.quantity-btn:last-child');
  const quantityInput = document.querySelector('.quantity-input');

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value) || 1;
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value) || 1;
      quantityInput.value = quantity + 1;
    });

    quantityInput.addEventListener('change', () => {
      let quantity = parseInt(quantityInput.value) || 1;
      if (quantity < 1) {
        quantityInput.value = 1;
      }
    });
  }
}

// Wishlist functionality
export function initWishlist() {
  const wishlistBtn = document.querySelector('.btn-wishlist');
  
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }
}

// Initialize all
export function initProductDetails() {
  initImageGallery();
  initQuantitySelector();
  initWishlist();
}
