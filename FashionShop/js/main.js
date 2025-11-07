// main.js - Quản lý sản phẩm, giỏ hàng, giao diện và các chức năng chính.
// Phiên bản yêu cầu đăng nhập trước khi vào web.

// ===================== CUSTOM ALERT FUNCTION =====================
/**
 * Hiển thị một hộp thoại thông báo tùy chỉnh.
 * @param {string} message - Nội dung thông báo cần hiển thị.
 */
function showCustomAlert(message) {
    const alertOverlay = document.getElementById('customAlert');
    const alertMessage = document.getElementById('customAlertMessage');

    // Nếu không tìm thấy cấu trúc HTML của modal, dùng alert mặc định để không gây lỗi
    if (!alertOverlay || !alertMessage) {
        alert(message);
        return;
    }

    alertMessage.textContent = message;
    alertOverlay.classList.add('show');
}

/**
 * Khởi tạo các sự kiện cho hộp thoại thông báo tùy chỉnh (đóng khi nhấn OK hoặc nền).
 */
function initCustomAlert() {
    const alertOverlay = document.getElementById('customAlert');
    const alertOkBtn = document.getElementById('customAlertOk');

    if (alertOverlay && alertOkBtn) {
        alertOkBtn.addEventListener('click', () => {
            alertOverlay.classList.remove('show');
        });
        // Cho phép đóng modal khi nhấp vào vùng nền mờ
        alertOverlay.addEventListener('click', (e) => {
            if (e.target === alertOverlay) {
                 alertOverlay.classList.remove('show');
            }
        });
    }
}


