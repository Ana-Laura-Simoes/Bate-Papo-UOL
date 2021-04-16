let NOME="";
let PARA="Todos";
let VISIVEL="Público";
let type="message";
function PerguntaNome(){
   //NOME=prompt("Informe seu nome:");
   const elemento= document.querySelector(".entrada input");
   NOME= elemento.value;
   const dados={name: NOME};
   const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants`,dados);
   requisicao.then(entrarNaSala);
   requisicao.catch(ErroLogin);

}
function entrarNaSala(){
    const elemento= document.querySelector(".entrada");
    const pai=elemento.parentNode;
    console.log(pai);
    pai.classList.add("esconder"); 
    buscarMensagem();
    ListaParticipantes();
    setInterval(buscarMensagem,3000);
    setInterval(status,5000); 
    setInterval(ListaParticipantes,10000); 
}

   function ErroLogin(erro){
    const statusCode = erro.response.status;
    if(statusCode === 400){
        alert("Esse nome de usuário já está em uso!\nTente outro!");
        const elemento= document.querySelector(".entrada input");
        elemento.value=null;
        NOME=NULL;
       setTimeout(PerguntaNome,5000);
    }
}

   function status(){
    const dados={name: NOME};
    const requisicao=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status`,dados);
    console.log("enviando");
   }
  
function ListaParticipantes(){
    const promessa=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    promessa.then(pegarParticipantes);
}

function buscarMensagem(){
    
    console.log("buscando");
    const promessa=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(pegarDados);
}

function pegarParticipantes(resposta){
    const dados=resposta.data;
    elemento=document.querySelector(".contatos_container");
    elemento.innerHTML=`<div class='contato' onclick='contato(this)'>
    <div class=opcao><ion-icon name='people'></ion-icon>
    <p>Todos</p></div>
    <ion-icon class="certinho" name="checkmark"></ion-icon></div>`;
    for(let i=0;i<dados.length;i++){
        colocarParticipantes(dados,i);
    } 
}

function colocarParticipantes(dados,i){
    elemento=document.querySelector(".contatos_container");
    
    if(dados[i].name === PARA){
        elemento.innerHTML +=` <div class="contato" onclick="contato(this)">
        <div class=opcao><ion-icon name="person-circle"></ion-icon>
        <p>${dados[i].name}</p></div>
        <ion-icon class="certinho selecionado" name="checkmark"></ion-icon></div>` 
    }
    
    
    elemento.innerHTML +=` <div class="contato" onclick="contato(this)">
    <div class=opcao><ion-icon name="person-circle"></ion-icon>
    <p>${dados[i].name}</p></div>
    <ion-icon class="certinho" name="checkmark"></ion-icon></div>`
}

function contato(id){
    id.classList.add("selecionado");
    let destinatario = id.querySelector("p").innerHTML;
    PARA = destinatario;
    

    const primeiroSelecionado = document.querySelector(".contato .selecionado");

    if(primeiroSelecionado !== null){
        primeiroSelecionado.classList.remove('selecionado');
    } 
    id.querySelector(".certinho").classList.add('selecionado') ;
        
    alteraFrase();
}

function visibilidade(id){
    id.classList.add("selecionado");

    let visibilidade = id.querySelector("p").innerHTML;
    VISIVEL = visibilidade;
    if(VISIVEL==="Reservadamente") type="private_message";
    else if(VISIVEL === "Público") type="message";

    const primeiroSelecionado = document.querySelector(".visibilidade .selecionado");

    if(primeiroSelecionado !== null){
       primeiroSelecionado.classList.remove('selecionado');
    } 
    id.querySelector(".certinho").classList.add('selecionado') ;



    alteraFrase();
}

function alteraFrase(){
    let frase=document.querySelector(".enviarmensagem .frase");
    
    frase.innerHTML = `Enviando para ${PARA} (${VISIVEL})`  
}

    function pegarDados(resposta){
     const dados=resposta.data;
     elemento=document.querySelector(".container_mensagens");
     elemento.innerHTML="";
     for(let i=0;i<dados.length;i++){
         colocarMensagens(dados,i);
     }
     scroll();
    }

    function colocarMensagens(dados,i){
        elemento=document.querySelector(".container_mensagens");
       
        if((dados[i].type) === "message"){
            elemento.innerHTML += `<div class="${dados[i].type} mensagem"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }
        if((dados[i].type) === "status"){
            elemento.innerHTML += `<div class="${dados[i].type} mensagem"><p>${dados[i].time} <strong>${dados[i].from}</strong> ${dados[i].text}</p></div>`
        }
        
        if((dados[i].type) === "private_message" ){
            if(dados[i].to === NOME || dados[i].from===NOME || dados[i].type==="todos"){
                elemento.innerHTML += `<div class="${dados[i].type} mensagem"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
            }  
        }
    }

    function scroll(){
        const elemento = document.querySelector('.container_mensagens .mensagem:last-child');
        console.log(elemento);
        elemento.scrollIntoView();
     }

function EnviarMensagem(){
    mensagem=document.querySelector(".inferior input");
    const dados= {
        from: NOME,
        to: PARA,
        text: mensagem.value,
        type: type
    }
    const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", dados);
    if(requisicao.then(buscarMensagem)){
        mensagem.value="";
    } 
    requisicao.catch(ErroMensagem);
}

function ErroMensagem(){
    window.location.reload();
}
  

function MenuLateral(){
    const menulateral=document.querySelector(".menuLateral");
    menulateral.classList.remove("esconder");
}

function FechaMenu(){
    const menulateral=document.querySelector(".menuLateral");
    menulateral.classList.add("esconder");
}

