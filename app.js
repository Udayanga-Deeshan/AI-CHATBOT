var md = window.markdownit();


function selectChatUser(){
    console.log(document.getElementById("participantSelector").value);
}




function sendMessage(){
    const messageInput = document.getElementById("messageInput").value;
    console.log(messageInput);
    document.getElementById("chatMessages").innerHTML +=`
    <div class="message user">
              <h5 style="text-align: end;">${messageInput}</h5>
              <div class="icon"></div>
          </div>
    
`
document.getElementById("messageInput").value = "";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text": `${messageInput}`
        }
      ]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const loaderElement = document.createElement("div");
    loaderElement.className = "message-loader";
    loaderElement.innerHTML = `
        <div class="dots-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatMessages.appendChild(loaderElement);

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZU9k1_Ik1Dksqq7dCRhIatb6GMxZ_c_M", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    chatMessages.removeChild(loaderElement);
    console.log(result.candidates[0]);
    document.getElementById("chatMessages").innerHTML +=`
    <div class="message robot">
              <div class="icon"></div>
              <h5 >${md.render(result.candidates[0].content.parts[0].text)}</h5>
          </div>
        
    `
  })
  .catch((error) => console.error(error));

}





