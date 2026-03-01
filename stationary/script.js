// ========== GLOBAL FUNCTIONS ==========

document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    updateCartBadge();
    checkLoginStatus();
});

// ========== SIDEBAR FUNCTIONALITY - UPDATED VERSION ==========
function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeBtn = document.getElementById('closeSidebar');
    
    if (!menuToggle || !sidebar || !overlay) return;
    
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
    
    menuToggle.addEventListener('click', openSidebar);
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
    
    overlay.addEventListener('click', closeSidebar);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
}

// ========== CART FUNCTIONS ==========
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
        badge.textContent = totalItems;
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'toast-notification';
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 2rem;
        border-radius: 60px;
        box-shadow: 0 10px 30px rgba(30,58,95,0.2);
        border-left: 6px solid #4f79a8;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyframe animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========== LOGIN CHECK ==========
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    const loginLinks = document.querySelectorAll('a[href="login.html"]');
    
    if (user) {
        loginLinks.forEach(link => {
            link.href = 'profile.html';
            link.innerHTML = '<i class="fas fa-user"></i> Profile';
        });
    }
}

// ========== EXPORT FUNCTIONS ==========
function exportEmails() {
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    let csv = 'Username,Email,Date\n';
    
    emails.forEach(e => {
        csv += `${e.username},${e.email},${e.date}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'educart-emails.csv';
    a.click();
}

// ========== MAKE FUNCTIONS GLOBAL ==========
window.updateCartBadge = updateCartBadge;
window.showNotification = showNotification;
window.exportEmails = exportEmails;