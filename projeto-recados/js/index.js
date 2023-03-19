let login = window.sessionStorage.getItem("dados-usuario" || "[]");

let formAcesso = document.querySelector(".formulario");
let acesso_email = document.querySelector("#input-acesso-email");

let acesso_senha = document.querySelector("#input-acesso-senha");

document.addEventListener("DOMContentLoaded", verificaLogin(login));

formAcesso.addEventListener("submit", (e) => {
  e.preventDefault();
  acessaconta();
});

function acessaconta() {
  let dadosErrados = false;
  let confirma = JSON.parse(localStorage.getItem("dados-usuario") || "[]");

  for (const elementos of confirma) {
    if (
      acesso_email.value === elementos.usuario &&
      acesso_senha.value === elementos.senha
    ) {
      window.sessionStorage.setItem("login", true);
      window.sessionStorage.setItem("dados-usuario", elementos.usuario);
      window.location.href = "home.html";
      dadosErrados = true;
    }
  }
  if (dadosErrados === false) {
    var dialog = confirm("Dados não confere, deseja criar conta?");
    if (dialog) {
      window.location.href = "signup.html";
    } else {
      window.location.href = "home.html";
    }
  }
}

function verificaLogin(login) {
  if (login != null) {
    alert(`Você já está logado e será redirecionado de volta a pagina de recados, 
    para retornar para a pagina de acesso, clique em sair!`);
    window.location = "./home.html";
  }
}
