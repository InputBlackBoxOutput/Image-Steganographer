
const embed_message = document.getElementById('embed-message');
const embed_keyword = document.getElementById('embed-keyword');

embed_message.onchange = function () {
    text = embed_message.value;
}

embed_keyword.onchange = function () {
    keyword = embed_keyword.value;
}

embed_msg = document.getElementById('embed-msg');
embed_msg.hidden = true;
embed_done = document.getElementById('embed-done');
embed_done.hidden = true;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Open image or use random image

const source_image = document.getElementById('img');
document.getElementById('embed-open').addEventListener('click', function () { openImage(1); });

rand_img = false;
rand_img = document.getElementById('rand-open');
rand_img.addEventListener('click', function () {
    n = (Math.floor(Math.random() * 15) + 1);
    source_image.src = `img/random/rand_img (${n}).png`;

    source_image.onload = function () {
        canvas.width = source_image.offsetWidth;
        canvas.height = source_image.offsetHeight;
        context.drawImage(source_image, 0, 0, source_image.offsetWidth, source_image.offsetHeight);
    }
    rand_img = true;
});

///////////////////////////////////////////////////////////////////////////////////////////////////
// Embed encrypted message in the image

embed = document.getElementById('embed');
embed.addEventListener('click', function () {
    let validationResult = "";

    if (/\/blank/g.test(source_image.src))
        validationResult = "Please upload an image";
    else if (embed_keyword.value == "")
        validationResult = "Please enter a keyword";
    else if (embed_message.value == "")
        validationResult = "Please enter a message";


    if (validationResult == "") {
        toEmbed = true;
        embedDataIntoImage();
        embed_msg.hidden = true;

        embed_done.innerText = "Message encrypted & embedded into image. Downloading image .....";
        embed_done.hidden = false;
    }
    else {
        embed_msg.hidden = false;
        embed_msg.innerText = validationResult;
    }
});


function embedDataIntoImage() {
    let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    let imgData = pixels.data;

    textData = encryptText(text);

    // Adding start and stop tokens to know where to start and stop scanning while decrypting 
    textData = "$" + textData + "^";

    let loc = 0;
    for (var i = 0; i < imgData.length; i += 4) {
        imgData[i + 3] = (textData.charCodeAt(loc));
        loc++;
        if (loc == textData.length) break;
    }

    console.log(pixels.data);
    context.putImageData(pixels, 0, 0);

    url = canvas.toDataURL('image/png');

    let a = document.createElement('a');
    a.href = url;
    a.download = "secret.png";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Reset

const embed_reset = document.getElementById('embed-reset');
embed_reset.onclick = () => {
    embed_message.value = "";
    embed_keyword.value = "";

    source_image.src = `img/blank.png`;
    source_image.onload = function () {
        canvas.width = source_image.offsetWidth;
        canvas.height = source_image.offsetHeight;
        context.drawImage(source_image, 0, 0, source_image.offsetWidth, source_image.offsetHeight);
    }
    rand_img = false;

    embed_done.hidden = true;
    embed_msg.hidden = true;
}

///////////////////////////////////////////////////////////////////////////////////////////////////