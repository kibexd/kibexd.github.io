document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        displayUserInfo(currentUser);
    } else {
        window.location.href = '/login';
    }
});

function displayUserInfo(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-role').textContent = user.role;
}