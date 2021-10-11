# Image-Steganographer
Embed encrypted messages in an image and then extract them back

|||
|--|--|
|Website|https://image-steganographer.netlify.app/|
|Application for Windows OS|[https://github.com/.../releases/tag/v1.0.0](https://github.com/InputBlackBoxOutput/Image-Steganographer/releases/tag/v1.0.0)|

<!-- ## Things to note
| This cat can hold more than just the Tesseract  | Area 51 can hold on to a lot of secrets, add in your own |
|:---:|:---:|
| ![Captain Marvel's cat](img/goose.jpg)  | ![Area 51](img/area51.jpg)  | -->

## How to use the website/application?

#### How to use the embedder to embed a message in an image?
1. Upload an image. Feel free to use a random image provided by the website
1. Enter the keyword
1. Enter the message
1. Press the embed & download button

#### How to use the extractor to extract message from an image?
1. Upload the image containing the message
1. Enter the keyword
1. Press the extract button
1. When a success message is shown, see the section below for the message

## How it works?
#### Embedding the message in an image
1. We get the following inputs from the user: an image, a keyword and a message 
1. The message is encrypted with the help of the keyword by using Vigenere's cipher
1. The encrypted text is converted to an array of numbers using ASCII encoding
1. The alpha channel data in the image is modified to represent the array of numbers and a unique end token

#### Extracting the message from an image
1. We get the following inputs from the user: an image and a keyword
1. The alpha channel content of the image is parsed until a unique end token is reached to obtain an array of numbers
1. The array of numbers is converted to encrypted text using ASCII encoding
1. The extracted text is decrypted using the keyword and then displayed to the user

![](https://github.com/InputBlackBoxOutput/Image-Steganographer/blob/master/img/flow.png)

### Made with lots of ⏱️, 📚 and ☕ by InputBlackBoxOutput