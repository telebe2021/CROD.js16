let url = 'http://localhost:3000/doc/';

// --------- NAV MENU ----------//


const navMenu = document.querySelector(".nav-menu");
const nav = document.querySelector("nav");

document.querySelector("#menu").addEventListener("click", () => {
    if (navMenu.style.top === "100px") {
        navMenu.style.top = "-500px";
    } else {
        navMenu.style.top = "100px";
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
        navMenu.style.top = "-500px";
    }
});

window.onscroll = () => {
    if (window.scrollY > 100) {
        nav.style.background = " #f8f8f8";
        nav.style.padding = "10px 0";
    }
    else {
        nav.style.padding = "5px 0";
    }
}


//////////DATA//////////

const card = document.querySelector("#card");
const searchInp = document.querySelector("#search");
let filteredArr = [];
let copyArr = [];
let ml = 8;
const load = document.querySelector(".load");

async function getALLCards() {

    let res = await axios.get(url)
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
        <button class="delete" onclick="network.delete(${element.id})">Delete</button>
        <button class="update" onclick="updateCard(${element.id})">Update</button>
        </span>
        <i onclick="addFavorite(${element.id})" class="bi bi-heart"></i>
    </div>`
    });
};

getALLCards();

//load//

load.addEventListener("click", () => {
    ml += 4;
    getALLCards();
});

//search//

searchInp.addEventListener("input", (e) => {
    console.log(filteredArr);
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((element) =>
        element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

    )
    getALLCards();
})

//update//

let form = document.querySelector("form");
let fileInp = document.querySelector("#file");
let imageDiv = document.querySelector("#img2");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");
let updateDiv = document.querySelector(".updatediv");
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

//favorites//

async function addFavorite(id) {
    if (event.target.classList.contains('bi-heart')) {
        event.target.classList.remove('bi-heart')
        event.target.classList.add('bi-heart-fill')

        axios.get(url + id)
            .then(res => {
                console.log(res.data);
                return res.data
            })
            .then(res => {
                axios.get(`http://localhost:3000/favs`)
                    .then(response => {
                        let ID = res1.data.find(find => find.id === res1.id);
                        if (!ID) {
                            axios.post(`http://localhost:3000/favs`, res)
                        }
                        else {
                            axios.delete(`http://localhost:3000/favs/${ID.id}`)
                        }
                    })
            })
    }
    else {
        event.preventDefault();
        event.target.classList.remove('bi-heart-fill')
        event.target.classList.add('bi-heart')
        axios.delete(`http://localhost:3000/favs/${id}`)
    }
}