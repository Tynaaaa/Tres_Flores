const divPrincipal = document.createElement('div');
divPrincipal.id = "principal";
divPrincipal.style.backgroundImage = "url('imagens/inicio.gif')";
document.body.appendChild(divPrincipal);


//---------------------------------------------------------//


var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var contTanques,painelContTanques,velB,tmpCriaTanques,divContTanques;  
var tanquesTotal;
var vida,barra;
var ie,isom;

 
function teclaDw(event){
	var tecla = event.keyCode;  
	if(tecla == 38){
		diryJ = -1; 
	}else if(tecla == 40){
		diryJ = 1;
	}
	if(tecla == 37){
		dirxJ = -1;
	}else if(tecla == 39){
		dirxJ = 1;
	}
	if(tecla == 32){
		atira(pjx+17, pjy);
	}
}

function teclaUp(event){
	var tecla = event.keyCode;
	if((tecla == 38)||(tecla == 40)){
		diryJ = 0;
	}
	if((tecla == 37)||(tecla == 39)){
		dirxJ = 0;
	}
}

function controlaJogador(){
	pjy+=diryJ*velJ; 
	pjx+=dirxJ*velJ;
	jog.style.top = pjy+"px";
	jog.style.left = pjx+"px";
	}

function criaTanqueVerde(){
    if(jogo){ 
    var y = 0; 
    var x = Math.random()*tamTelaW;
    var tanqueVerde = document.createElement("div");
    var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    att1.value="tanqueVerde"; 
    att2.value="top:"+y+"px;left:"+x+"px;";
    tanqueVerde.setAttributeNode(att1);
    tanqueVerde.setAttributeNode(att2);
    divPrincipal.appendChild(tanqueVerde); 
    contTanques--; 
    }
}

function controlaTanqueVerde(){
	tanquesTotal = document.getElementsByClassName("tanqueVerde"); 
	var tam = tanquesTotal.length; 
	for(var i=0;i<tam;i++){ 
		if(tanquesTotal[i]){ 
			var pi = tanquesTotal[i].offsetTop; 
			pi+=velB; 
            tanquesTotal[i].style.top = pi+"px"; 
			if(pi>tamTelaH){ 
			vida-=10; 
			criaExplosao(2,tanquesTotal[i].offsetLeft,null);
            tanquesTotal[i].remove(); 
			}
		}
	}
}

function atira(x,y){ 
    var t = document.createElement("div"); 
    var att1 = document.createAttribute("class");
    var att2 = document.createAttribute("style");
    att1.value = "tiroJog"; 
    att2.value = "top:"+y+"px;left:"+x+"px"; 
    t.setAttributeNode(att1);
    t.setAttributeNode(att2);
    divPrincipal.appendChild(t);
}
        
function controleTiros(){
    var tiros = document.getElementsByClassName("tiroJog"); 
    var tam = tiros.length; 
    for(var i=0;i<tam;i++){
    if(tiros[i]){ 
        var pt = tiros[i].offsetTop;  
        pt-=velT; 
        tiros[i].style.top=pt+"px"; 
            colisaoTiroTanque(tiros[i]); 
            if(pt<0){
                tiros[i].remove();
            }
        }
    }
}

function colisaoTiroTanque(tiro){ 
	var tam = tanquesTotal.length;
		for(var i=0;i<tam;i++){   
		if(tanquesTotal[i]){
			if(
				(
					(tiro.offsetTop <= (tanquesTotal[i].offsetTop+40))&& 
					((tiro.offsetTop+6) >= (tanquesTotal[i].offsetTop))
				)
				&& 
				(
					(tiro.offsetLeft <= (tanquesTotal[i].offsetLeft+24))&& 
					((tiro.offsetLeft+6) >= (tanquesTotal[i].offsetLeft)) 
				)
			){
				criaExplosao(1,tanquesTotal[i].offsetLeft-25,tanquesTotal[i].offsetTop); 
					tanquesTotal[i].remove(); 
					tiro.remove(); 
			}
		}
	}
}

