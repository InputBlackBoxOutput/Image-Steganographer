// Image Steganographer
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const sourceimage = document.getElementById('img');
const sinkimage = document.getElementById('img-text');

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Uncomment below code and canvas tag in body to help debug 
// const canvas = document.getElementById('canvas');

/////////////////////////////////////////////////////////////////////////////////////////////////
// Move alert from open to text element!

document.getElementById('open-one').addEventListener('click', function () { open(1); });
document.getElementById('open-two').addEventListener('click', function () { open(0); });

function open(which) {
	let file = document.createElement("INPUT");
	file.setAttribute("type", "file");

	file.addEventListener('change', function() {	   
		if (this.files && this.files[0]) {
			let fileExt = this.files[0].name.split(".")[1];

			if(fileExt == "png" || fileExt == "jpeg" || fileExt == "jpg") {

				if(which)
					sourceimage.src = URL.createObjectURL(this.files[0]);	
				else
					sinkimage.src = URL.createObjectURL(this.files[0]);
				 
				sourceimage.onload = function () {
					if(sourceimage.width > 1000 || sourceimage.height > 1000) {
						alert("Image should less than 1000 x 1000 pixels in size");
						return;
					}
					else {
						canvas.width = sourceimage.offsetWidth;
						canvas.height = sourceimage.offsetHeight;
						context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight);	
					}
				
				}

				sinkimage.onload = function () {
					if(sourceimage.width > 1000 || sourceimage.height > 1000) {
						alert("Image should less than 1000 x 1000 pixels in size");
						return;
					}
					else {
						canvas.width = sinkimage.offsetWidth;
						canvas.height = sinkimage.offsetHeight;
						context.drawImage(sinkimage, 0, 0, sinkimage.offsetWidth, sinkimage.offsetHeight);	
					}
				
				}
			}
			else {
				alert(`Invalid image format .${fileExt}`);
				return;
			}  
		}
	}) 

	file.click();
}


rand_img = document.getElementById('open-rand');
rand_img.addEventListener('click', function() {
	n = (Math.floor(Math.random() * 30) + 1);
	sourceimage.src = `img/random/rand_img (${n}).png`;
	sourceimage.width = 200;
	sourceimage.height = 200;

	sourceimage.onload = function () {
		canvas.width = sourceimage.offsetWidth;
		canvas.height = sourceimage.offsetHeight;
		context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight);	
	}

});


/////////////////////////////////////////////////////////////////////////////////////////////////

oupt = document.getElementById('output');
document.getElementById('download-text').addEventListener('click', function () {
	if(!(/extracted/i.test(output.innerText)))
	saveAsTextFile(oupt.innerText, 'message.txt', 'text/plain');
});


function saveAsTextFile(data, fileExt, type) {
    var file = new Blob([data], {type: type});

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, fileExt);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileExt;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
 }


/////////////////////////////////////////////////////////////////////////////////////////////////
embed = document.getElementById('embed');

one_user_msg = document.getElementById('user-msg-one');
one_user_msg.hidden = true;
one_done_ = document.getElementById('done-one');
one_done_.hidden = true;


embed.addEventListener('click', function () {
	let validationResult = "";

	if(/\/blank/g.test(sourceimage.src))
		validationResult = "Please upload an image";
	else if(kywrd_one.value == "")
		validationResult = "Please enter a keyword";
	else if(message.value == "")
		validationResult = "Please enter a message";


	if(validationResult == "") {
		toEmbed = true;
		embedDataIntoImage();
		one_user_msg.hidden = true;

		one_done_.innerText = "Message encrypted & embedded into image. Downloading image .....";
		one_done_.hidden = false;
	}
	else {
		one_user_msg.hidden = false;
		one_user_msg.innerText = validationResult;
	}
});


extract = document.getElementById('extract');

two_user_msg = document.getElementById('user-msg-two');
two_user_msg.hidden = true;
two_done_ = document.getElementById('done-two');
two_done_.hidden = true;

