document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulated login check (replace with actual authentication)
        if (username === 'demo' && password === 'password') {
            localStorage.setItem('loggedIn', 'true');
            loginMessage.textContent = 'Login successful. Redirecting...';
            loginMessage.className = 'message success';
            setTimeout(() => {
                window.location.href = '/portal.html';
            }, 1500);
        } else {
            loginMessage.textContent = 'Invalid username or password';
            loginMessage.className = 'message error';
        }
    });
});