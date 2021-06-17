

const extract_keyword = document.getElementById('extract-keyword');
extract_keyword.onchange = function () {
    keyword = extract_keyword.value;
}

extract_output = document.getElementById('extract-output');

extract_msg = document.getElementById('extract-msg');
extract_msg.hidden = true;
extract_done = document.getElementById('extract-done');
extract_done.hidden = true;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Extract the message from the image

extract = document.getElementById('extract');
extract.addEventListener('click', function () {
    let validationResult = "";

    if (/\/blank/g.test(sink_image.src))
        validationResult = "Please upload an image";
    else if (extract_keyword.value == "")
        validationResult = "Please enter the keyword";


    if (validationResult == "") {
        toEmbed = false;
        extractDataFromImage();
        extract_msg.hidden = true;

    }
    else {
        extract_msg.hidden = false;
        extract_msg.innerText = validationResult;
    }
});

function extractDataFromImage() {
    let pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    let imgData = pixels.data;

    // console.log(imgData);

    textData = "";
    for (var i = 0; i < imgData.length; i += 4) {
        if (imgData[i + 3] != 0)
            char = String.fromCharCode(imgData[i + 3]);
        textData += char;

        if (imgData[i + 3] == 94) break;  // 94 = '^'
    }

    msg = decryptText(textData.substr(1, textData.length - 2));
    if ('Ÿ' == msg[0] && 'Ÿ' == msg[1] && 'Ÿ' == msg[2]) {
        extract_done.hidden = true;
        extract_output.innerText = "The embedded text was lost. \nThis happens when the image is modified";
        extract_output.style.cssText = "color:red";
    }
    else {
        extract_done.innerText = "Message extracted from image";
        extract_done.hidden = false;

        extract_output.innerText = "Message: " + msg;
        extract_output.style.cssText = "color:black";
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Save message as a text file

const sink_image = document.getElementById('img-text');
document.getElementById('extract-open').addEventListener('click', function () { openImage(0); });

document.getElementById('download-text').addEventListener('click', function () {
    if (!(/extracted/i.test(extract_output.innerText)))
        saveAsTextFile(extract_output.innerText, 'message.txt', 'text/plain');
});

function saveAsTextFile(data, fileExt, type) {
    var file = new Blob([data], { type: type });

    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, fileExt);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
        a.href = url;
        a.download = fileExt;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Reset

const extract_reset = document.getElementById('extract-reset');
extract_reset.onclick = () => {
    extract_keyword.value = "";

    sink_image.src = `img/blank.png`;
    sink_image.onload = function () {
        canvas.width = sink_image.offsetWidth;
        canvas.height = sink_image.offsetHeight;
        context.drawImage(sink_image, 0, 0, sink_image.offsetWidth, sink_image.offsetHeight);
    }
    rand_img = false;

    extract_msg.hidden = true;
    extract_done.hidden = true;
    extract_output.innerText = "";
}

///////////////////////////////////////////////////////////////////////////////////////////////////