document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;

    if (isLoggedIn === 'true' && currentPage.includes('login.html')) {
        window.location.href = 'index.html';
    }
    
    if (isLoggedIn !== 'true' && currentPage.includes('index.html')) {
        window.location.href = 'login.html';
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }
});

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setTimeout(() => {
            console.log('Login successful:', { email });
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        }, 1000);
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setTimeout(() => {
            console.log('Registration successful:', { name, email });
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        }, 1000);
    });
} 