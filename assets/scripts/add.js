let fileInp=document.querySelector("#file");
let form=document.querySelector("form");
let imgInp = document.querySelector("#image");
let textInp = document.querySelector("#text");
let nameInp = document.querySelector("#name");

fileInp.addEventListener("change",()=>{
    let src=file.files[0];
    let reader =new FileReader();
    reader.readAsDataURL(src);
    reader.onload=function(e){
        imgInp.src=e.target.result;
    }
})
form.addEventListener("submit", function (event) {
    event.preventDefault()
    let obj = {}

    let src = fileInp.files[0]
    const reader = new FileReader();
    reader.onload = function (e) {
        obj = {
            image: e.target.result,
            name: nameInp.value,
            text: textInp.value
        }
        axios.post("http://localhost:3000/doc", obj).then(res => console.log(res.data))
    }
    console.log(obj);
    reader.readAsDataURL(src);
    window.location = "./main.html";

})