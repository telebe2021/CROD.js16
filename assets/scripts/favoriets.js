let favurl = 'http://localhost:3000/favs/';

const card = document.querySelector("#card");
const searchInp = document.querySelector("#search");
let filteredArr = [];
let copyArr = [];
let ml = 8;
const load = document.querySelector(".load");

async function getALLCards() {

    let res = await axios(favurl);

    let data = await res.data;

    copyArr = data;
    card.innerHTML = ""

    filteredArr = filteredArr.length || searchInp.value ? filteredArr : data;

    filteredArr.slice(0, ml).forEach(element => {
        card.innerHTML += `
        <div>
        <img src="${element.image}" alt="">
        <h3>${element.name}</h3>
        <p>${element.text}</p>
        <span>
        <a href="./details.html?id=${element.id}" class="details"><button>Details</button></a>
        <button class="delete" onclick="deleteCard(${element.id})">Delete</button>
        <button class="update" onclick="updateCard(${element.id})">Update</button>
        </span>
    </div>
        `
    });
};

getALLCards();



function deleteCard(id) {
    axios.delete(favurl + id);
    window.location.reload()
}


load.addEventListener("click", () => {
    ml += 4;
    getALLCards();
});


searchInp.addEventListener("input", (e) => {
    console.log(filteredArr);
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((element) =>
        element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

    )
    getALLCards();
})


let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");
let updateDiv = document.querySelector(".upda");
let closeBtn = document.querySelector(".bi-x");

fileInp.addEventListener("change", () => {
    let src = fileInp.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = function (e) {
        imgageDiv.src = e.target.result
    }
})

closeBtn.addEventListener("click", () => {
    updateDiv.style.display = "none";
})

function updateCard(id) {
    updateDiv.style.display = "flex"
    axios.get(url + id).then(res => {
        nameInp.value = data.name,
            textInp.value = data.text,
            fileInp.value = data.image,
            imageDiv.src = data.image
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        axios.get(url + id).then(res => {
            nameInp.value = data.name,
                textInp.value = data.text,
                imageDiv.src = data.image
        });
        let src = fileInp.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let objetc = {
                name: nameInp.value,
                image: e.target.result,
                text: textInp.value
            }
            axios.patch(url + id, objetc).then(() => {
                getALLCards();
                updateDiv.style.display = "none"
            })
        }
        reader.readAsDataURL(src)
    })
}