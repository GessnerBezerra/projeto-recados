
  let animationArea = document.querySelector('.boot');

window.addEventListener("DOMContentLoaded", () =>{

  

        let animationObject = bodymovin.loadAnimation({
            container: animationArea,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            autoloadSegments: false,
            path:'./css/animacions/100378-bye-animation.json'
        });

        var duration = 60 * 5; // Converter para segundos

        display = document.getElementById('txt'); // selecionando a div com ID "txt"

        contador(duration, display); // iniciando o timer

       
    setTimeout(()=>{
  
    window.location = './index.html';
  }, 6500);
});


function contador(duration, display) {

  var timer = duration, seconds;
  
  setInterval(function () {

      seconds = parseInt(timer % 6, 10);

      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = "Você será direcionado para a pagina de login em "+ seconds +" segundos";
      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}