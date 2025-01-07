document.addEventListener('DOMContentLoaded', () => {
    const loginButtonHeader = document.getElementById('login-btn-header');
    const loginButton = document.getElementById('login-btn');
    const logoutButton = document.getElementById('logout-btn');
    const userProfile = document.getElementById('user-profile');
    const authNav = document.getElementById('auth-nav');
    const profileUsername = document.getElementById('profile-username');
    const authContainer = document.getElementById('auth-container');

    // Update UI untuk pengguna yang login
    const updateUIForLoggedInUser = (username, profilePic = 'ikon_pengguna.png') => {
        if (authNav) authNav.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
    
        // Update teks "Welcome, username"
        const profileUsername = document.getElementById('profile-username');
        if (profileUsername) {
            profileUsername.textContent = `Welcome, ${username}`;
        }
    
        // Update foto profil
        const profilePicture = document.getElementById('profile-picture');
        if (profilePicture) {
            profilePicture.src = profilePic; // URL gambar profil
        }
    
        // Tutup pop-up login
        if (authContainer) authContainer.style.display = 'none';
    };

    // Update UI untuk pengguna yang logout
    const updateUIForLoggedOutUser = () => {
        if (authNav) authNav.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    };

    // Cek apakah pengguna sudah login
    const token = localStorage.getItem('token');
    if (token) {
        const username = localStorage.getItem('username') || 'User';
        updateUIForLoggedInUser(username);
    } else {
        updateUIForLoggedOutUser();
    }

    // Event Listener Login
    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const usernameField = document.getElementById('login-username');
            const passwordField = document.getElementById('login-password');

            const username = usernameField?.value.trim();
            const password = passwordField?.value.trim();

            if (!username || !password) {
                alert('Please fill in both username and password');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    const { token } = await response.json();
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username); // Simpan username
                    updateUIForLoggedInUser(username);
                    
                    // Reload halaman setelah login berhasil
                    location.reload(); // Ini akan memuat ulang halaman setelah login sukses
                } else {
                    const errorData = await response.json();
                    alert(`Login failed: ${errorData.error || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed: Unable to connect to server');
            }
        });
    }

    // Event Listener Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            if (window.$crisp) {
                const crispScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
                if (crispScript) crispScript.remove(); // Hapus script
                window.$crisp = undefined; // Reset Crisp
            }
            updateUIForLoggedOutUser();
            location.reload(); // Reload halaman setelah logout
        });
    }

    // Tombol Login di Header
    if (loginButtonHeader) {
        loginButtonHeader.addEventListener('click', (event) => {
            event.preventDefault();
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');

            if (authContainer) authContainer.style.display = 'block';
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
        });
    }

    // Menambahkan event listener untuk 'Enter' key di form login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Mencegah form submit default
                loginButton.click(); // Memicu klik tombol login
            }
        });
    }
});

