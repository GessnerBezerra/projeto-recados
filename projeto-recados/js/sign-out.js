

window.addEventListener("DOMContentLoaded", () =>{
    let animationArea = document.querySelector('.boot');

        let animationObject = bodymovin.loadAnimation({
            container: animationArea,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            autoloadSegments: false,
            path:'/projeto-recados/css/animacions/100378-bye-animation.json'
        });
    document.getElementById('txt').innerHTML = "Você será direcionado para a pagina de login em 05 segundos";
    setTimeout(()=>{
    window.location = './index.html';}, 5000);
});