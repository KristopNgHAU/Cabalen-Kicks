// Product Data Array
const products = [
    { id: 'nike-court-vision', name: 'Cloud X4', price: 'P10,900.00', category: 'Men\'s Shoes / Lifestyle', image: 'Images/x4.png', desc: 'Swift, Smooth, Stylish. Engineered for all-day agility and breathable daily wear.', trending: true },
    { id: 'nike-air-max-sc', name: 'Nike Air Max SC', price: 'P10,500.00', category: 'Men\'s Shoes / Running', image: 'Images/airmaxsc.png', desc: 'With its easygoing lines, heritage track look and visible Air cushioning, the Nike Air Max SC is the perfect finish to any outfit.', trending: false },
    { id: 'puma-rs-x', name: 'PUMA RS-X Triple', price: 'P10,500.00', category: 'Men\'s Shoes / Lifestyle', image: 'Images/RS-X-Triple-Sneakers.png', desc: 'RS-X is back. The future-retro silhouette of this sneaker returns with a progressive aesthetic and angular details.', trending: false },
    { id: 'jordan-max-aura', name: 'Jordan Max Aura 5', price: 'P6,900.00', category: 'Men\'s Shoes / Basketball', image: 'Images/aura.png', desc: 'Rooted in Jordan heritage, these kicks give you a supportive feel with cushioning that keeps you going all day.', trending: false },
    { id: 'adidas-ozweego', name: 'Adidas Ozweego', price: 'P7,200.00', category: 'Men\'s Shoes / Lifestyle', image: 'Images/osweego.png', desc: 'A futuristic take on late-90s sneakers, blending retro tech details with plush cushioning.', trending: false },
    { id: 'avenue-charcoal', name: 'Avenue Shoes Charcoal Gray', price: 'P2,720.00', category: 'Kids Shoes / Unisex', image: 'Images/charcoalgray.png', desc: 'Durable daily footwear built for active kids, featuring a flexible sole and breathable charcoal gray mesh.', trending: false },
    { id: 'cloud-6-shf', name: 'Cloud 6 SHF', price: 'P9,890.00', category: 'Adults / Running', image: 'Images/cloud6.png', desc: 'Ultimate lightweight performance running shoe designed for maximum energy return and comfort.', trending: true },
    { id: 'nike-air-max-muse', name: 'Nike Air Max Muse', price: 'P9,095.00', category: 'Adults / Lifestyle', image: 'Images/airmaxmuse.png', desc: 'A bold fusion of modern comfort lines and classic cushioning performance.', trending: false },
    { id: 'on-running-cloudtilt', name: 'On Running Cloudtilt', price: 'P11,020.00', category: 'Adults / Running', image: 'Images/cloudtilt.png', desc: 'Effortless forward motion with CloudTec Phase technology for seamless weight transfer.', trending: true },
    { id: 'cloudrock-low', name: 'Cloudrock Low Waterproof', price: 'P12,490.00', category: 'Adults / Outdoor', image: 'Images/cloudrock.png', desc: 'Speed-hiking shoe engineered to handle tough weather and wet trails with absolute grip.', trending: true },
    { id: 'nike-air-force-07', name: 'Nike Air Force \'07', price: 'P5,895.00', category: 'Adults / Lifestyle', image: 'Images/airforce.png', desc: 'The radiance lives on in the Nike Air Force \'07, the b-ball icon that puts a fresh spin on what you know best.', trending: false },
    { id: 'nike-air-jordan-low', name: 'Nike Air Jordan Low', price: 'P6,395.00', category: 'Adults / Lifestyle', image: 'Images/jordan1.png', desc: 'Replicates the iconic look of the high-top original with a low-cut silhouette and stitched Swoosh.', trending: false },
    { id: 'adidas-sl-72', name: 'Adidas SL 72 RS', price: 'P6,000.00', category: 'Adults / Lifestyle', image: 'Images/sl72rs.png', desc: 'First introduced for the 1972 Munich Olympics, this classic retro runner features lightweight nylon and suede.', trending: false }
];

