document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;

    const apiUrl = 'http://ims-default:7048/BC/ODataV4/Company(\'CRONUS%20International%20Ltd.\')/CustomUserAPI?tenant=ims-default';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:P@ssw0rd') // Replace with actual credentials
        }
    })
    .then(response => response.json())
    .then(data => {
        const user = data.value.find(u => u.name === username && u.role === role);
        
        if (user) {
            console.log('Login successful', user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '/dashboard';
        } else {
            document.getElementById('login-message').textContent = 'Invalid username or role. Please try again.';
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        document.getElementById('login-message').textContent = 'An error occurred. Please try again later.';
    });
}