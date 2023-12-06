const personagem = document.getElementById('personagem');
const bloco = document.getElementById('bloco');
const life = document.getElementById('life');
const coin = document.getElementById('coin');
const point = document.getElementById('point');

let position = 0;
let direcao = 0;
let speed = 10;

let lifeAtual = 5;
let coinAtual = 0;
let pointAtual = 0;

let checkColisao;

function pressKey(event){
    if (event.key === "ArrowRight"){
        direcao = 1;
        personagem.style.backgroundImage = "url(../archives/mario.gif)";

    } else if (event.key === "ArrowLeft") {
        direcao = -1;

    } else if (event.code === "Space") {
        personagem.classList.add('jump');
        setTimeout(() => {
            personagem.classList.remove('jump');
        }, 500);
    }
}

function soltaKey(event){
    if (event.key === "ArrowRight"){
        direcao = 0;        
    } else if (event.key === "ArrowLeft") {
        direcao = 0;
    }
}

function attMovimentos() {
    position+= direcao * speed;
    personagem.style.left = position + "px";
}

function colisaoBloco() {
    const checkPersonagem = personagem.getBoundingClientRect();
    const checkBloco = bloco.getBoundingClientRect();
    if (
        checkBloco.left < checkPersonagem.right &&
        checkBloco.right > checkPersonagem.left &&
        checkBloco.top < checkPersonagem.bottom &&
        checkBloco.bottom > checkPersonagem.top 
        ) {
            clearInterval(checkColisao);
            coinAtual++;
            coin.textContent = coinAtual;
            pointAtual+= +10;
            point.textContent = pointAtual;
            checkCoins();
            setTimeout(() =>{
                checkColisao = setInterval(colisaoBloco, 10); 
            }, 500)
        }
}

    function checkCoins() {
        if (coinAtual === 20) {
            coinAtual = 0;
            coin.textContent = coinAtual;
            lifeAtual++;
            life.textContent = lifeAtual;
        }
    }

document.addEventListener("keydown", pressKey);
document.addEventListener("keyup", soltaKey);
setInterval(attMovimentos, 50); 
checkColisao = setInterval(colisaoBloco, 10); 
