//Criação de variáveis globais. Guardarão informações e estados.
var diryJ,dirxJ,jog,velJ,pjx,pjy;
var velT;
var tamTelaW,tamTelaH;
var jogo;
var frames;
var contBombas,painelContBombas,velB,tmpCriaBomba;
var bombasTotal;
var vidaPlaneta,barraPlaneta;
var ie,isom;
var telaMsg;



//MOVIMENTAÇÃO

	//Função que verifica qual tecla foi clicada e atribui um valor a partir disso. É chamada no final do código (document.addEventListener("keydown",teclaDw);).
	function teclaDw(){
		var tecla=event.keyCode; //keycode identifica qual tecla foi clicada e guarda o valor da mesma. 
		if(tecla==38){//Compara o valor das teclas, nesse caso, da seta direcional para cima, pois o valor dela é 38.
			diryJ=-1; //Muda o valor da posição.
		}else if(tecla==40){//Baixo
			diryJ=1;
		}
		if(tecla==37){//Esquerda
			dirxJ=-1;
		}else if(tecla==39){//Direita
			dirxJ=1;
		}
		if(tecla==32){//Espaço / Tiro
			//TIRO
			atira(pjx+17,pjy); //Chama a função atira atribuindo um valor para x e y. Esses valores são definidos pois essa função possui argumentos, sendo eles x e y. Sempre que uma função com argumentos é chamada, é necessário que os seus argumentos também sejam declarados e, nesse caso, eles são declarados com valores. 
		}
	}

	//Função que verifica qual tecla foi solta e atribui um valor a partir disso. É chamada no final do código (document.addEventListener("keyup",teclaUp);).
	function teclaUp(){
		var tecla=event.keyCode;
		if((tecla==38)||(tecla==40)){
			diryJ=0;
		}
		if((tecla==37)||(tecla==39)){//Esquerda
			dirxJ=0;
		}
	}

	//Atribuir os valores das teclas a posição do jogador. Essa função é chamada pela função gameLoop.
	function controlaJogador(){ 
		pjy+=diryJ*velJ; 
		pjx+=dirxJ*velJ;
		//"diryJ" e "dirxJ" mudam conforme qual tecla é clicada (função teclaUp e teclaDw). Com essas variáveis eu defino a direção para qual o personagem moverá. Elas são multiplicadas por um valor chamado de "velJ", ele representa a velocidade e aumentará a distância percorrida pelo jogador a cada clique. 
		jog.style.top=pjy+"px";
		jog.style.left=pjx+"px";
		//O valor final é atribuido a posição do jogador. 
		//EXEMPLO: Cliquei na tecla direcional direta (dirxJ=1). Após multiplicar por velJ (=4), a variável  pjx guarda o valor 4. Esse valor é atribuido a distância do jogador em relação a parede esquerda (jog.style.left=pjx+"px";), ou seja, o personagem é distânciado 4px a direita. Isso faz com que ele se movimente. 
	}



//TANQUE VERDE

