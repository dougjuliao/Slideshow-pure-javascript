var contentResult = document.querySelector('.mostrar'),
	buttons 	  = document.querySelectorAll('.buttons'),
	slideShow 	  = document.querySelector('#slideshow');

var visualizar = {
	displayNone: function(){
		slideShow.className = 'display-slide-none';
    },
	displayBlock: function(){
		slideShow.className = 'display-slide-block';
    }

};

	

//Alertar AIA
buttons[0].addEventListener('click',function(){
	alert('AIA');
	visualizar.displayNone();
});

//Mostrar número randomico de 0 a 50
buttons[1].addEventListener('click',function(){
	var numero = Math.round(Math.random()*50 + 1);
	contentResult.innerHTML = "Número randomico: "+numero;
	visualizar.displayNone();
});

//Abrir nova janela com um link
buttons[2].addEventListener('click',function(){
	window.open('https://github.com/dougjuliao');
	visualizar.displayNone();
});

//Alterar ano no navegador e exibir na text-align
buttons[3].addEventListener('click',function(){
	var data = new Date();
	data.setFullYear(2034); // altero o ano no objeto date.
	contentResult.innerHTML = "Data: "+data;
	visualizar.displayNone();
});

//Mostrar o resto de 25 dividido por 3
buttons[4].addEventListener('click',function(){
	var numero = 25 % 3;
	contentResult.innerHTML = "O resto: "+numero;
	visualizar.displayNone();
});

//console.dir(buttons[5]);
//console.log(buttons[5]);
buttons[5].children[1].addEventListener('click',function(){
	var funcao = function(val){
		contentResult.innerHTML = "Parâmetro digitado: "+val;
	}
	funcao(buttons[5].children[0].value);
	visualizar.displayNone();
});
/*
	-> Fazer um slideshow
	--> Botões de prev, next
	--> Navegação pelo teclado
	--> Responsivo


	-> Fazer um modal
	--> Ser possível abrir/fechar via código

	-> Fazer um tooltip
	--> Ser possível selecionar o texto do tooltip
	--> Nunca abrir para fora da janela, mesmo que o trigger esteja perto da borda da viewport
*/
/*********** SLIDESHOW *************/
//mostrar slideshow
buttons[6].addEventListener('click',function(){
	slideShow.className = 'display-slide-block';
	visualizar.displayBlock();
});

