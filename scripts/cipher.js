// Vigeneres cipher for text encryption

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
	// 	// console.log(vigenereSquare[i]);
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
//////////////////////////////////////////////////////////////////////////////////////////
//EOF