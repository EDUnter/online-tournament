window.onload = () => {

    const btnRegister = document.getElementById('btnRegister');
    const license = document.getElementById('licenseInput');
    const ranking = document.getElementById('rankingInput');

    btnRegister.addEventListener('click', e => {
        e.preventDefault();

        location.href = 'http://localhost:5500/frontend/public/views/index.html';
    })
}