document.addEventListener("DOMContentLoaded", () => {

    /* ================= 1. حركة الصورة الرئيسية (Hero Section) ================= */
    const heroWrapper = document.querySelector('.hero-image-wrapper');
    const heroBike = document.querySelector('.bike-container');

    if (heroWrapper && heroBike) {
        const moveFactor = 15;
        heroWrapper.addEventListener('mousemove', (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            const xPos = (e.clientX - rect.left) / rect.width - 0.5;
            const yPos = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = xPos * moveFactor;
            const rotateX = -yPos * moveFactor;
            heroBike.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        heroWrapper.addEventListener('mouseleave', () => {
            heroBike.style.transition = 'transform 0.5s ease';
            heroBike.style.transform = 'rotateX(0deg) rotateY(0deg)';
            setTimeout(() => { heroBike.style.transition = 'transform 0.1s ease-out'; }, 500);
        });
    }

    /* ================= 2. حركة القسم الثاني (Tilt Container) ================= */
    const secondSection = document.getElementById("bike-tilt") || document.getElementById("tilt-container");
    const secondImage = document.getElementById("moving-bike");

    if (secondSection && secondImage) {
        secondSection.addEventListener("mousemove", (e) => {
            const rect = secondSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 15;
            const rotateY = (x - centerX) / 15;
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;

            secondImage.style.transition = "transform 0.1s ease-out";
            secondImage.style.transform = `translate(${moveX}px, ${moveY}px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        secondSection.addEventListener("mouseleave", () => {
            secondImage.style.transition = "transform 0.5s ease";
            secondImage.style.transform = `translate(0px, 0px) perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }

    /* ================= 3. حركات كروت المميزات (Touch & Mouse) ================= */
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) / 10;
            const rotateY = (x - rect.width / 2) / 10;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('touchmove', (e) => {
            const rect = card.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const rotateX = (rect.height / 2 - y) / 10;
            const rotateY = (x - rect.width / 2) / 10;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        const resetCard = () => card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        card.addEventListener('mouseleave', resetCard);
        card.addEventListener('touchend', resetCard);
    });

    /* ================= 4. أزرار التحكم وتحقق نموذج الاتصال (Contact Form) ================= */
    const openFormBtn = document.getElementById("openForm");
    const contactPopup = document.getElementById("contactPopup");
    const contactForm = document.getElementById('contactForm');
    
    // أ) كود فتح وإغلاق النافذة من الزر العائم الداكن
    if (openFormBtn && contactPopup) {
        openFormBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            contactPopup.classList.toggle("active");
        });

        // إغلاق النافذة عند الضغط خارجها
        document.addEventListener("click", (e) => {
            if (!contactPopup.contains(e.target) && !openFormBtn.contains(e.target)) {
                contactPopup.classList.remove("active");
            }
        });
    }

    // ب) كود فحص المدخلات وإرسال النموذج
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const nameInput = document.getElementById('nameInput');
            const emailInput = document.getElementById('emailInput');
            
            const nameGroup = nameInput ? nameInput.closest('.input-group') : null;
            const emailGroup = emailInput ? emailInput.closest('.input-group') : null;

            // إزالة رسالة النجاح القديمة إن وجدت
            const oldSuccessMsg = contactForm.querySelector('.form-success-msg');
            if (oldSuccessMsg) {
                oldSuccessMsg.remove();
            }

            let hasError = false;

            // فحص حقل الاسم
            if (nameInput && nameInput.value.trim() === "") {
                if (nameGroup) nameGroup.classList.add('has-error');
                hasError = true;
            } else {
                if (nameGroup) nameGroup.classList.remove('has-error');
            }

            // فحص حقل الإيميل
            if (emailInput && emailInput.value.trim() === "") {
                if (emailGroup) emailGroup.classList.add('has-error');
                hasError = true;
            } else {
                if (emailGroup) emailGroup.classList.remove('has-error');
            }

            // التعامل مع النتيجة (خطأ أو نجاح)
            if (hasError) {
                contactForm.classList.add('has-error'); 
            } else {
                contactForm.classList.remove('has-error'); 

                // إنشاء وإظهار رسالة النجاح
                const successMsg = document.createElement('p');
                successMsg.className = 'form-success-msg';
                successMsg.textContent = 'Demo site – form submission is disabled.';
                
                successMsg.style.backgroundColor = '#d4edda';
                successMsg.style.color = '#155724';
                successMsg.style.padding = '12px';
                successMsg.style.borderRadius = '10px';
                successMsg.style.marginTop = '15px';
                successMsg.style.fontSize = '0.85rem';
                successMsg.style.textAlign = 'left';
                successMsg.style.display = 'block';

                contactForm.appendChild(successMsg);
            }
        });
    }

    /* ================= 5. الوظائف الإضافية (سلة، مفضلة، FAQ) ================= */
    const updateStorage = (btn, key) => {
        const card = btn.closest(".bk-card");
        if (!card) return;
        
        const product = {
            title: card.querySelector(".bk-title")?.innerText || "Product",
            price: card.querySelector(".new-price, .bk-new-price")?.innerText,
            image: card.querySelector(".bk-main-bike")?.src
        };
        let items = JSON.parse(localStorage.getItem(key)) || [];
        if (key === "cart" && !items.some(i => i.title === product.title)) {
            items.push(product);
            btn.classList.add("added");
            btn.innerHTML = "Added ✓";
        } else if (key === "wishlist") {
            btn.classList.toggle("active");
            const icon = btn.querySelector("i");
            if (icon) {
                icon.classList.toggle("far"); 
                icon.classList.toggle("fas");
            }
            if (btn.classList.contains("active")) items.push(product);
            else items = items.filter(i => i.title !== product.title);
        }
        localStorage.setItem(key, JSON.stringify(items));
    };

    document.querySelectorAll(".bk-add-cart").forEach(b => b.addEventListener("click", () => updateStorage(b, "cart")));
    document.querySelectorAll(".wishlist-btn").forEach(b => b.addEventListener("click", () => updateStorage(b, "wishlist")));

    // FAQ
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => q.parentElement.classList.toggle('active'));
    });

    // Swiper
    if (typeof Swiper !== "undefined") {
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: { delay: 2000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
        });
    }

    // زر الصعود لأعلى
    const scrollBtn = document.getElementById("scrollTop");
    if (scrollBtn) scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

