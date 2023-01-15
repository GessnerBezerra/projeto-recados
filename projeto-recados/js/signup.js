let formCadastro = document.querySelector("#formulario-cadastro");

let label_email = document.querySelector("#label-email");
let input_email = document.querySelector("#input-email");

let label_senha = document.querySelector("#label-senha");
let input_senha = document.querySelector("#input-senha");

let label_conf_senha = document.querySelector("#label-confirma-senha");
let input_conf_senha = document.querySelector("#input-confirma-senha");

let formAcesso = document.querySelector(".formulario");
let acesso_email = document.querySelector("#input-acesso-email");

let acesso_senha = document.querySelector("#input-acesso-senha");

//listas e objetos

//Eventos
formAcesso.addEventListener("submit", (e) => {
  e.preventDefault();
});

formCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  enviardados();
});

input_email.addEventListener("keyup", confirmaEmail);
input_senha.addEventListener("keyup", confirmasenha);
input_conf_senha.addEventListener("keyup", validasenha);

//REGRAS REGEX PARA VALIDAÇÃO SENHA
//Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial:
let regSenha =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// funções

function confirmaEmail() {
  if (input_email.value.length < 10) {
    label_email.setAttribute("style", "color: red");
    label_email.innerHTML = "E-mail: Insira no mínimo 10 caracteres";
    input_email.setAttribute("style", "border-color: red");
  } else {
    label_email.setAttribute("style", "color: green");
    label_email.innerHTML = "E-mail:";
    input_email.setAttribute("style", "border-color: green");
  }
}

function confirmasenha() {
  let senhaValida = input_senha.value.match(regSenha);
  if (input_senha.value.length < 8) {
    label_senha.setAttribute("style", "color: red");
    label_senha.innerHTML = "Senha: mínimo de 8 caracteres";
    input_senha.setAttribute("style", "border-color: red");
  } else if (senhaValida === null) {
    label_senha.setAttribute("style", "color: red");
    label_senha.innerHTML =
      "Senha: Deve conter uma letra maiuscula e caracter especial";
    input_senha.setAttribute("style", "border-color: red");
  } else {
    label_senha.setAttribute("style", "color: green");
    label_senha.innerHTML = "Senha:";
    input_senha.setAttribute("style", "border-color: green");
  }
}

function validasenha() {
  if (input_senha.value !== input_conf_senha.value) {
    label_conf_senha.setAttribute("style", "color: red");
    label_conf_senha.innerHTML =
      "Os campos [Senha] e [Confirme a senha:] devem ser iguais!";
    input_conf_senha.setAttribute("style", "border-color: red");
  } else {
    label_conf_senha.setAttribute("style", "color: green");
    label_conf_senha.innerHTML = "Confirme a senha:";
    input_conf_senha.setAttribute("style", "border-color: green");
  }
}

function enviardados() {
  if (
    input_email.value === "" ||
    input_email.value.length < 10 ||
    input_senha.value === "" ||
    input_senha.value.length < 8 ||
    input_conf_senha.value === "" ||
    input_senha.value !== input_conf_senha.value
  ) {
    alert("Verifique se os campos estão preenchidos da forma correta!");
    return;
  } else {
    
    salvardados();
    limparDados();
  }
}

function salvardados() {
  let existeDados = false;
  let dados = {
    usuario: input_email.value,
    senha: input_senha.value,
    recados: [],
  };

  let pegadados = JSON.parse(localStorage.getItem("dados-usuario") || "[]");

  for (const indice in pegadados) {
    if (pegadados[indice].usuario === dados.usuario) {
      var  aviso = alert("Usuário já existe!");
      existeDados = true;
      return aviso;
    }
  }
  if (existeDados !== true) {
    pegadados.unshift(dados);
    const userString = JSON.stringify(pegadados);
    localStorage.setItem("dados-usuario", userString);
    var  aviso =alert(
      "Dados criados com sucesso!"
    );
    window.location.href = "index.html";
    return aviso;
  }
  return existeDados;
}

function limparDados() {
  document.querySelector("#input-email").value = "";
  document.querySelector("#input-senha").value = "";
  document.querySelector("#input-confirma-senha").value = "";

  label_email.setAttribute("style", "color: black");
  input_email.setAttribute("style", "border-color: black");
  input_email.focus();

  label_senha.setAttribute("style", "color: black");
  input_senha.setAttribute("style", "border-color: black");

  label_conf_senha.setAttribute("style", "color: black");
  input_conf_senha.setAttribute("style", "border-color: black");
}