function criaExplosao(tipo,x,y){ 
	if(document.getElementById("explosao"+(ie-4))){
		document.getElementById("explosao"+(ie-4)).remove();
	}
	var explosao=document.createElement("div");
    var img=document.createElement("img");
	var som=document.createElement("audio");

    var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	var att3=document.createAttribute("id");

    var att4=document.createAttribute("src");

    var att5=document.createAttribute("src");
	var att6=document.createAttribute("id");

	att3.value="explosao"+ie; 

	if(tipo==1){ 
		att1.value="explosaoAr";  
		att2.value="top:"+y+"px;left:"+x+"px;";  
		att4.value="imagens/explosao_ar.gif?"+new Date();
	}else{
		att1.value="explosaoChao";
		att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px;"; 
		att4.value="imagens/explosao_chao.gif?"+new Date();  
		}

	att5.value="sons/exp1.mp3?"+new Date(); 
	att6.value="som"+isom;
	explosao.setAttributeNode(att1);
	explosao.setAttributeNode(att2);
	explosao.setAttributeNode(att3);
	img.setAttributeNode(att4);
	som.setAttributeNode(att5);
	som.setAttributeNode(att6);
	explosao.appendChild(img); 
	explosao.appendChild(som);  
	divPrincipal.appendChild(explosao);
	document.getElementById("som"+isom).play(); 
	ie++;
	isom++;
}


function gerenciaGame(){   
	barra.style.width=vida+"px"; 
	if (contTanques <= 0) {
        jogo = false;
        clearInterval(tmpCriaTanques);

        naveJog.style.display = "none";
        medidor.style.display= "none";
        var tanquesVerdesSumir = document.getElementsByClassName("tanqueVerde");
        for (var i = 0; i < tanquesVerdesSumir.length; i++) {
            tanquesVerdesSumir[i].style.display = "none";
        }   
        
        var tirosSumir = document.getElementsByClassName("tiroJog");
        for (var i = 0; i < tirosSumir.length; i++) {
            tirosSumir[i].style.display = "none";
        }
        
    
        somBatalha.pause();
        trilhaSonora.play();
        divPrincipal.style.backgroundImage = "url('imagens/cenarioBomUm.gif')";
        setTimeout(() => {
            divPrincipal.style.backgroundImage = "url('imagens/final.gif')";
        }, 7000);
    }

	if(vida<=0){ 
		jogo=false; 
		clearInterval(tmpCriaTanques);  

        naveJog.style.display = "none";
        medidor.style.display= "none";
        var tanquesVerdesSumir = document.getElementsByClassName("tanqueVerde");
        for (var i = 0; i < tanquesVerdesSumir.length; i++) {
            tanquesVerdesSumir[i].style.display = "none";
        }
        
        var tirosSumir = document.getElementsByClassName("tiroJog");
        for (var i = 0; i < tirosSumir.length; i++) {
            tirosSumir[i].style.display = "none";
        }


        somBatalha.pause();

        divPrincipal.style.backgroundImage = "url('imagens/cenarioRuimUm.png')";

        console.log("antes do timeset")
        setTimeout(() => {
            divPrincipal.style.backgroundImage = "url('imagens/cenarioRuimDois.gif')";
            console.log("duarnte o timeset")
            setTimeout(() => {
                trilhaSonora.play();
                divPrincipal.style.backgroundImage = "url('imagens/final.gif')";
                console.log("duarnte o timeset")
            }, 7000);
        }, 7000);
        console.log("apos o timeset")

}
        
}

function gameLoop(){
	if(jogo){
		controlaJogador();  
		controleTiros(); 
		controlaTanqueVerde(); 
	

	gerenciaGame(); 
	frames=requestAnimationFrame(gameLoop);  
    }
}



function reinicia(){
	tanquesTotal=document.getElementsByClassName("tanqueVerde");
	var tam=tanquesTotal.length;
	for(var i=0;i<tam;i++){
		if(tanquesTotal[i]){
			tanquesTotal[i].remove();
		}
	}

	clearInterval(tmpCriaTanques); 
	cancelAnimationFrame(frames); 
	vida=300; 
	pjx=tamTelaW/2; 
	pjy=tamTelaH/2;
	jog.style.top=pjy+"px"; 
	jog.style.left=pjx+"px";
	contTanques=50; 
	jogo=true;
	tmpCriaTanques=setInterval(criaTanqueVerde,1700);
	gameLoop(); 
    naveJog.style.display = "block";
    medidor.style.display= "block";

    var tanquesVerdesSumir = document.getElementsByClassName("tanqueVerde");
    for (var i = 0; i < tanquesVerdesSumir.length; i++) {
        tanquesVerdesSumir[i].style.display = "block";
    }

    var tirosSumir = document.getElementsByClassName("tiroJog");
    for (var i = 0; i < tirosSumir.length; i++) {
        tirosSumir[i].style.display = "block";
    }
}