function criaBomba(){ //Essa função é chamada automáticamente a cada 1,7seg, usando a função setInterval (tmpCriaBomba=setInterval(criaBomba,1700);).

	//Define uma posição aleatória para o tanque 

	if(jogo){ //Verifica se o jogo já começou (true ou false), caso tenha começado, os seguintes valores são atribuidos: 
		var y=0; //Difine q o tanque verde nascerá no topo.
		var x=Math.random()*tamTelaW;  //Cria um valor aleatório para o tanque nascer horizontalmente, levando em consideração o tamanho da tela (tamTelaw)

	//Cria o tanque 
	var bomba=document.createElement("div");
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="bomba"; //Valor da class.
	att2.value="top:"+y+"px;left:"+x+"px;"; //Valor do style top e left (definidos anteriormente). 
	bomba.setAttributeNode(att1);
	bomba.setAttributeNode(att2);


	document.body.appendChild(bomba); //Depois que o tanque é criado ele é adicionado a tela. 
	contBombas--; //A quantidade total de bombas que o jogo deverá criar é 150, definida pela variável "contBombas". A cada bomba que é criada, essa linha diminui um valor da variável "contBombas" até que ela guarde o valor 0 e o jogo pare. 
	}
}

	//Essa função controla o movimento dos tanques, colisões com a tela e a remoção deles. É chamada pela função gameLoop.
	function controlaBomba(){
		bombasTotal=document.getElementsByClassName("bomba"); //A array "bombasTotal" guarda todos os elementos com o class = bomba (na função anterior, essa class foi criada e definida como a class dos tanques).
		var tam=bombasTotal.length; //A quantidade de elementos guardados em bombasTotal é guardado em tam. 
		for(var i=0;i<tam;i++){ //Esse for percorre todos os tanques criados. 
			if(bombasTotal[i]){ //Verifica se o tanque identificado pelo valor de i ainda existe no jogo. 
				var pi=bombasTotal[i].offsetTop; // Em pi é armazenado a posição vertical do tanque. 
				pi+=velB; //Nessa mesma posição é adicionado um valor. Esse valor aumentará a distância do topo, dando a impressão de q o tanque está em movimento. Essa é a mesma lógica usada para o jogador. 
				bombasTotal[i].style.top=pi+"px"; //O valor de pi é enviado para o css. 
				if(pi>tamTelaH){ //Verifica se o item saiu da tela, ou seja, se o jogador perdeu pontos.
					vidaPlaneta-=10; //Caso o valor de pi seja maior q o tamanho da tela significa que ele ultrapassou a distância permitida e o jogador deverá perder ponto. 
					criaExplosao(2,bombasTotal[i].offsetLeft,null); //Cria uma explosão tipo 2 nas coordenas do tanque. 
					bombasTotal[i].remove(); //Apaga o tanque que explodiu. 
				}
			}
		}
	}

	

