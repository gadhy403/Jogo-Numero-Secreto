let listaNumerosSorteados =[];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto; 
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.0; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function verificarChute(){
    let chute = document.querySelector("input").value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela ("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas": "tentativa"
        let mensagemTentativas = `Voce descobiu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela ("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela ("p", "numero secreto é menor");
        } else {
            exibirTextoNaTela ("p", "numero secreto é maior");
        }
        tentativas ++;
        limparCampo();
    }
    
}

function exibirMensagemInicial(){
exibirTextoNaTela ("h1", "Jogo do número secréto");
exibirTextoNaTela ("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial();

function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if(quantidadeDeElementosNaLista = listaNumerosSorteados.length == numeroLimite){
        listaNumerosSorteados = [];
    }


    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
            chute = document.querySelector ("input");
            chute.value ="";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)

}