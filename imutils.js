// Image utilities to be implemented in the future

/////////////////////////////////////////////////////////////////////////////////////////////////
// Aditional canvas functions 

function rotate() {
	let imgwidth = sourceimage.offsetWidth;
	let imgheight = sourceimage.offsetHeight;
	canvas.width = imgwidth;
	canvas.height = imgheight;

	context.translate(imgwidth / 2, imgheight / 2);
	context.rotate(Math.PI / 2);
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

	switch (color) {
		case 'R': for (var i = 0; i < pixels.data.length; i += 4) { data[i + 1] = 0; data[i + 2] = 0; } break;
		case 'G': for (var i = 0; i < pixels.data.length; i += 4) { data[i + 0] = 0; data[i + 2] = 0; } break;
		case 'B': for (var i = 0; i < pixels.data.length; i += 4) { data[i + 0] = 0; data[i + 1] = 0; } break;
		case 'A': for (var i = 0; i < pixels.data.length; i += 4) { data[i + 0] = 0; data[i + 1] = 0; data[i + 2] = 0; } break;

		default: let gray = 127;
			for (var i = 0; i < pixels.data.length; i += 4) {
				gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
				data[i + 0] = gray;
				data[i + 1] = gray;
				data[i + 2] = gray;
			}
	}

	context.putImageData(pixels, 0, 0);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// A few quotes to use as examples (Get more quotes!)
const quotes = [
	"“One man’s “magic” is another man’s engineering. “Supernatural” is a null word. – Robert A. Heinlein",
	"“Normal people believe that if it ain’t broke, don’t fix it. Engineers believe that if it ain’t broke, it doesn’t have enough features yet.” - Scott Adams",
	"“There’s nothing I believe in more strongly than getting young people interested in science and engineering, for a better tomorrow, for all humankind.”- Bill Nye",
	"“The most important thing is to keep the most important thing the most important thing.”- Donald P. Coduto",
	"“I have not failed, but found 1000 ways to not make a light bulb.”- Thomas Edison",
	"One has to watch out for engineers - they begin with the sewing machine and end up with the atomic bomb.”- Marcel Pagnol, Critiques des Critiques",
	"“A scientist can discover a new star but he cannot make one. He would have to ask an engineer to do it for him.”- Gordon Lindsay Glegg",
	"“Science can amuse and fascinate us all, but it is engineering that changes the world.”- Isaac Asimov"
]

function getRandomSecret() {
	// To be implemented 

	// Set canvas to STEM image
	// Set key.value = STEM
	// Set message.value = One of the quotes above
	// Use btn.click() 
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//EOF

