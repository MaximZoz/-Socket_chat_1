const socket = io();
const message = document.querySelector(".message");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const nameBlock = document.querySelector(".name");

const userName = prompt("your name:");
const color = ["red", "blue", "yellow", "green"];
const colorRandom = color[Math.floor(Math.random() * color.length)];

nameBlock.innerHTML = userName !== null ? `${userName}` : "anonimus";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      message: input.value,
      name: userName,
      color: colorRandom,
    });
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `<span> ${data.name} </span>: ${data.message}`;
  message.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
  item.style.backgroundColor = `${data.color}`;
});
