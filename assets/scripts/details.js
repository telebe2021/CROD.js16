let id=new URLSearchParams (window.location.search).get("id");

let card = document.querySelector("#card");


network.getById(id).then(data => {

card.innerHTML += `
        <div>
        <img src="${data.image}" alt="">
        <h3>${data.name}</h3>
        <p>${data.text}</p>
    </div>
        `})