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
	rand_img = false;
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


rand_img = false;
rand_img = document.getElementById('open-rand');
rand_img.addEventListener('click', function() {
	n = (Math.floor(Math.random() * 15) + 1);
	sourceimage.src = `img/random/rand_img (${n}).png`;

	sourceimage.onload = function () {
		canvas.width = sourceimage.offsetWidth;
		canvas.height = sourceimage.offsetHeight;
		context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight);	
	}
	rand_img = true;
});


document.getElementById("goose").addEventListener('click', function() {
	sourceimage.src = `img/goose.jpg`;
	sourceimage.onload = function () {
		canvas.width = sourceimage.offsetWidth;
		canvas.height = sourceimage.offsetHeight;
		context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight);	
	}
	rand_img = true;
});

document.getElementById("area51").addEventListener('click', function() {
	sourceimage.src = `img/area51.jpg`;
	sourceimage.onload = function () {
		canvas.width = sourceimage.offsetWidth;
		canvas.height = sourceimage.offsetHeight;
		context.drawImage(sourceimage, 0, 0, sourceimage.offsetWidth, sourceimage.offsetHeight);	
	}
	rand_img = true;
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
		if(imgData[i+3] != 0)
			char = String.fromCharCode(imgData[i+3]);
		textData += char;
		
		if(imgData[i+3] == 94) break;  // 94 = '^'
	} 

	msg = decryptText(textData.substr(1, textData.length-2));
	if('Ÿ' == msg[0] && 'Ÿ' == msg[1] && 'Ÿ' == msg[2]) {
		two_done_.hidden = true;
		oupt.innerText = "The embedded text was lost. \nThis happens when the image is modified";
		oupt.style.cssText = "color:red";
	}
	else {
		two_done_.innerText = "Message extracted from image";
		two_done_.hidden = false;

		oupt.innerText ="Message: " + msg;
		oupt.style.cssText = "color:black";
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
const message_ = document.getElementById('message');
const kywrd_one = document.getElementById('keyword-one');
const kywrd_two = document.getElementById('keyword-two');
//////////////////////////////////////////////////////////////////////////////////////////

message_.onchange = function () {
	text = message.value;
	// console.log(text);
}

// Check for valid keyword!
kywrd_one.onchange = function () {
	keyword = kywrd_one.value;
	// console.log(keyword);
}

kywrd_two.onchange = function () {
	keyword = kywrd_two.value;
	// console.log(keyword);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// Preloading random images
var images = new Array()

function preload() {
	for(let i =1; i<=15; i++) {
		images[i] = new Image();
		images[i].src = `img/random/rand_img (${i}).png`;
	}
}

preload();
/////////////////////////////////////////////////////////////////////////////////////////////////