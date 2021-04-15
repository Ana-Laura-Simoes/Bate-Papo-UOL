let NOME=null;

PerguntaNome()
function PerguntaNome(){
   NOME=prompt("Informe seu nome:");
   //const elemento= document.querySelector(".entrada input");
   //NOME= elemento.value;
    enviaNome(NOME);
}

function enviaNome(NOME){
    const dados={
       name: NOME
     };
     const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants`,dados)
     if(requisicao.then(buscarMensagem)){
        setInterval(toAqui,5000, dados);
     }
     requisicao.catch(ErroLogin);
   }

   function ErroLogin(erro){
    const statusCode = erro.response.status;
    if(statusCode === 400){
        alert("Esse nome de usuário já está em uso!\nTente outro!");
        PerguntaNome();
    }
}

   function toAqui(dados){
    const requisicao=axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status`,dados);
    console.log("enviando");
   }
  
 function apaga(){
    elemento=document.querySelector(".container_mensagens");
    elemento.innerHTML=""; 
 }  

 function entrada(){
    const elemento= document.querySelector(".entrada");
    elemento.classList.add("esconder"); 
    //elemento.classList.remove("entrada"); 
    console.log(elemento);
    buscarMensagem();
}

function buscarMensagem(){
    
    console.log("buscando");
    const promessa=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(pegarDados);
}

    function pegarDados(resposta){
     const dados=resposta.data;
     console.log(dados);
     for(let i=0;i<dados.length;i++){
         colocarMensagens(dados,i);
     }
    }

    function colocarMensagens(dados,i){
        //window.scrollTo(0, document.body.scrollHeight);
        elemento=document.querySelector(".container_mensagens");
        if((dados[i].type) === "message"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }
        if((dados[i].type) === "status"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> ${dados[i].text}</p></div>`
        }
        
        if((dados[i].type) === "private_message"){
            if(dados[i].to === NOME)
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }
        //setTimeout(buscarMensagem,3000);
        //apaga();
    }

function EnviarMensagem(){
    mensagem=document.querySelector(".inferior input");
    const dados= {
        from: NOME,
        to: "todos",
        text: mensagem.value,
        type: "message"
    }
    const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", dados);
    if(requisicao.then(buscarMensagem)){
        mensagem.value="";
        //window.scrollTo(0, document.body.scrollHeight);
    } 
    requisicao.catch(tratarError);
}

function tratarError(){
    alert("erro");
    location.reload(true);
}
    

