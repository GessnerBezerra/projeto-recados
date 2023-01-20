let login = window.sessionStorage.getItem('login');

if(!login){
    alert('Você deve logar antes!')
    window.location = './index.html';
}

let usuario = window.sessionStorage.getItem('dados-usuario');
let listaUsuarios = JSON.parse(window.localStorage.getItem('dados-usuario'));
let indiceUsuario;

for (const indice in listaUsuarios) {

    if(listaUsuarios[indice].usuario == usuario){
        indiceUsuario = indice;
    }
};
let listaRecados = listaUsuarios[indiceUsuario].recados;

let formulario = document.querySelector('#recados');

let inputTitulo = document.querySelector('#descricao');
let inputDescricao = document.querySelector('#detalhamento');

let botaoSalvar = document.querySelector('#enviar_info');
let botaoAtualizar = document.querySelector('#botao_atualizar');
let botaoCancelar = document.querySelector('#botao_cancelar')

let botaoSair = document.querySelector('#botaoSair');

let tabelaDados = document.querySelector('#tabela-registros');

let cardDados = document.querySelector("#row-card");


/////////////////////*************EVENTOS****************///////////////////////////

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    adicionarNovoRegistro();
});

document.addEventListener('DOMContentLoaded', salvarNaTabela(listaRecados));

botaoSair.addEventListener('click', logOut);

//////////////////////*******FUNÇÕES**********////////////////////////////////////////////////

function adicionarNovoRegistro(){
    
    
    let titulorecados = inputTitulo.value;
    let descricaorecados = inputDescricao.value;

    let recados = {
        indice:null,
        titulorecados,
        descricaorecados
    }

    listaRecados.push(recados);
    
    
    // salvarNaTabela(listaRecados); --> comentei pois estava repetindo os recados antes do reload
    
    window.localStorage.setItem('dados-usuario', JSON.stringify(listaUsuarios));
   
    limparCampos();
   
    window.location.reload();
}



function salvarNaTabela(dadosrecados){

    if(dadosrecados.length > 0) { 

        for (const indice in dadosrecados) {
            dadosrecados[indice].indice = Number(indice)+1;
            window.localStorage.setItem('dados-usuario', JSON.stringify(listaUsuarios));
        
    /* ---------------------Parte do código caso eu quisesse colocar tabela no lugar do card--------

             let novaLinha = document.createElement('tr');
             let colunaRegistro = document.createElement('td');
             let colunaTitulo = document.createElement('td');
             let colunaDescricao = document.createElement('td');
             let colunaAcoes = document.createElement('td');

             novaLinha.appendChild(colunaRegistro);
             novaLinha.appendChild(colunaTitulo);
             novaLinha.appendChild(colunaDescricao);
             novaLinha.appendChild(colunaAcoes);
            
             tabelaDados.appendChild(novaLinha)

             novaLinha.setAttribute('class', 'informacoes');
             novaLinha.setAttribute('id', dadosrecados[indice]);
             colunaRegistro.innerHTML = dadosrecados[indice].indice ;
             colunaTitulo.innerHTML = dadosrecados[indice].titulorecados;
             colunaDescricao.innerHTML = dadosrecados[indice].descricaorecados;
             colunaAcoes.innerHTML = `
             <td><button type="button" value="" class="inf_botao" onclick="prepararEdicao(${indice})" id="inf_botao_editar">Editar</button></td>
             <td><button type="button" value="" class="inf_botao" onclick="apagarRegistro(${indice})" id="inf_botao_apagar">Apagar</button></td>
                                     `

             ;*/
            
            
            let sectionCard = document.createElement('section');
            let divCardTtl = document.createElement('div');
            let divCardTRst = document.createElement('div');
            let divCardDsc = document.createElement('div');
            let divCardAcao = document.createElement('div');
            let labelRegistro = document.createElement('label');
            let registro = document.createElement('p');
            let labelTitulo = document.createElement('label');
             let titulo = document.createElement('p');
             let labelDescricao = document.createElement('label');
             let descricao = document.createElement('p');
             let labelAcao = document.createElement('label');
             let acoes = document.createElement('td');
            
             divCardTtl.setAttribute('class', 'titulo-card');
             divCardTRst.setAttribute('class', 'registro');
             divCardDsc.setAttribute('class', 'descricao');
             divCardAcao.setAttribute('class', 'acoes');

             divCardTRst.appendChild(labelRegistro);
             divCardTRst.appendChild(registro);

             divCardTtl.appendChild(labelTitulo);
             divCardTtl.appendChild(titulo);

             divCardDsc.appendChild(labelDescricao);
             divCardDsc.appendChild(descricao);

             divCardAcao.appendChild(labelAcao);
             divCardAcao.appendChild(acoes);

             sectionCard.appendChild(divCardTRst);
             sectionCard.appendChild(divCardTtl);
             sectionCard.appendChild(divCardDsc);
             sectionCard.appendChild(divCardAcao);
            
             cardDados.appendChild(sectionCard);

             sectionCard.setAttribute('class', 'card');
             labelRegistro.setAttribute('id', dadosrecados[indice]);
             labelRegistro.innerHTML = `Id: `
             registro.innerHTML = dadosrecados[indice].indice ;
             labelTitulo.innerHTML = `Descrição: `
             titulo.innerHTML = dadosrecados[indice].titulorecados;
             labelDescricao.innerHTML = `Detalhes: `
             descricao.innerHTML = dadosrecados[indice].descricaorecados;
             labelAcao.innerHTML = `Ações: `
             acoes.innerHTML = `
             <td><button type="button" value="" class="inf_botao" onclick="prepararEdicao(${indice})" id="inf_botao_editar">Editar</button></td>
             <td><button type="button" value="" class="inf_botao" onclick="apagarRegistro(${indice})" id="inf_botao_apagar">Apagar</button></td>
                                     `

             ;

        }
    }
}