/* ================= ================ */
function toggleTestimonial() {
    const item1 = document.getElementById('item-1');
    const item2 = document.getElementById('item-2');

    if (!item1 || !item2) return;

    if (item1.classList.contains('active')) {
        item1.classList.remove('active');
        item2.classList.add('active');
    } else {
        item2.classList.remove('active');
        item1.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.desktop-nav'); 
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            nav.classList.toggle('active');
            
            if (menuIcon) {
                if (nav.classList.contains('active')) {
                    menuIcon.classList.replace('fa-bars', 'fa-times');
                } else {
                    menuIcon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (nav && !nav.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            if (menuIcon) menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });
});
/////cart
 function loadCart() {
            const container = document.getElementById("cartContainer");
            const totalElement = document.getElementById("totalPrice");
            const summary = document.getElementById("cartSummary");
            const emptyMsg = document.getElementById("emptyMsg");
            
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            container.innerHTML = "";
            let total = 0;

            if (cart.length === 0) {
                summary.style.display = "none";
                emptyMsg.style.display = "block";
                return;
            }
            summary.style.display = "flex";
            emptyMsg.style.display = "none";

            cart.forEach((product, index) => {
                const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''));
                total += priceValue;

                container.innerHTML += `
                    <div class="cart-card">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="cart-info">
                            <h2>${product.title}</h2>
                            <p style="color:#888; font-size:0.9rem">${product.brand}</p>
                            <div class="price">${product.price}</div>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            });

            totalElement.innerText = `$${total.toFixed(2)}`;
        }

        function removeItem(index) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.splice(index, 1); 
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart(); 
        }

       
        window.onload = loadCart;
   /************* START SHOP PAGE CODE ***********/
function changeGrid(columns, element) {
    const bikeGrid = document.getElementById('bikeGrid');
    if (bikeGrid) {
        bikeGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
    document.querySelectorAll('.view-dot-wrapper').forEach(dot => dot.classList.remove('active'));
    if (element) element.classList.add('active');
}


window.changeGrid = changeGrid;

function updateCounters() {
    const allCards = document.querySelectorAll('.bk-card');
    const countAllEl = document.getElementById('count-all');
    if (countAllEl) countAllEl.innerText = `${allCards.length} items`;
    
    const filters = ["cannondale", "orbea", "premium", "mountain", "electric", "road", "sport"];
    filters.forEach(cat => {
        const count = document.querySelectorAll(`.bk-card[data-category="${cat}"]`).length;
        const span = document.getElementById(`count-${cat}`);
        if (span) span.innerText = `${count} ${count === 1 ? 'item' : 'items'}`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    updateCounters();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            
            document.querySelectorAll('.bk-card').forEach(card => {
                card.style.display = (filter === "all" || card.dataset.category === filter) ? "block" : "none";
            });
        });
    });
    document.querySelectorAll(".bk-add-cart").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".bk-card");
            if (!card) return;

            const product = {
                title: card.querySelector(".bk-title")?.innerText || "Unknown Bike",
                brand: card.querySelector(".bk-brand")?.innerText || "Unknown Brand",
                price: card.querySelector(".new-price")?.innerText || card.querySelector(".bk-new-price")?.innerText || "$0",
                image: card.querySelector(".bk-main-bike")?.src || ""
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            button.classList.add("added");
            button.innerHTML = "Added ✓";
            button.disabled = true;
        });
    });
});

