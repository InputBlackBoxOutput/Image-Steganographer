// Image Steganographer
// Written by Rutuparn Pawar (InputBlackBoxOutput)

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Uncomment below code and canvas tag in body to help debug 
// const canvas = document.getElementById('canvas');

/////////////////////////////////////////////////////////////////////////////////////////////////
// Open image and set the respective canvas 
function openImage(which) {
	rand_img = false;
	let file = document.createElement("INPUT");
	file.setAttribute("type", "file");

	file.addEventListener('change', function () {
		if (this.files && this.files[0]) {
			let fileExt = this.files[0].name.split(".")[1];

			if (fileExt == "png" || fileExt == "jpeg" || fileExt == "jpg") {

				if (which)
					source_image.src = URL.createObjectURL(this.files[0]);
				else
					sink_image.src = URL.createObjectURL(this.files[0]);

				source_image.onload = function () {
					if (source_image.width > 1000 || source_image.height > 1000) {
						alert("Image should less than 1000 x 1000 pixels in size");
						return;
					}
					else {
						canvas.width = source_image.offsetWidth;
						canvas.height = source_image.offsetHeight;
						context.drawImage(source_image, 0, 0, source_image.offsetWidth, source_image.offsetHeight);
					}

				}

				sink_image.onload = function () {
					if (source_image.width > 1000 || source_image.height > 1000) {
						alert("Image should less than 1000 x 1000 pixels in size");
						return;
					}
					else {
						canvas.width = sink_image.offsetWidth;
						canvas.height = sink_image.offsetHeight;
						context.drawImage(sink_image, 0, 0, sink_image.offsetWidth, sink_image.offsetHeight);
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

/////////////////////////////////////////////////////////////////////////////////////////////////
// Open example images and set the canvas 

document.getElementById("goose").addEventListener('click', function () {
	source_image.src = `img/goose.jpg`;
	source_image.onload = function () {
		canvas.width = source_image.offsetWidth;
		canvas.height = source_image.offsetHeight;
		context.drawImage(source_image, 0, 0, source_image.offsetWidth, source_image.offsetHeight);
	}
	rand_img = true;
});

document.getElementById("area51").addEventListener('click', function () {
	source_image.src = `img/area51.jpg`;
	source_image.onload = function () {
		canvas.width = source_image.offsetWidth;
		canvas.height = source_image.offsetHeight;
		context.drawImage(source_image, 0, 0, source_image.offsetWidth, source_image.offsetHeight);
	}
	rand_img = true;
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// Preloading random images
var images = new Array()

function preload() {
	for (let i = 1; i <= 15; i++) {
		images[i] = new Image();
		images[i].src = `img/random/rand_img (${i}).png`;
	}
}

preload();
/////////////////////////////////////////////////////////////////////////////////////////////////