//---------------------------------------------------------//



let cenarios = 0;

//AUDIOS
const trilhaSonora = document.querySelector('#audioUm');
const somPassos = document.querySelector('#audioDois');
const somTiro = document.querySelector('#audioTres');
const somInimigo = document.querySelector('#audioQuatro');
const somMedo = document.querySelector('#audioCinco');
const somBatalha = document.querySelector('#audioSeis');


//CRIAÇÂO DAS DIVs PRINCIPAIS

    //Criação da div SUPERIOR 
    const divSuperior = document.createElement('div');
    divSuperior.id = "superior";
    divPrincipal.appendChild(divSuperior);

        //Criando Imagem da div SUPERIOR 
        const imgSuperior = document.createElement('img');
        imgSuperior.src = "imagens/nome.png";
        imgSuperior.alt = "Placa escrita 'Três Flores'";
        divSuperior.appendChild(imgSuperior);


    //Criação da div INTERMEDIÁRIA 
    const divIntermediaria = document.createElement('div');
    divIntermediaria.id = "intermediaria";
    divPrincipal.appendChild(divIntermediaria);


        //Criando Imagem da div INTERMEDIÁRIA (JOGAR)
        const imgJogar = document.createElement('img');
        imgJogar.src = "imagens/jogar.png";
        imgJogar.alt = "Uma placa de madeira clara escrita 'JOGAR'"
        divIntermediaria.appendChild(imgJogar);

    //Criação da div INFERIOR
    const divInferior = document.createElement('div');
    divInferior.id = "inferior";
    divPrincipal.appendChild(divInferior);

        //Criando imagem para voltar ao login
        const imgLogin = document.createElement('img');
        imgLogin.src = "imagens/login.png";
        imgLogin.alt = "Botão com uma seta girando";
        divInferior.appendChild(imgLogin);

        imgLogin.addEventListener("click", () => {
            window.location.href = "login.php";
        });

        //Criando imagem para iniciar a trilha sonora
        const divMusica = document.createElement('div');
        divMusica.id = "musica";
        divInferior.appendChild(divMusica);

            const imgPlay = document.createElement('img');
            imgPlay.src = "imagens/play.png";
            imgPlay.alt = "Botão com o desenho de uma nota musical";
            divMusica.appendChild(imgPlay);

            imgPlay.addEventListener("click", () => {
                imgPlay.replaceWith(imgPause);
                trilhaSonora.play();
            });

            //Criando imagem para pausar a trilha sonora
            const imgPause = document.createElement('img');
            imgPause.src = "imagens/pause.png";
            imgPause.alt = "Botão com um quadrado";

            imgPause.addEventListener("click", () => {
                imgPause.replaceWith(imgPlay);
                trilhaSonora.pause();
            });

        //Criação da imagem da div INfERIOR
        const imgInferior = document.createElement('img');
        imgInferior.src = "imagens/info.png";
        imgInferior.alt = "Botão de madeira de informações";
        divInferior.appendChild(imgInferior);

        //crinado imagem de passar cenários
        const imgContinuar = document.createElement('img');
        imgContinuar.src = "imagens/continuar.png";
        imgContinuar.alt = "Placa de madeira com uma seta";


//FUNÇÔES P/ MOVIMENTAÇÂO ENTRE TELA INICIAL E INFORMAÇÔES
    function ocultarImagens() {
        imgSuperior.style.display = 'none';
        imgJogar.style.display = 'none';
        imgInferior.style.display = 'none';
        imgLogin.style.display = 'none';
        divMusica.style.display = 'none';
        divInferior.style.justifyContent = 'flex-end';
    };

    function mostrarImagens() {
        imgSuperior.style.display = 'block';
        imgJogar.style.display = 'block';
        imgInferior.style.display = 'block';
        imgLogin.style.display = 'block';
        divMusica.style.display = 'block';
        divInferior.style.justifyContent = 'center';

    };

