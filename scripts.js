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
    //setInterval(buscarMensagem,3000);
    setInterval(status,5000); 
}

   function ErroLogin(erro){
    const statusCode = erro.response.status;
    if(statusCode !==200){
        alert("Esse nome de usuário já está em uso!\nTente outro!");
        PerguntaNome();
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
    