// ===================== NGUỒN DỮ LIỆU SẢN PHẨM =====================
const defaultProducts = [
  // Sản phẩm trẻ em
  { id: 1, name: "Áo Hoodie Bé", price: 150000, image: "img/k1.jpg", category: "kids", featured: false },
  { id: 2, name: "Set Quần Jean-Áo Cadigan", price: 350000, image: "img/k2.jpg", category: "kids", featured: false },
  { id: 3, name: "Bộ đồ polo bé nam", price: 250000, image: "img/k3.jpg", category: "kids", featured: false },
  { id: 4, name: "Set Nỉ Thu Đông", price: 300000, image: "img/k4.jpg", category: "kids", featured: false },
  { id: 5, name: "Set Đồ Cọc Tay", price: 180000, image: "img/k5.jpg", category: "kids", featured: true },
  { id: 6, name: "Vest-Gile bé trai", price: 580000, image: "img/k6.webp", category: "kids", featured: false },
  { id: 7, name: "Bộ Đồ Thể Thao", price: 200000, image: "img/k7.jpg", category: "kids", featured: false },
  { id: 8, name: "Set Đồ Spiderman", price: 340000, image: "img/k8.jpg", category: "kids", featured: false },
  { id: 9, name: "Set Thu Đông Bé Gái", price: 280000, image: "img/k9.jpg", category: "kids", featured: false },
  { id: 10, name: "Đồ Bộ Thể Thao", price: 330000, image: "img/k10.jpg", category: "kids", featured: false },
  { id: 11, name: "Set Style Hàn", price: 380000, image: "img/k11.jpg", category: "kids", featured: false },
  { id: 12, name: "Set Nỉ Thun", price: 400000, image: "img/k12.jpg", category: "kids", featured: false },

  // Sản phẩm nam
  { id: 13, name: "Áo Varsity", price: 650000, image: "img/m1.jpg", category: "men", featured: true },
  { id: 14, name: "Áo Khoác Jean", price: 420000, image: "img/m2.jpg", category: "men", featured: false },
  { id: 15, name: "Áo Polo Nhung Tăm", price: 180000, image: "img/m3.jpg", category: "men", featured: false },
  { id: 16, name: "Quần Jean Nam", price: 400000, image: "img/m4.png", category: "men", featured: false },
  { id: 17, name: "Đồ MU", price: 380000, image: "img/m5.png", category: "men", featured: true },
  { id: 18, name: "Áo Sơ mi", price: 310000, image: "img/m6.jpg", category: "men", featured: false },
  { id: 19, name: "Quần Short Jean", price: 160000, image: "img/m7.jpg", category: "men", featured: false },
  { id: 20, name: "Quần Jean Rách Gối", price: 460000, image: "img/m8.png", category: "men", featured: false },
  { id: 21, name: "Áo Da Biker", price: 700000, image: "img/m9.png", category: "men", featured: true },
  { id: 22, name: "Quần Jean Đính Đá", price: 990000, image: "img/m10.png", category: "men", featured: true },
  { id: 23, name: "Áo Thun", price: 130000, image: "img/m11.jpg", category: "men", featured: false },
  { id: 24, name: "Áo Sweater", price: 270000, image: "img/m12.jpg", category: "men", featured: false },

  // Sản phẩm nữ 
  { id: 25, name: "Bộ Đồ Công Sở Cao Cấp ", price:980000  , image: "img/w1.png", category: "women", featured: true},
  { id: 26, name: "Váy Họa Tiết Rực Rỡ", price: 450000 , image: "img/w2.png", category: "women", featured: false},
  { id: 27, name: "Quần Short AC", price: 300000 , image: "img/w3.png", category: "women", featured: false},
  { id: 28, name: "Váy Trễ Vai ", price: 360000 , image: "img/w4.png", category: "women", featured: false},
  { id: 29, name: "Bộ Đồ Ngủ Mịn", price: 400000 , image: "img/w5.png", category: "women", featured: false},
  { id: 30, name: "Áo Thun ADLV", price: 280000 , image: "img/w6.png", category: "women", featured: false},
  { id: 31, name: "Váy Mây", price:440000  , image: "img/w7.png", category: "women", featured: true},
  { id: 32, name: "Áo Polo Zip", price: 310000 , image: "img/w8.png", category: "women", featured: false},
  { id: 33, name: "Áo Cadigan", price:520000 , image: "img/w9.png", category: "women", featured: false},
  { id: 34, name: "Váy Dạo Phố", price:6610000 , image: "img/w10.png", category: "women", featured: false},
  { id: 35, name: "Đồ Ngủ Ngắn Tay ", price: 300000, image: "img/w11.png", category: "women", featured: false},
  { id: 36, name: "Áo Sơ Mi AC", price: 290000, image: "img/w12.png", category: "women", featured: false},
  
  // Sản phẩm sale
  //{ id: 14, name: "Áo Khoác Jean", price: 299000, originalPrice: 420000, image: "img/m2.jpg", category: "sale", featured: false },
  
  { id: 6, name: "Vest-Gile bé trai", price: 580000,originalPrice: 390000, image: "img/k6.webp", category: "sale", featured: false },
  { id: 20, name: "Quần Jean Rách Gối", price: 460000,originalPrice:320000 ,image: "img/m8.png", category: "sale", featured: false },
  { id: 36, name: "Áo Sơ Mi AC", price: 290000,originalPrice:240000, image: "img/w12.png", category: "sale", featured: false},
  { id: 35, name: "Đồ Ngủ Ngắn Tay ", price: 300000,originalPrice:220000, image: "img/w11.png", category: "sale", featured: false},
  { id: 22, name: "Quần Jean Đính Đá", price: 990000,originalPrice:630000, image: "img/m10.png", category: "sale", featured: true },
  { id: 24, name: "Áo Sweater", price: 270000,originalPrice:220000, image: "img/m12.jpg", category: "sale", featured: false },
  { id: 19, name: "Quần Short Jean", price: 160000,originalPrice:100000, image: "img/m7.jpg", category: "sale", featured: false },
  { id: 25, name: "Bộ Đồ Công Sở Cao Cấp ", price:980000,originalPrice:890000, image: "img/w1.png", category: "sale", featured: true},

];

function getAllProducts() {
  return defaultProducts;
}

