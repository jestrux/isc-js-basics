var lisimu = document.querySelector("#lisimu");
var screenshotSound = document.querySelector("#screenshotSound");
var whatsappButton = document.querySelector("#whatsapp");
var fbButton = document.querySelector("#fb");

function changeThemeTo(theme){
    if(theme == "fb"){
        lisimu.classList.remove("whatsapp");
        whatsappButton.classList.remove("active");
        fbButton.classList.add("active");
    }
    else{
        lisimu.classList.remove("fb");
        fbButton.classList.remove("active");
        whatsappButton.classList.add("active");
    }

    // change theme of lisimu to new theme
    lisimu.classList.add(theme);
}

var darkModeButton = document.querySelector("#darkModeButton");
function toggleDarkMode(e){
    lisimu.classList.toggle('dark-mode');
    darkModeButton.classList.toggle('on');
}

function takeScreenshot(){
    domtoimage.toPng(lisimu)
        .then(function (dataUrl) {
            screenshotSound.currentTime = 0;
            lisimu.classList.remove("screenshot");
            setTimeout(() => {
                screenshotSound.play();
                lisimu.classList.add("screenshot");
            });

            setTimeout(() => {
                download(dataUrl, 'a-very-real-convo.png');
            }, 400);
        });
}

function removeMessage(event){
    event.target.remove();
}


var sendingMode = true;
var newMessageInput = document.querySelector("input");
function addNewMessage(){
    // get the value of the input
    var newMessage = newMessageInput.value;
    // clear the new messsage input
    newMessageInput.value = "";

    var newMessageHtml = getNewMessageHtml(newMessage);
    lisimu.innerHTML += newMessageHtml;
}

var toggleSendingModeButtton = document.querySelector("#toggleSendingModeButton");

function toggleSendingMode(){
    if(sendingMode == true){
        sendingMode = false;
        toggleSendingModeButtton.classList.remove("on");
    }
    else{
        sendingMode = true;
        toggleSendingModeButtton.classList.add("on");
    }
}

function getNewMessageHtml(newMessage, isImage = false){
    var newMessageHtml = '<div onclick="removeMessage(event)"';
    if(sendingMode == true)
        newMessageHtml += 'class="message sent"';
    else
        newMessageHtml += 'class="message"';

    newMessageHtml += ">" + newMessage + "</div>";

    return newMessageHtml;
}

function getNewImageMessageHtml(image){
    var newMessageHtml = '<div onclick="removeMessage(event)"';
    if(sendingMode == true)
        newMessageHtml += 'class="message image sent"';
    else
        newMessageHtml += 'class="message image"';

    newMessageHtml += ">";
    newMessageHtml += '<img src="' + image + '"/></div>';

    return newMessageHtml;
}

function addEmoji(emoji){
    newMessageInput.value += emoji;
}

function imagePicked(e){
    var files = e.target.files;

    if (files && files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var image = e.target.result;
            var newMessageHtml = getNewImageMessageHtml(image);
            lisimu.innerHTML += newMessageHtml;
        };

        reader.readAsDataURL(files[0]);
    }

    e.target.value = "";
}