extract.addEventListener('click', function () {
	let validationResult = "";

	if(/\/blank/g.test(sinkimage.src))
		validationResult = "Please upload an image";
	else if(kywrd_two.value == "") 
		validationResult = "Please enter the keyword";


	if(validationResult == "") {
		toEmbed = false;
		extractDataFromImage();
		two_user_msg.hidden = true;

		two_done_.innerText = "Message extracted from image";
		two_done_.hidden = false;
	}
	else {
		two_user_msg.hidden = false;
		two_user_msg.innerText = validationResult;
	}
});

/////////////////////////////////////////////////////////////////////////////////////////////////
function embedDataIntoImage() {
	let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	let imgData = pixels.data;

	textData = encryptText(text);

	// Adding start and stop tokens to know where to start and stop scanning while decrypting 
	textData = "$" + textData + "^";

	let loc = 0;
	for (var i = 0; i < imgData.length; i += 4) {
		imgData[i+3] = (textData.charCodeAt(loc));
		loc++;
		
		if(loc == textData.length) break;
	} 

	console.log(pixels.data);
	context.putImageData(pixels, 0, 0);

		url =  canvas.toDataURL('image/png');

		let a = document.createElement('a');
		a.href = url;
		a.download = "secret.png";

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function extractDataFromImage() {
	let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	let imgData = pixels.data;

	console.log(imgData);
	
	textData = "";
	for (var i = 0; i < imgData.length; i += 4) {
		char = String.fromCharCode(imgData[i+3]);
		textData += char;
		
		if(imgData[i+3] == 94) break;  // 94 = '^'
	} 

	oupt.innerText ="Message: " + decryptText(textData.substr(1, textData.length-2));
}

//////////////////////////////////////////////////////////////////////////////////////////

// A few quotes to use as examples 
"“One man’s “magic” is another man’s engineering. “Supernatural” is a null word. – Robert A. Heinlein"
"“Normal people believe that if it ain’t broke, don’t fix it. Engineers believe that if it ain’t broke, it doesn’t have enough features yet.” - Scott Adams"
"“There’s nothing I believe in more strongly than getting young people interested in science and engineering, for a better tomorrow, for all humankind.”- Bill Nye"
"“The most important thing is to keep the most important thing the most important thing.”- Donald P. Coduto"
"“I have not failed, but found 1000 ways to not make a light bulb.”- Thomas Edison"
"One has to watch out for engineers - they begin with the sewing machine and end up with the atomic bomb.”- Marcel Pagnol, Critiques des Critiques"
"“A scientist can discover a new star but he cannot make one. He would have to ask an engineer to do it for him.”- Gordon Lindsay Glegg"
"“Science can amuse and fascinate us all, but it is engineering that changes the world.”- Isaac Asimov"

//////////////////////////////////////////////////////////////////////////////////////////
const message_ = document.getElementById('message');
const kywrd_one = document.getElementById('keyword-one');
const kywrd_two = document.getElementById('keyword-two');
//////////////////////////////////////////////////////////////////////////////////////////

message_.onchange = function () {
	text = message.value;
	console.log(text);
}

// Check for valid keyword!
kywrd_one.onchange = function () {
	keyword = kywrd_one.value;
	console.log(keyword);
}

kywrd_two.onchange = function () {
	keyword = kywrd_two.value;
	console.log(keyword);
}

//////////////////////////////////////////////////////////////////////////////////////////
text = undefined;
keyword = undefined;  // "DUOSVAVVM" => Shugborough inscription
vigenereSquare = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];	   
index = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//////////////////////////////////////////////////////////////////////////////////////////
function createVigeneresSquare() {
	let offset = 0;

	for(let i=0; i<26; i++) {
		offset = i;
	for(let j=0; j<26-i; j++) {
			vigenereSquare[i][j] = String.fromCharCode(65 + offset);
			offset++;
		}

		offset = 0;
	for(let k=i; k>0; k--) {
		  	vigenereSquare[i][26-k] = String.fromCharCode(65 + offset);
		  	offset++;
	}
	}

	// for(let i=0; i<26; i++) {
	// 	console.log(vigenereSquare[i]);
	// }
}