// ===================== CÁC HÀM RENDER (HIỂN THỊ) =====================
function renderList(list, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  if (list.length === 0) {
    c.innerHTML = '<p style="text-align:center; padding: 20px;">Không có sản phẩm nào trong danh mục này.</p>';
    return;
  }
  c.innerHTML = list.map(p => {
    // --- BẮT ĐẦU LOGIC GIẢM GIÁ ---
    const priceHtml = p.originalPrice
      ? `
        <div class="price-display">
          <span class="sale-price">${p.price.toLocaleString()}₫</span>
          <del class="original-price">${p.originalPrice.toLocaleString()}₫</del>
        </div>
      `
      : `<p class="price">${p.price.toLocaleString()}₫</p>`;

    const saleBadgeHtml = p.originalPrice
      ? `<span class="sale-badge">-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%</span>`
      : '';
    // --- KẾT THÚC LOGIC GIẢM GIÁ ---

    return `
      <div class="product-card" data-id="${p.id}" data-aos="fade-up">
        ${saleBadgeHtml}
        <img src="${p.image}" alt="${p.name}" style="aspect-ratio: 1/1; object-fit: cover;">
        <h3>${p.name}</h3>
        <div class="meta">
          ${priceHtml}
          <div style="display:flex;gap:8px">
            <button onclick="viewDetail(${p.id})">Xem</button>
            <button onclick="addToCart(${p.id})" class="btn">Thêm</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.AOS) AOS.refresh();
}

function renderCarousel(list) {
  const w = document.getElementById('carouselWrapper');
  if (!w) return;
  w.innerHTML = list.map(p => {
    // --- BẮT ĐẦU LOGIC GIẢM GIÁ ---
    const priceHtml = p.originalPrice
      ? `
        <div class="price-display">
          <span class="sale-price">${p.price.toLocaleString()}₫</span>
          <del class="original-price">${p.originalPrice.toLocaleString()}₫</del>
        </div>
      `
      : `<p>${p.price.toLocaleString()}₫</p>`;
      
    const saleBadgeHtml = p.originalPrice
      ? `<span class="sale-badge">-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%</span>`
      : '';
    // --- KẾT THÚC LOGIC GIẢM GIÁ ---

    return `
      <div class="swiper-slide">
        ${saleBadgeHtml}
        <img class="card-img" src="${p.image}" alt="${p.name}">
        <div class="card-content">
          <h4>${p.name}</h4>
          ${priceHtml}
          <div class="actions">
            <button onclick="viewDetail(${p.id})">Xem</button>
            <button class="btn" onclick="addToCart(${p.id})">Thêm</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===================== GIỎ HÀNG (CART) =====================
function getCartItems() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCartItems(cartList) {
  localStorage.setItem("cart", JSON.stringify(cartList));
  updateCartCount();
}

function addToCart(productId) {
  const product = getAllProducts().find(p => p.id === productId);
  if (!product) {
    console.error("Sản phẩm không tìm thấy với ID:", productId);
    return;
  }
  let cart = getCartItems();
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, image: product.image, quantity: 1 });
  }
  saveCartItems(cart);
  showCustomAlert(`"${product.name}" đã được thêm vào giỏ hàng!`);
}

function updateQuantity(id, newQuantity) {
  const quantity = parseInt(newQuantity);
  if (isNaN(quantity) || quantity < 1) return;
  let cart = getCartItems();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = quantity;
    saveCartItems(cart);
    renderCart();
  }
}

function removeFromCart(id) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
    let cart = getCartItems();
    cart = cart.filter(i => i.id !== id);
    saveCartItems(cart);
    renderCart();
  }
}

