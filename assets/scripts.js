//Arrays para receber tarefas a fazer e a tarefas feitas
let tarefasFazer = [];
let tarefasFeitas = [];
let tarefasTotais = [];

//Elementos da DOM
let tarefaAtual = document.getElementById('caixa1');
const afazer = document.getElementById('afazeresdiv')
const limpar = document.getElementById('limpar');
const info = document.getElementById('info');
const feito = document.getElementById('feito')
const listaFinal = document.getElementById('arrFeito')
let btn = document.getElementById('btn');

//escondendo elementos
info.style.display = "none";
limpar.style.display = "none";
feito.style.display = "none";

//função para criar elementos DOM
function criarElemento (elemento, classe, id, texto){
    let cria = document.createElement(`${elemento}`);
    cria.classList.add(`${classe}`);
    cria.setAttribute("id", `${id}`);
    cria.textContent = texto;
    return cria;
}
//etapas de validação
function Etapas(){
    //abre visualização
    info.style.display = "block";
    //deixa tudo em maiúscula
    let r = tarefasFazer.indexOf(tarefaAtual.value.toUpperCase());
    // não permite repetir tarefas
    if(r !== -1){
        alert("Tarefa já adicionada")
        tarefaAtual.value = '';
    //adiciona a tarefa na DOM
    }else if(tarefaAtual.value !==''){
        //empurra a tarefa nova para o array
        tarefasFazer.push(tarefaAtual.value.toUpperCase());
        //chama a função que cria o elemento tarefa
        addTarefa(tarefasFazer);
    //não permite valor vazio
    }else{
        tarefaAtual.value = '';
        alert("Digite uma tarefa")
    }
}
//chama a criação de tarefa a partir do array
const addTarefa = (arr) =>{
    afazer.innerHTML = '';
        for (let i = 0; i < arr.length; i++){
            criacao1(arr[i], i);
        }
        tarefaAtual.value = '';
}
//chama a funcao que cria
const criacao1 = (texto, num) =>{
    let criadiv = criarElemento('div', 'afazer', num ,texto);
    criadiv.addEventListener('click', (num)=>{
        feito.style.display = "block";
        let s = num.path[0];
        //chama função que tira a tarefa do array
        deleteDoArray(s.textContent);
        s.classList.toggle('riscado');
    });
    afazer.appendChild(criadiv);
};
//cria elementos outros de tarefas cumpridas
const criacao2 = (removido) =>{
    limpar.style.display = "block"
    let criadiv = criarElemento('div', 'feito', null, removido);
    feito.appendChild(criadiv);
};
//remove da lista à fazer a tarefa agora cumprida
function deleteDoArray(info){
    if(tarefasFeitas.indexOf(info) == -1){
        let index = tarefasFazer.indexOf(info);
        let removido = info
        tarefasFazer.splice(index, 1);
        console.log(tarefasFazer);
        console.log(removido);
        criacao2(removido, info);
        //acrescenta a tarefa cumprida no array de tarefas cumpridas
        tarefasFeitas.push(removido)
        console.log(tarefasFeitas)
    }else {
        alert('você já cumpriu essa tarefa')
    }
};

// event listeners
btn.addEventListener('click', Etapas);
//pequena função para limpar novamente a DOM
limpar.addEventListener('click', ()=>{
    limpar.style.display = "none";
    addTarefa(tarefasFazer);
    if(afazer.innerHTML === '') {
        info.style.display = "none";
    }
    TarefasTotais = [[tarefasFazer],[tarefasFeitas]];
    console.log(`Todas as tarefas do dia ${TarefasTotais}`);
    }
);