//TIROS

	//Essa função cria os tiros e é chamada pela função teclaDw toda vez que o espaço é cricado. 
	function atira(x,y){  //x e y são variáveis que usadas como argumentos, ou seja, fornecendo informações para a função. O valor delas são definidas pro pjx+17,pjy quando a função é chamada. 
	var t=document.createElement("div"); //A div para o tiro é criada 
	var att1=document.createAttribute("class");
	var att2=document.createAttribute("style");
	att1.value="tiroJog"; 
	att2.value="top:"+y+"px;left:"+x+"px"; //O lugar onde a bala será criada é definido (mesma posição que o jogador). 
	t.setAttributeNode(att1);
	t.setAttributeNode(att2);
	document.body.appendChild(t);
	}
	
	//Movimentação do tiro. Usa a mesma lógica que os tanques. É chamada pela função gameLoop.
	function controleTiros(){
		var tiros=document.getElementsByClassName("tiroJog"); 
		var tam=tiros.length; 
		for(var i=0;i<tam;i++){
			if(tiros[i]){ 
				var pt=tiros[i].offsetTop; 
				pt-=velT;  
				tiros[i].style.top=pt+"px"; 
				colisaoTiroBomba(tiros[i]); //Verifica se o tiro colidiu com algum tanque. 
				if(pt<0){ //Caso os tiros cheguem ao topo da tela eles serão apagados. 
					tiros[i].remove(); 
				}
			}
		}
	}

	//Essa função verifica se o tiro colidiu com algum tanque. É chamada na função controleTiros.  
	function colisaoTiroBomba(tiro){ // Sendo tiro um argumento, o seu valor é definido na função controleTiros, quando a função atual é chamada (colisaoTiroBomba(tiros[i])). 
		var tam=bombasTotal.length; //Coleta a quantidade de tanques no jogo,
		for(var i=0;i<tam;i++){  //Esse loop passará por todas as bombas, verificndo se elas possuem a mesma posição que o tiro[i] (valor de tiro). 
			if(bombasTotal[i]){
				if(
					(
						(tiro.offsetTop<=(bombasTotal[i].offsetTop+40))&& //Cima tiro com baixo bomba (compara a posição da bomba com a do tanque).
						((tiro.offsetTop+6)>=(bombasTotal[i].offsetTop)) //Baixo tiro com cima bomba (compara a posição da bomba com a do tanque).
					)
					&& //junta as condições.
					(
						(tiro.offsetLeft<=(bombasTotal[i].offsetLeft+24))&& //Esquerda tiro com direita bomba (compara a posição da bomba com a do tanque).
						((tiro.offsetLeft+6)>=(bombasTotal[i].offsetLeft)) //Direita Tito  com esquerda Bomba (compara a posição da bomba com a do tanque).
					)
				){
					criaExplosao(1,bombasTotal[i].offsetLeft-25,bombasTotal[i].offsetTop); //Chama a função que cria uma explosão, pois a colisão é true.
					bombasTotal[i].remove(); //Remove os tanques atigidos. 
					tiro.remove(); //Remove os tiros atingidos. 
				}
			}
		}
	}

	//Cria uma explosão, pois houve colisão de tanques com tiros ou tanques com tela. É chamada pela função colisaoTiroBomba e função controlaBomba. 
	function criaExplosao(tipo,x,y){  
		if(document.getElementById("explosao"+(ie-4))){
			document.getElementById("explosao"+(ie-4)).remove();
		}
		//Esse if verifica quantas explosões estão sendo mostradas na tela. Basicamente, esse código faz com que só sejam mostaradas 4 explosões ao mesmo tempo, por isso, o id da ultima explosão é pego e diminuido 4, resultando em um id já existente, cujo representa uma outra explosão que será apagada. Por exemplo, o meu id atual é 9, sendo subtraido 4, terei o id 5, sendo assim, a explosão de id 5 será apagada. 	

		var explosao=document.createElement("div");
		var img=document.createElement("img");
		var som=document.createElement("audio");
		//Atributos para div
		var att1=document.createAttribute("class");
		var att2=document.createAttribute("style");
		var att3=document.createAttribute("id");
		//Atributo para imagem
		var att4=document.createAttribute("src");
		//Atributos para audio
		var att5=document.createAttribute("src");
		var att6=document.createAttribute("id");

		att3.value="explosao"+ie; //Define que o id da div que mostrará as explosões. 
		if(tipo==1){ 
			att1.value="explosaoAr"; 
			att2.value="top:"+y+"px;left:"+x+"px;"; 
			att4.value="explosao_ar.gif?"+new Date();
		}else{
			att1.value="explosaoChao";  
			att2.value="top:"+(tamTelaH-57)+"px;left:"+(x-17)+"px;"; //Define onde essa explosão acontecerá. O -17 adequa a posição horizontalmente, para ficar mais cenralizado a bomba, a mesma coisa acontece com o 57, só que verticamente. Esses valores são atribuidos de acordo com o tamanho da animação.  
			att4.value="explosao_chao.gif?"+new Date();
			
			//OBS: O new Date() é usado para que o navegador sempre procure o último valor. Nesse caso, isso é necessário porque o valor muda toda hora e se ele pegar o valor antigo o jogo não funcionará da forma adequada. 
		}
		att5.value="exp1.mp3?"+new Date();
		att6.value="som"+isom;
		explosao.setAttributeNode(att1);
		explosao.setAttributeNode(att2);
		explosao.setAttributeNode(att3);
		img.setAttributeNode(att4);
		som.setAttributeNode(att5);
		som.setAttributeNode(att6);
		explosao.appendChild(img); 
		explosao.appendChild(som); 
		document.body.appendChild(explosao); 
		document.getElementById("som"+isom).play(); 
		ie++;
		isom++;
	}


//Verifica a vida e a quantidade de tanques criados para saber se o jogo já acabou. Essa função é chamada pelo gameLoop. 
function gerenciaGame(){  
	barraPlaneta.style.width=vidaPlaneta+"px"; //Na função inicia o tamanhos dessa div foi definida como o tamanho da vida do planeta também, mas isso é definido aqui novamente porque a vida do planeta dimiruirá conforme o jogo, logo essa div precisa diminuir para mostrar ao jogador que ele está perdendo pontos. 
	if(contBombas<=0){ //contBombas é definida como 150 na função reinicia, e diminuida 1 quando um tanque é criado (função criaBomba). Quando ela chega a 0, significa que o jogo acabou e que o jogador conseguiu finalizá-lo. 
		jogo=false; //O jogo para, ou seja, a função gameLoop para de chamar as funções controlaJogador, controleTiros e controlaBomba. 
		clearInterval(tmpCriaBomba); //O intervalo de criação de bombas para e mais nenhuma bomba é criada. 
		telaMsg.style.backgroundImage="url('vitoria.jpg')"; //O cenário muda, informando ao jogador que o jogo acabou. 
		telaMsg.style.display="block"; 
	}
	if(vidaPlaneta<=0){ //Inicialmente a vida do planeta é igual a 300, mas sempre que um tanque bate no final do body -10 é descontado (função controlaBomba). Quando o valor chega a 0, quer dizer q a vida acabou e que o jogador perdeu. 
		jogo=false; 
		clearInterval(tmpCriaBomba);
		telaMsg.style.backgroundImage="url('derrota.jpg')"; 
		telaMsg.style.display="block"; 
	}
}

