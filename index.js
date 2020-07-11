const url = 'http://127.0.0.1:5000/get_description/'
let currentState = 'N', currentDir = 'N', dirs = 'WNESW', movementAllowed = true;
let backDir = {
	'N': 'S',
	'E': 'W',
	'S': 'N',
	'W': 'E'
};

let tag = document.getElementById('description');
let facing = document.getElementById('facing');
let breakpoint = document.getElementById('breakpoint');
let image = document.getElementById('img-view');

let index = 0;

let leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

function getData(direction=currentState) {
	let new_url = url + '/' + direction;
	fetch(new_url).then(response => response.json()).then((data)=>{
		tag.innerHTML = data['description'];
		facing.innerHTML = currentDir;
		breakpoint.innerHTML = currentState;
		movementAllowed = data['movementAllowed'];
		image.src = data['image']
		console.log(data);
	}).catch((err)=> { console.log(err); });
};

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            // up arrow
			alert('Not Allowed !');
            break;
        case 'ArrowDown':
            // down arrow
            alert('Not Allowed !');
            break;
        case 'ArrowLeft':
            // left arrow
            index = dirs.lastIndexOf(currentDir);
            currentDir = dirs[index-1];
            getData(currentState+currentDir);
            console.log('ArrowLeft');
            break;
        case 'ArrowRight':
            // right arrow
            index = dirs.indexOf(currentDir);
            currentDir = dirs[index+1];
            getData(currentState+currentDir);
            console.log('ArrowRight');
            break;
        case 'Enter':
        	if (!movementAllowed) {
        		alert('Cant go there !!');
        		break;
        	}
        	if (currentState.length > 1) {
        		if (currentState.slice(-1) === backDir[currentDir])
        			currentState = currentState.substring(0, currentState.length-1);
        		else 
        			currentState += currentDir;
        	}
        	else {
        		currentState += currentDir;
        	}
        	getData();
        	console.log('Going Ahead !');
    }
};