var Slide = {
	imagesLi:    document.querySelectorAll('.images'),
	navigation:  document.querySelectorAll('.nav'),
	start:  function(time){

	},
	/*
		Effect: function('efeito','posição inicial','tempo');
		efeito		   = string;
		posição incial = int;
		tempo		   = int;
		direction: 	   = left ou right(string);
	*/ 	
	effect: function(eff,pos,time,direction){
		switch(eff){
			/***************************** SLIDE ************************************/
			case 'slide':
			if(direction === 'left'){
				var left = pos;
				var slide = setInterval(function() {
				    left  += 5;
				    for(var i = 0; i < numSlides; i++){
				    	images[i].style.left = left + 'px';
				    }
				    if (left === 0) clearInterval(slide);

				},time);
			}else if(direction === 'right'){
				var right = pos;
				var slide = setInterval(function() {
				    right -= 5;
				    for(var i = 0; i < numSlides; i++){
				    	images[i].style.left = right + 'px';
				    }
				    if (right === 0) clearInterval(slide);

				},time);
			}
			break;
			/***************************** BOUNCE ************************************/
			case 'bounce':
				if(direction === 'left'){
					var left = pos,
						distanceBounce = 30;
					var bounce = setInterval(function(){
						left += 5;
						var randomDist = Math.round(Math.random()*distanceBounce);
						for(var i = 0; i < numSlides; i++){
							images[i].style.left = left + 'px';
							images[i].style.top  = randomDist + 'px';
						}
						if(left === 0){ 
							randomDist = 0;
							clearInterval(bounce)
						};

					},time);	
				}else if(direction === 'right'){
					var right = pos,
						distanceBounce = 30;
					var bounce = setInterval(function(){
						right -= 5;
						var randomDist = Math.round(Math.random()*distanceBounce);
						for(var i = 0; i < numSlides; i++){
							images[i].style.left = right + 'px';
							images[i].style.top  = randomDist + 'px';
						}
						if(right === 0){ 
							randomDist = 0;
							clearInterval(bounce)
						};

					},time);	
				}
			break;
			/***************************** ROTATE ************************************/
			case 'rotate':
				if(direction === 'left'){
					var left = pos;
					var rotate = setInterval(function(){
						left += 5;
						for(var i = 0; i < numSlides; i++){
				    		images[i].style.left = left + 'px';
				    		images[i].className = 'rotate-img';
				    	}
				    	if (left === 0){ 
				    		clearInterval(rotate);
				    	}
					},time);
				}else if(direction === 'right'){
					var right = pos;
					var rotate = setInterval(function(){
						right -= 5;
						for(var i = 0; i < numSlides; i++){
				    		images[i].style.left = right + 'px';
				    		images[i].className = 'rotate-img-r';
				    	}
				    	if (right === 0){ 
				    		clearInterval(rotate);
				    	}
					},time);
				}
			break;
			/***************************** FADEIN ************************************/
			case 'fadein':
					var left = pos;
					var fadein = setInterval(function(){
						left += 5;
						for(var i = 0; i < numSlides; i++){
				    		images[i].style.left = left + 'px';
				    		images[i].className = 'fadeIn';
				    	}
				    	if (left === 0){ 
				    		clearInterval(fadein);
				    	}
					},time);
			break;
			/***************************** FADEIN ESCALA************************************/
			case 'fadeinscale':
					var left = pos;
					var fadeinScale = setInterval(function(){
						left += 5;
						for(var i = 0; i < numSlides; i++){
				    		images[i].style.left = left + 'px';
				    		images[i].className = 'fadeIn-scale';
				    	}
				    	if (left === 0){ 
				    		clearInterval(fadeinScale);
				    	}
					},time);
			break;
		}
	}
};
var numSlides  = Slide.imagesLi.length,
	contentNav = document.querySelector('.navegacao-circulo'),
	images 	   = new Array();

for(var i = 0; i < numSlides; i++){
	images[i] = Slide.imagesLi[i].childNodes[0];
	contentNav.innerHTML += '<li class="nav-circle" id="'+i+'"">O</li>';
}

var naviCircle =  document.querySelectorAll('.nav-circle');

function viewSlides(){
		var numInicial = 0;
		images[0].style.display = 'block';
		naviCircle[0].className = 'ativo';
		
		
		Slide.navigation[1].addEventListener('click',function(){ // Navegação DIREITA
			numInicial += 1;
			if(numInicial >= numSlides){
				numInicial = 0;
			}
			for(var e in images){
				images[e].style.display = 'none';
				naviCircle[e].className = 'nav-circle';
			}
			images[numInicial].style.display = 'block';
			naviCircle[numInicial].className = 'ativo';
			Slide.effect('fadein',-200,10);
		});
		Slide.navigation[0].addEventListener('click',function(){ // Navegação ESQUERDA
			numInicial -= 1;
			if(numInicial == -1){
				numInicial = numSlides - 1;
			}
			for(var u  in images){
				images[u].style.display = 'none';
				naviCircle[u].className = 'nav-circle';
			}
			images[numInicial].style.display = 'block';
			naviCircle[numInicial].className = 'ativo';
			Slide.effect('fadeinscale',-200,10);
		});
		for(var a = 0; a < numSlides; a++){
			naviCircle[a].addEventListener('click',function(){ // Navegação INDEX-CIRCLE

				for(var i in images){
					naviCircle[i].className = 'nav-circle';
					images[i].style.display = 'none';
				}
				this.className = 'ativo';
				images[this.id].style.display = 'block';

				Slide.effect('slide',-400,5,'left');
			});
		}
}
viewSlides();