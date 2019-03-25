console.log("its working");

fetch("http://localhost:3000/weather?address=missouri").then((res) => {
  res.json().then((data) => {
    if(data.error) {
      console.log(data.error)
    } else {
      console.log(data.location);
      console.log(data.forecastData);
    }
  })
}) 

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
let message1 = document.querySelector("#message-1");
let message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = "Loading";
  
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
  res.json().then((data) => {
    if(data.error) {
      console.log(data.error)
    } else {
      message1.textContent = data.location;
      message2.textContent = data.forecastData;
      search.value = "";
    }
  })
}) 
})
