var relocate = function(){
	window.location = window.location;
}


window.onload = function(event){

	let input = document.querySelector('.input');
	let data = dataSet.split('\n');
	let text = document.querySelector('.text');
	let timer = document.querySelector('.timer');
	let entered =document.createElement('div');
	let container = document.querySelector('.container');
	entered.className = 'entered';

	for(let i = 0; i < 20; i++){
		let id = Math.floor((Math.random() * data.length + 1));
		let word = document.createElement('span');
		i == 0 ? word.className = 'current word' : word.className = 'word';
		word.innerText = data[id];
		text.append(word); text.append('\n')
	}

	function onTimeOff(){
		input.setAttribute('disabled', 'true');
		text.innerHTML = '';
		text.append(entered);
		container.append(entered.children.length + ' слов в минуту и \n');
		container.append(entered.querySelectorAll('.passed').length + ' правильных слов в минуту');
	}

	function timerStart(){
		let time = parseFloat(timer.innerText);
		if(time == 59) 
			onTimeOff();
		timer.innerText = (time + 1);
		if(time < 59)
			 setTimeout(timerStart, 1000);
	}

	//хендлер ввода
	input.addEventListener('input', function(event){
		let current = text.querySelector('.current');
		let key = event.data;
		let exp = new RegExp(input.value, 'i');


		if (parseInt(timer.innerText) == 0)
			timerStart();

		// console.log(key);
		console.log(input.value.length);
		if((input.value == current.innerText.match(exp)) || (input.value.length == 0)){
			console.log('срабатывает');
			current.className = 'word current';
		} else {
			current.className = current.className + ' missed';
		}
		if(key == ' '){
			if(current == text.lastElementChild){
				text.innerHTML = '';
				text.append(current);
				for(let i = 0; i < 20; i++){
					let id = Math.floor((Math.random() * data.length + 1));
					let word = document.createElement('span');
					i == 0 ? word.className = 'current word' : word.className = 'word';
					word.innerText = data[id];
					text.append(word); text.append('\n')
				}
			}

			input.value = input.value.replace(' ', '');
			if(input.value == current.innerText){
				current.className = 'word passed';
				current.nextElementSibling.className = 'word current';
			} else {
				current.className = 'word missed';
				current.nextElementSibling.className = 'word current';
			}
			entered.append(current.cloneNode(true));
			entered.append('\n');
			input.value = '';
		}
	})

}