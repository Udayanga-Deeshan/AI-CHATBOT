var md = window.markdownit();


function selectChatUser(){
    console.log(document.getElementById("participantSelector").value);
}




function sendMessage(){
    const messageInput = document.getElementById("messageInput").value;
    console.log(messageInput);
    document.getElementById("chatMessages").innerHTML +=`
    <h5 style="text-align: end;">${messageInput}</h5>
`

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

fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZU9k1_Ik1Dksqq7dCRhIatb6GMxZ_c_M", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result.candidates[0]);
    document.getElementById("chatMessages").innerHTML +=`
        <h5 style="text-align: start;">${md.render(result.candidates[0].content.parts[0].text)}</h5>
    `
  })
  .catch((error) => console.error(error));

}