function updateCartCount() {
  const cart = getCartItems();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    countEl.textContent = count > 0 ? count : '';
    countEl.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function renderCart() {
  const cartContainer = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');
  if (!cartContainer) return;

  const cart = getCartItems();
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center;padding:20px;">Giỏ hàng của bạn đang trống.</p>';
    if (cartSummary) cartSummary.innerHTML = '';
    return;
  }

  let total = 0;
  const cartHtml = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-info">
          <h4>${item.name}</h4>
          <p>${item.price.toLocaleString()}₫</p>
        </div>
        <div class="quantity-control">
          <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
          <p class="item-total">Tổng: ${itemTotal.toLocaleString()}₫</p>
          <button onclick="removeFromCart(${item.id})" class="btn-remove">Xóa</button>
        </div>
      </div>
    `;
  }).join('');
  cartContainer.innerHTML = cartHtml;

  if (cartSummary) {
    cartSummary.innerHTML = `
      <h3>Tổng cộng: ${total.toLocaleString()}₫</h3>
      <a class="btn" onclick="handleCheckout()">Tiến hành Thanh toán</a>
      <button onclick="clearCart()" class="btn ghost">Xóa toàn bộ giỏ hàng</button>
    `;
  }
}

function clearCart() {
  if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
    saveCartItems([]);
    renderCart();
  }
}

function handleCheckout() {
    location.href = 'checkout.html';
}

// ===================== KHỞI TẠO CÁC TRANG (PAGE INITIALIZATION) =====================

function populateHome() {
  const all = getAllProducts();
  const featured = all.filter(p => p.featured).slice(0, 6);
  const suggestions = all.slice(0, 8);
  renderList(featured, 'featuredProducts');
  renderCarousel(suggestions);
}

function initProductsPage() {
  const all = getAllProducts();
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  const initialSearchQuery = urlParams.get('search');
  let currentProducts = all;

  if (initialCategory) {
    currentProducts = all.filter(p => p.category === initialCategory);
  }
  if (initialSearchQuery) {
    currentProducts = currentProducts.filter(p => p.name.toLowerCase().includes(initialSearchQuery.toLowerCase()));
    if (searchInput) searchInput.value = initialSearchQuery;
  }
  renderList(currentProducts, 'productList');

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const v = sortSelect.value;
      let sorted = [...currentProducts];
      if (v === 'price-asc') sorted.sort((a, b) => a.price - b.price);
      if (v === 'price-desc') sorted.sort((a, b) => b.price - a.price);
      if (v === 'new') sorted = sorted.reverse();
      renderList(sorted, 'productList');
    });
  }
}

function populateCategoryPage(categoryKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const allProducts = getAllProducts();
  const categoryProducts = allProducts.filter(p => p.category === categoryKey);
  renderList(categoryProducts, containerId);
}

function initProductDetail() {
  const el = document.getElementById('productDetail');
  if (!el) return;
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  if (isNaN(id)) {
    el.innerHTML = '<p>Sản phẩm không hợp lệ.</p>';
    return;
  }
  const p = getAllProducts().find(x => x.id === id);
  if (!p) {
    el.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
    return;
  }
  el.innerHTML = `
    <div class="product-detail">
        <img src="${p.image}" alt="${p.name}">
        <div class="detail-info">
            <h1>${p.name}</h1>
            <h3>${p.price.toLocaleString()}₫</h3>
            <p>Mô tả sản phẩm: Chất liệu cao cấp, đường may tỉ mỉ, phù hợp nhiều dịp.</p>
            <div class="actions">
                <button class="btn" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
                <a class="btn ghost" href="cart.html">Xem giỏ hàng</a>
            </div>
        </div>
    </div>`;
}

function initCheckoutPage() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = checkoutForm.querySelector('input[name="name"]').value.trim();
        const phone = checkoutForm.querySelector('input[name="phone"]').value.trim();
        const address = checkoutForm.querySelector('input[name="address"]').value.trim();

        if (!name || !phone || !address) {
            showCustomAlert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ.');
            return;
        }
        
        showCustomAlert('🎉 Đặt hàng thành công!\nCảm ơn bạn đã mua sắm. Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        localStorage.setItem('cart', JSON.stringify([]));
        
        // Đóng alert rồi mới chuyển trang
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
}

function viewDetail(id) {
  location.href = `product-detail.html?id=${id}`;
}

// ===================== CHỨC NĂNG CHUNG (HEADER, TÀI KHOẢN...) =====================
function headerSearchInit() {
  const headerSearch = document.getElementById('searchInput');
  const headerBtn = document.getElementById('searchBtn');
  if (headerBtn && headerSearch) {
    const performSearch = () => {
        const q = headerSearch.value.trim();
        location.href = `products.html?search=${encodeURIComponent(q)}`;
    };
    headerBtn.addEventListener('click', performSearch);
    headerSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
  }
}

// --- Quản lý tài khoản ---
function handleRegister() {
    const fullName = document.getElementById("regFullName")?.value.trim();
    const birthDate = document.getElementById("regBirthDate")?.value.trim();
    const phone = document.getElementById("regPhone")?.value.trim();
    const address = document.getElementById("regAddress")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const password = document.getElementById("regPassword")?.value.trim();

    if (!fullName || !birthDate || !phone || !address || !email || !password) {
        showCustomAlert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (password.length < 6) {
        showCustomAlert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(u => u.email === email)) {
        showCustomAlert("Email này đã được đăng ký!");
        return;
    }

    users.push({ fullName, birthDate, phone, address, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showCustomAlert("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

function handleLogin() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();

    if (!email || !password) {
        showCustomAlert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        showCustomAlert(`Xin chào ${user.fullName || user.email}!`);
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } else {
        showCustomAlert("Email hoặc mật khẩu không đúng!");
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser');
    showCustomAlert("Bạn đã đăng xuất!");
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

function checkLoginStatus() {
    const loggedInUserString = localStorage.getItem('loggedInUser');
    if (!loggedInUserString) {
        const currentPage = window.location.pathname;
        if (!currentPage.includes('login.html') && !currentPage.includes('register.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }
    return JSON.parse(loggedInUserString);
}

function loadUserProfile() {
    const loggedInUser = checkLoginStatus(); 
    if (!loggedInUser) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === loggedInUser.email);

    if (user) {
        document.getElementById('profileFullName').value = user.fullName || '';
        document.getElementById('profileBirthDate').value = user.birthDate || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileAddress').value = user.address || '';
        document.getElementById('profileEmail').value = user.email || '';
    } else {
        showCustomAlert('Không tìm thấy dữ liệu người dùng. Vui lòng đăng nhập lại.');
        handleLogout();
    }
}

function handleProfileUpdate() {
    const loggedInUser = checkLoginStatus();
    if (!loggedInUser) return; 

    const users = JSON.parse(localStorage.getItem('users') || "[]");
    const userIndex = users.findIndex(u => u.email === loggedInUser.email);
    
    if (userIndex === -1) {
        displayMessage('profileMessage', 'Lỗi: Không tìm thấy tài khoản để cập nhật.', 'error');
        return;
    }

    const newBirthDate = document.getElementById('profileBirthDate').value.trim();
    const newPhone = document.getElementById('profilePhone').value.trim();
    const newAddress = document.getElementById('profileAddress').value.trim();
    const newEmail = document.getElementById('profileEmail').value.trim();
    const newPassword = document.getElementById('profileNewPassword').value.trim();
    const confirmPassword = document.getElementById('profileConfirmPassword').value.trim();
    
    if (newEmail !== users[userIndex].email) {
        if (users.some((u, index) => index !== userIndex && u.email === newEmail)) {
            displayMessage('profileMessage', 'Email này đã được sử dụng bởi tài khoản khác.', 'error');
            return;
        }
    }

    if (newPassword) {
        if (newPassword !== confirmPassword) {
            displayMessage('profileMessage', 'Mật khẩu mới và Nhập lại mật khẩu không khớp.', 'error');
            return;
        }
        if (newPassword.length < 6) {
             displayMessage('profileMessage', 'Mật khẩu phải có tối thiểu 6 ký tự.', 'error');
            return;
        }
    }
    
    users[userIndex].birthDate = newBirthDate;
    users[userIndex].phone = newPhone;
    users[userIndex].address = newAddress;
    
    let emailChanged = false;
    if (newEmail !== users[userIndex].email) {
        users[userIndex].email = newEmail;
        emailChanged = true;
    }

    if (newPassword) {
        users[userIndex].password = newPassword; 
    }

    localStorage.setItem('users', JSON.stringify(users));
    
    if (emailChanged || newPassword) {
        const updatedUser = users[userIndex];
        localStorage.setItem('loggedInUser', JSON.stringify({...updatedUser, role: "user"})); 
    }
    
    document.getElementById('profileNewPassword').value = '';
    document.getElementById('profileConfirmPassword').value = '';
    displayMessage('profileMessage', 'Cập nhật thông tin cá nhân thành công! Vui lòng sử dụng thông tin mới cho lần đăng nhập sau.', 'success');
}

function displayMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = 'message ' + type;
    }
}

function updateHeaderUI() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const accountLink = document.getElementById('accountLink');
    if (accountLink) {
        if (loggedInUser) {
            accountLink.href = 'profile.html';
            accountLink.title = loggedInUser.fullName || 'Thông tin cá nhân';
        } else {
            accountLink.href = 'login.html';
            accountLink.title = 'Đăng nhập';
        }
    }
}

// ===================== SỰ KIỆN KHI TẢI TRANG (DOM LOADED) =====================
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();

  if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
  updateHeaderUI();
  updateCartCount();
  headerSearchInit();
  initCustomAlert(); // Khởi tạo hộp thoại thông báo tùy chỉnh

  if (document.getElementById('productList')) {
    initProductsPage();
  } else if (document.getElementById('featuredProducts')) {
    populateHome();
  }

  populateCategoryPage('men', 'men-product-list');
  populateCategoryPage('women', 'women-product-list');
  populateCategoryPage('kids', 'kids-product-list');
  populateCategoryPage('sale', 'sale-product-list');

  if (document.getElementById('productDetail')) initProductDetail();
  if (document.getElementById('cartItems')) renderCart();
  if (document.getElementById('profileForm')) loadUserProfile();
  initCheckoutPage();

  // --- KHỞI TẠO THƯ VIỆN SWIPER ---
  if (typeof Swiper !== 'undefined') {
    // Khởi tạo Banner
    if (document.querySelector('.banner-swiper')) {
      new Swiper('.banner-swiper', {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    // Khởi tạo Product Carousel
    if (document.querySelector('.product-carousel')) {
      new Swiper('.product-carousel', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
      });
    }
  }
});