document.addEventListener('DOMContentLoaded', () => {
    renderTrendingProducts();
    renderAllProducts(products);

    // Handle URL hash on initial load
    const initialHash = window.location.hash.replace('#', '') || 'home';
    if (initialHash.startsWith('product-')) {
        const pId = initialHash.replace('product-', '');
        openProduct(pId, false);
    } else {
        switchView(initialHash, null, false);
    }

    // Browser History Navigation Event Listener
    window.addEventListener('popstate', (event) => {
        const state = event.state;
        if (state && state.viewId) {
            switchView(state.viewId, state.productId, false);
        } else {
            const hash = window.location.hash.replace('#', '') || 'home';
            if (hash.startsWith('product-')) {
                openProduct(hash.replace('product-', ''), false);
            } else {
                switchView(hash, null, false);
            }
        }
    });
});

// Render Trending Carousel
function renderTrendingProducts() {
    const container = document.getElementById('trending-grid');
    const trendingItems = products.filter(p => p.trending);
    container.innerHTML = trendingItems.map(p => `
        <div class="min-w-[260px] md:min-w-[300px] flex-shrink-0 snap-start cursor-pointer group" onclick="openProduct('${p.id}')">
            <div class="bg-cabalenGray rounded-2xl p-6 mb-4 flex justify-center items-center h-52 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md border border-gray-100">
                <img src="${p.image}" onerror="this.onerror=null; this.src='https://placehold.co/300x200/F5F5F5/000000?text=${encodeURIComponent(p.name)}'" alt="${p.name}" class="w-full h-full vector-shoe">
            </div>
            <h4 class="font-bold text-base text-black">${p.name}</h4>
            <p class="text-cabalenAccent font-extrabold text-sm">${p.price}</p>
        </div>
    `).join('');
}

// Render Product Cards
function renderAllProducts(list) {
    const container = document.getElementById('full-product-grid');
    const countLabel = document.getElementById('product-count');
    
    if (countLabel) {
        countLabel.textContent = `Showing ${list.length} item${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full py-12 text-center text-gray-500">No sneakers found in this category.</div>`;
        return;
    }

    container.innerHTML = list.map(p => `
        <div class="cursor-pointer group" onclick="openProduct('${p.id}')">
            <div class="bg-cabalenGray aspect-square rounded-2xl flex justify-center items-center p-6 mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md border border-gray-100 relative">
                <img src="${p.image}" onerror="this.onerror=null; this.src='https://placehold.co/300x300/F5F5F5/000000?text=${encodeURIComponent(p.name)}'" alt="${p.name}" class="w-full h-full vector-shoe">
            </div>
            <h4 class="font-bold text-base text-black group-hover:text-cabalenAccent transition-colors">${p.name}</h4>
            <p class="text-gray-500 text-xs mb-1">${p.category}</p>
            <p class="text-black font-extrabold text-sm">${p.price}</p>
        </div>
    `).join('');
}

// Filter Category Function
function filterCategory(type, event) {
    if(event) event.preventDefault();
    
    if(type === 'kids') {
        renderAllProducts(products.filter(p => p.category.toLowerCase().includes('kids')));
    } else if(type === 'running') {
        renderAllProducts(products.filter(p => p.category.toLowerCase().includes('running')));
    } else if(type === 'lifestyle') {
        renderAllProducts(products.filter(p => p.category.toLowerCase().includes('lifestyle')));
    } else {
        renderAllProducts(products);
    }
}

