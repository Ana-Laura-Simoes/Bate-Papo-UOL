let NOME="";

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
    setInterval(buscarMensagem,3000);
    setInterval(status,5000); 
}

   function ErroLogin(erro){
    const statusCode = erro.response.status;
    if(statusCode ===400){
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
  
function buscarMensagem(){
    
    console.log("buscando");
    const promessa=axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promessa.then(pegarDados);
}

    function pegarDados(resposta){
     const dados=resposta.data;
     elemento=document.querySelector(".container_mensagens");
     elemento.innerHTML="";
     for(let i=0;i<dados.length;i++){
         colocarMensagens(dados,i);
     }
     //elemento.scrollIntoView(false);
     //não faço ideia de como funcionou
     document.body.scrollTop = document.body.scrollHeight;
     document.documentElement.scrollTop = document.documentElement.scrollHeight; 
    }

    function colocarMensagens(dados,i){
        elemento=document.querySelector(".container_mensagens");
       
        if((dados[i].type) === "message"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }
        if((dados[i].type) === "status"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> ${dados[i].text}</p></div>`
        }
        
        if((dados[i].type) === "private_message" ){
            if(dados[i].to === NOME || dados[i].from===NOME || dados[i].type==="todos"){
                elemento.innerHTML += `<div class="${dados[i].type} mensagem"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
            }
           
        }

    }

    function scroll(){
        const elemento = document.querySelector('.container_mensagens');
        console.log(elemento);
        elemento.scrollIntoView(false);
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
    } 
    requisicao.catch(ErroMensagem);
}

function ErroMensagem(){
    //location.reload(true);
    window.location.reload();
}
    