//MOVIMENTAÇÂO ENTRE TELA INICIAL E INFORMAÇÔES

    //Tela inicial -> TELA INFORMAÇÕES  
    imgInferior.addEventListener('click', () => {
        divPrincipal.style.backgroundImage = "url('imagens/informacoes.gif')";
        ocultarImagens();
        imgInferior.replaceWith(imgContinuar);
    });

    //Tela informações -> TELA INICIAL
    imgContinuar.addEventListener('click', () => {
        if (cenarios === 0){
            divPrincipal.style.backgroundImage = "url('imagens/inicio.gif')";
            mostrarImagens();
            imgContinuar.replaceWith(imgInferior);
            console.log(cenarios);
        }


//MOVIMENTAÇÕES JOGO

    //Cenários - JOGO
        else{
            cenarios = cenarios + 1;

            if (cenarios === 2){
                divPrincipal.style.backgroundImage = "url('imagens/cenarioDois.png')";
                console.log(cenarios);
            }
        
            if (cenarios === 3){
                divPrincipal.style.backgroundImage = "url('imagens/cenarioTres.gif')";
                console.log(cenarios);
            }

            if (cenarios === 4){
                trilhaSonora.pause();
                imgContinuar.style.display = 'none';
                divPrincipal.style.backgroundImage = "url('imagens/preto.png')";
                somPassos.play();
                console.log(cenarios);
                somPassos.addEventListener("ended", function() {
                    imgContinuar.style.display = 'block';
                    divPrincipal.style.backgroundImage = "url('imagens/cenarioQuatro.png')";
                });
            }

            if (cenarios === 5){
                imgContinuar.style.display = 'none';
                divPrincipal.style.backgroundImage = "url('imagens/preto.png')";
                somMedo.play();
                somMedo.addEventListener("ended", function() {
                    divPrincipal.style.backgroundImage = "url('imagens/cenarioGuerra.png')";
                    somBatalha.play(); 

                    //---------------------------------------------------------------//

                    //TELA 
                    tamTelaH=720;
                    tamTelaW=1080; 

                    //DIVS
                    var medidor = document.createElement("div");
                    var att1 = document.createAttribute("id");
                    att1.value="medidor"; 
                    medidor.setAttributeNode(att1);
                    divPrincipal.appendChild(medidor); 

                    barra = document.createElement("div");
                    att1 = document.createAttribute("id");
                    att1.value="barra"; 
                    barra.setAttributeNode(att1);
                    medidor.appendChild(barra); 

                    divContTanques = document.createElement("div");
                    att1 = document.createAttribute("id");
                    att1.value="contTanques"; 
                    divContTanques.setAttributeNode(att1);
                    divPrincipal.appendChild(divContTanques); 

                    var naveJog = document.createElement("div");
                    att1=document.createAttribute("class");
                    att1.value="navJog"; 
                    var att2 = document.createAttribute("id");
                    att2.value="naveJog";

                    naveJog.setAttributeNode(att1);
                    naveJog.setAttributeNode(att2);
                    divPrincipal.appendChild(naveJog); 

                    //JOGADOR
                    dirxJ=diryJ=0; 
                    pjx=tamTelaW/2; 
                    pjy=tamTelaH/2;
                    velJ=velT=5;
                    jog=document.getElementById("naveJog");
                    jog.style.top=pjy+"px"; 
                    jog.style.left=pjx+"px";

                    //TANQUES 
                    contTanques=50;
                    velB=3;
                    
                    //Vida
                    vida=300;
                    barra=document.getElementById("barra");
                    barra.style.width=vida+"px";

                    //Controles de explosão
                    ie=isom=0;

                    //APAGAR ITENS 
                    reinicia();

                    //-------------------------------------------------------//
                });
                    
                console.log(cenarios);
            }

        }
    });
    //Iniciar JOGO
    imgJogar.addEventListener('click', () => {
        cenarios = cenarios + 1;
        divPrincipal.style.backgroundImage = "url('imagens/cenarioUm.gif')";
        ocultarImagens();    
        imgInferior.replaceWith(imgContinuar);    
        imgContinuar.style.display = 'block';
        console.log(cenarios);
    });

//--------------------------------------------------------//

document.addEventListener("keydown",teclaDw);
document.addEventListener("keyup",teclaUp);