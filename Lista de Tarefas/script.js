let list = document.querySelector("ul");
let close = document.getElementsByClassName("close");
let myNodelist = document.getElementsByTagName("li");

for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    };
}

list.addEventListener(
    "click",
    function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
        }
    },
    false
);

function addElemento() {
    let li = document.createElement("li");
    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth();
    let ano = date.getFullYear();
    let data = dia + "/" + mes + "/" + ano;
    let inputValue = data + " - " + document.getElementById("tarefa").value.toUpperCase();
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
        alert("Você precisa descrever a tarefa");
    } else {
        document.getElementById("itemLista").appendChild(li);
    }
    document.getElementById("tarefa").value = "";
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        };
    }
}

function eraseElementos()
{
    for (let i = 0; i < myNodelist.length; i++) {
        myNodelist[i].style.display = "none";
    }
}