//Responsável por manter o jogo em loop constante de verificar vida, vitória, movimentação, criar tiros, dentre outras coisas. É chamado pela função reinicia e por ele mesmo. 
function gameLoop(){ 
	if(jogo){ //se jogo = true, faça: 
		controlaJogador(); //Verifica e muda a posição do jogador. 
		controleTiros(); //Faz o tiro andar, chama a função que verifica se ele colidiu e apaga caso tenha saido da tela. 
		controlaBomba(); //Faz o tanque andar, chama a função que verifica se ele colidiu e apaga caso tenha saido da tela. 
	}
	gerenciaGame(); //Verifica a vida e a quantidade de tanques criados. 
	frames=requestAnimationFrame(gameLoop); //Contador que funciona de acordo com as atuzalizações do navegador, a cada mudança de frame a função é chamada. 
}


//Responsável por reiniciar o jogo e definir valor para as variáveis. É chamado pela função inicia, quando o botão jogar é clicado (document.getElementById("btnJogar").addEventListener("click",reinicia);)
function reinicia(){
	bombasTotal=document.getElementsByClassName("bomba");
	var tam=bombasTotal.length;
	for(var i=0;i<tam;i++){
		if(bombasTotal[i]){
			bombasTotal[i].remove();
		}
	}

	telaMsg.style.display="none"; //A tela que aparece os cenários é removida. 
	clearInterval(tmpCriaBomba); //As bombas não são criadas.
	cancelAnimationFrame(frames); //Os frames não são contados.  
	vidaPlaneta=300; //A vida do planeta é definida. 
	pjx=tamTelaW/2; //O jogador é centralizado na tela.
	pjy=tamTelaH/2; //O jogador é centralizado na tela. 
	jog.style.top=pjy+"px"; 
	jog.style.left=pjx+"px";
	contBombas=150; //A quantidade de tanques que serão criados é definida.
	jogo=true; //O jogo passa a funcionar.
	tmpCriaBomba=setInterval(criaBomba,1700); //O timer para criar os tanques é criado.
	gameLoop(); //A função que chama as funções que controlam o jogo é chamada.
}


//Responsável pela página inicial. É chamada assim que a página carrega. 
function inicia(){
	jogo=false; 

	//TELA 
	tamTelaH=window.innerHeight; //Pega o tamanho da tela.  
	tamTelaW=window.innerWidth; //Pega o tamanho da tela.  

	//JOGADOR
	dirxJ=diryJ=0; 
	pjx=tamTelaW/2; //O jogador é centralizado na tela.
	pjy=tamTelaH/2; //O jogador é centralizado na tela.
	velJ=velT=5; //A velocidade do jogador e dos tiros é definida.
	jog=document.getElementById("naveJog"); //Capitura a div do jogador presente no HTML.
	jog.style.top=pjy+"px"; 
	jog.style.left=pjx+"px";

	//BOMBAS 
	contBombas=150; //A quantidade de tanques que serão criados é definida.
	velB=3; //A velocidade dos tanques é definida.
	
	//PLANETA
	vidaPlaneta=300; //A vida do planeta é definida.
	barraPlaneta=document.getElementById("barraPlaneta"); //A barra de vida do planeta é criada.
	barraPlaneta.style.width=vidaPlaneta+"px"; //A barra de vida do planeta é criada.

	//Controles de explosão.
	ie=isom=0;

	//Telas
	telaMsg=document.getElementById("telaMsg"); //Tela dos cenários é criada.
	telaMsg.style.backgroundImage="url('intro.jpg')"; //Tela dos cenários recebe imagem.
	telaMsg.style.display="block"; //Tela dos cenários é mostrada.
	document.getElementById("btnJogar").addEventListener("click",reinicia); //O botão de jogar chama a função reinicia.
}



window.addEventListener("load",inicia); //Assim que a tela carrega a função inicia é chamada.
document.addEventListener("keydown",teclaDw); //Sempre que qualquer tecla é clicada a função teclaDw é chamada.
document.addEventListener("keyup",teclaUp); //Sempre que qualquer tecla é solta a função teclaUp é chamada.