createVigeneresSquare()

// //////////////////////////////////////////////////////////////////////////////////////////
function encryptText(msg) {	
	msg = msg.toUpperCase();
	keyword = keyword.toUpperCase();

	let iter = 0;
	let code = "";
	for(let i=0; i<msg.length; i++) {

		if(msg.charCodeAt(i) >=65 && msg.charCodeAt(i) <=90){
			code += vigenereSquare[index.search(keyword.charAt(iter))][index.search(msg.charAt(i))];
			iter++;

			if(iter >= keyword.length)
				iter = 0;
		}
		else
			code += msg.charAt(i);
	}
	return code;
}

//////////////////////////////////////////////////////////////////////////////////////////
function decryptText(code) {
	code = code.toUpperCase();
	keyword = keyword.toUpperCase();

	let iter=0;
	let loc;
	let msg = "";
	for(let i=0; i<code.length; i++) {

		if(code.charCodeAt(i) >=65 && code.charCodeAt(i) <=90){
			loc = index.search(keyword.charAt(iter));
			iter++;

			if(iter >= keyword.length)
				iter = 0;

			for(let j=0; j<26; j++){
	  if(vigenereSquare[loc][j] == code.charAt(i))
					msg += index.charAt(j);
			}
		}
		else
			msg += code.charAt(i);
	}
	return msg;
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Not utilized: To be implemnted in the future
/////////////////////////////////////////////////////////////////////////////////////////////////
// Aditional canvas functions 

function rotate() {
	let imgwidth = sourceimage.offsetWidth;
	let imgheight = sourceimage.offsetHeight;
	canvas.width = imgwidth;
	canvas.height = imgheight;

	context.translate(imgwidth / 2, imgheight / 2);
	context.rotate(Math.PI/2);
	context.drawImage(sourceimage, -(imgwidth / 2), -(imgheight / 2));
}


// Resize to size_x X size_y 
function resize(size_x, size_y) {
	canvas.width = size_x;
	canvas.height = size_y;
	context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight, 0, 0, size_x, size_y);
}


// Scale width and height by scale_w and scale_h respectively
function scale(scale_w, scale_h) {
	var imgwidth = sourceimage.offsetWidth;
	var imgheight = sourceimage.offsetHeight;

	canvas.width = imgwidth * scale_w;
	canvas.height = imgheight * scale_h;
	context.scale(scale_w, scale_h);
	context.drawImage(sourceimage, 0, 0);
}

// Crop image to rectangle specified by parameters
function crop(pos_x1, pos_y1, pos_x2, pos_y2) {
	w = pos_x2 - pos_x1;
	h = pos_y2 - pos_y1;
	canvas.width = w;
	canvas.height = h;
	context.drawImage(sourceimage, pos_x1, pos_y1, w, h, 0, 0, w, h);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function getColour(color) {
	var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	var data = pixels.data;

	switch(color) {
		case 'R': for (var i = 0; i < pixels.data.length; i += 4) { data[i+1] = 0; data[i+2] = 0;} break;
		case 'G': for (var i = 0; i < pixels.data.length; i += 4) { data[i+0] = 0; data[i+2] = 0;} break;
		case 'B': for (var i = 0; i < pixels.data.length; i += 4) { data[i+0] = 0; data[i+1] = 0;} break;
		case 'A': for (var i = 0; i < pixels.data.length; i += 4) { data[i+0] = 0; data[i+1] = 0; data[i+2] = 0;} break;

		default:let gray = 127;
				for (var i = 0; i < pixels.data.length; i += 4) {
					gray = (data[i]+data[i+1]+data[i+2])/3;
					data[i+0] = gray;
					data[i+1] = gray;
					data[i+2] = gray;
				} 
	}
		
	context.putImageData(pixels, 0, 0);
}
/////////////////////////////////////////////////////////////////////////////////////////////////