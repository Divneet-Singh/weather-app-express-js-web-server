console.log("Client side JS file");

const weatherForm = document.querySelector("form");

const searchInput = document.querySelector("input");

let message1 = document.querySelector("#message-1");
let message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading...";
    message2.textContent = "";

    const location = searchInput.value;

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.errorMessage) {
                console.log(data.errorMessage)
                message1.textContent = data.errorMessage;
            } else {
                message1.textContent = data.forecast;
                message2.textContent = data.location;
                console.log(data);
            }
        })
    });
})