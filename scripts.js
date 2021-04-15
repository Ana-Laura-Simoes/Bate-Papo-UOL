PerguntaNome();

function PerguntaNome(){
    const nome=prompt("Informe seu nome:");
    enviaNome(nome);
}

function enviaNome(nome){
    const dados={
       name: nome
     };
     const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants`,dados)
     if(requisicao.then(buscarMensagem)){
        setInterval(toAqui,5000, dados);
     }
     requisicao.catch(tratarError);
   }

   function tratarError(){
    alert("erro");
    const statusCode = erro.response.status;
    console.log(statusCode);
}

   function toAqui(dados){
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
        elemento=document.querySelector(".container_mensagens");
        if((dados[i].type) === "message"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }
        if((dados[i].type) === "status"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> ${dados[i].text}</p></div>`
        }
        
        if((dados[i].type) === "private_message"){
            elemento.innerHTML += `<div class="${dados[i].type}"><p>${dados[i].time} <strong>${dados[i].from}</strong> para <strong>${dados[i].to}</strong> ${dados[i].text}</p></div>`
        }

    }
    