function limparCampos(){
    
    inputTitulo.value = '';
    inputDescricao.value = '';
    inputTitulo.focus();
}


function salvarNoStorage(lst_recados){

    localStorage.setItem('dados-usuario', JSON.stringify(lst_recados));
    
}

function logOut(){
    window.sessionStorage.removeItem('login');
    window.sessionStorage.removeItem('dados-usuario');
    window.location = './sign-out.html';
};


function pegarDadosStorage(){

    
    let dadosStorage = JSON.parse(localStorage.getItem('dados-usuario')) || [];

    if(dadosStorage){
        for(let registro of dadosStorage){
            salvarNaTabela(registro.recados);
        }
    }

    return
}

function apagarRegistro(registroID){
    
    let confirma = window.confirm(`Tem certeza que deseja remover o recado de registro ID ${registroID+1}?`);

    if(confirma){

    
        listaRecados.splice(registroID, 1);
        
        salvarNoStorage(listaUsuarios);
        window.location.reload();
        return;
    }else{
        return;
    }     
}

function cancelarEdicao(){
    botaoCancelar.setAttribute('onclick', limparCampos())
    botaoSalvar.setAttribute('style', 'display: inline-block');
    botaoAtualizar.setAttribute('style', 'display: none');
    botaoCancelar.setAttribute('style', 'display: none');
    
}

function prepararEdicao(registroID){
    botaoSalvar.setAttribute('style', 'display: none');
    botaoAtualizar.setAttribute('style', 'display: inline-block');
    botaoAtualizar.setAttribute('onclick', `atualizarRegistro(${registroID})`);
    botaoCancelar.setAttribute('style', 'display: inline-block');
    
    inputTitulo.value = listaRecados[registroID].titulorecados;
    inputDescricao.value = listaRecados[registroID].descricaorecados;
    
}

function atualizarRegistro(registroID){
    
    let novoTitulo = inputTitulo.value;
    let novaDescricao = inputDescricao.value;

    let recadoEditado = listaRecados[registroID];

    recadoEditado.descricaorecados = novaDescricao;
    recadoEditado.titulorecados = novoTitulo;

    listaRecados.splice(registroID, 1, recadoEditado);
    window.localStorage.setItem('dados-usuario', JSON.stringify(listaUsuarios));
    window.location.reload();
}