// Open Product Details View
function openProduct(productId, pushHistory = true) {
    const product = products.find(p => p.id === productId) || products[0];
    
    document.getElementById('detail-title').textContent = product.name;
    document.getElementById('detail-price').textContent = product.price;
    document.getElementById('detail-category').textContent = product.category;
    
    const detailImg = document.getElementById('detail-img');
    detailImg.src = product.image;
    detailImg.onerror = function() {
        this.onerror = null;
        this.src = `https://placehold.co/400x400/F5F5F5/000000?text=${encodeURIComponent(product.name)}`;
    };

    document.getElementById('detail-desc').textContent = product.desc;

    // Render Thumbnails
    const thumbsContainer = document.getElementById('detail-thumbnails');
    thumbsContainer.innerHTML = `
        <div class="w-16 h-16 bg-cabalenGray border-2 border-black rounded-lg cursor-pointer overflow-hidden p-1 shadow-sm">
            <img src="${product.image}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/F5F5F5/000000?text=1'" alt="Thumb 1" class="w-full h-full object-contain">
        </div>
        <div class="w-16 h-16 bg-cabalenGray border border-transparent hover:border-gray-400 rounded-lg cursor-pointer overflow-hidden p-1">
            <img src="${products[0].image}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/F5F5F5/000000?text=2'" alt="Thumb 2" class="w-full h-full object-contain">
        </div>
        <div class="w-16 h-16 bg-cabalenGray border border-transparent hover:border-gray-400 rounded-lg cursor-pointer overflow-hidden p-1">
            <img src="${products[2].image}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/F5F5F5/000000?text=3'" alt="Thumb 3" class="w-full h-full object-contain">
        </div>
    `;

    // Related Products Carousel
    const otherContainer = document.getElementById('other-collections-grid');
    const others = products.filter(p => p.id !== product.id).slice(0, 5);
    otherContainer.innerHTML = others.map(o => `
        <div class="min-w-[180px] flex-shrink-0 cursor-pointer group" onclick="openProduct('${o.id}')">
            <div class="bg-cabalenGray rounded-xl p-4 mb-2 h-36 flex items-center justify-center border border-gray-100">
                <img src="${o.image}" onerror="this.onerror=null; this.src='https://placehold.co/200x150/F5F5F5/000000?text=${encodeURIComponent(o.name)}'" alt="${o.name}" class="w-full h-full vector-shoe">
            </div>
            <h4 class="font-bold text-xs text-black group-hover:text-cabalenAccent transition-colors">${o.name}</h4>
            <p class="text-gray-500 text-xs font-semibold">${o.price}</p>
        </div>
    `).join('');

    switchView('details', productId, pushHistory);
}

// View Navigation Helper
function navigateTo(viewId, event) {
    if(event) event.preventDefault();
    switchView(viewId, null, true);
}

// View Switch Logic with pushState
function switchView(viewId, productId = null, pushHistory = true) {
    document.querySelectorAll('.view-section').forEach(view => view.classList.remove('active'));
    
    const target = document.getElementById(viewId);
    if(target) {
        target.classList.add('active');
    } else {
        document.getElementById('home').classList.add('active');
        viewId = 'home';
    }
    
    if (pushHistory) {
        const urlHash = productId ? `#product-${productId}` : `#${viewId}`;
        history.pushState({ viewId, productId }, '', urlHash);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNavActiveState(viewId);
}

// Update Nav Link Active Underline
function updateNavActiveState(viewId) {
    const activeView = viewId === 'details' ? 'products' : viewId;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const navTarget = link.getAttribute('id');
        if (navTarget === `nav-${activeView}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Drawer Handler
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
function toggleMobileMenu() { mobileMenu.classList.toggle('hidden'); }
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Sidebar Accordion Handler
function toggleSidebarMenu(menuId) {
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(menuId === 'kids-menu' ? 'kids-arrow' : 'adults-arrow');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        menu.classList.add('hidden');
        arrow.style.transform = 'rotate(-90deg)';
    }
}

// Size Button Selection
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('bg-black', 'text-white', 'border-black'));
        btn.classList.add('bg-black', 'text-white', 'border-black');
    });
});

// Toast Notification System
function showNotification(msg) {
    const toast = document.getElementById('toast-notification');
    const messageEl = document.getElementById('toast-message');
    messageEl.textContent = msg;
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}