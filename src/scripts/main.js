document.addEventListener("DOMContentLoaded", () => {
    const buttonEntrar = document.querySelector('form')
    const homePage = document.querySelector('.home-page')

    buttonEntrar.addEventListener('submit', function (e) {
        e.preventDefault()
        homePage.style.display = 'none';
    })
})

