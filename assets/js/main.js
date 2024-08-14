document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    checkAuthStatus();
});

function setupNavigation() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showLoggedInState();
    } else {
        showLoggedOutState();
    }
}

function showLoggedInState() {
    const loginLink = document.querySelector('.site-nav a[href="/login"]');
    if (loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.addEventListener('click', logout);
    }
}

function showLoggedOutState() {
    const loginLink = document.querySelector('.site-nav a[href="/login"]');
    if (loginLink) {
        loginLink.textContent = 'Login';
        loginLink.href = '/login';
    }
}

function logout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}