const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log('Login clicado, redirecionando...');
    window.location.href = 'home.html'; 
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        console.log('Página de Login detectada. Adicionando evento ao formulário.');
        
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            console.log('Login enviado, redirecionando para home.html...');
            window.location.href = 'home.html'; 
        });
    }
});