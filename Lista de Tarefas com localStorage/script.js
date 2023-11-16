let list = document.querySelector("ul");
let close = document.getElementsByClassName("close");
let myNodelist = document.getElementsByTagName("li");

function getStoredTasks() {
    var tarefas = JSON.parse(localStorage.getItem("tasks"));
    return tarefas || []; // Retorna um array vazio, caso não exista tarefas
}

function addTasksFromLocalStorage() {
    let tarefas = getStoredTasks();

    // Apenas adiciona as tarefas caso haja tarefas
    if (tarefas.length > 0) {
        for (let i = 0; i < tarefas.length; i++) {
            let li = document.createElement("li");
            let inputValue = tarefas[i].description;

            let t = document.createTextNode(inputValue);
            li.appendChild(t);
            document.getElementById("itemLista").appendChild(li);
            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            // Adiciona as funções do botão apagar
            for (let i = 0; i < close.length; i++) {
                close[i].onclick = function () {
                    let div = this.parentElement;
                    div.style.display = "none";
                };
            }
        }
    }
}

function addToLocalStorage(id, description) {
    let tasks = getStoredTasks();
    // Cria um arquivo JSON para cada tarefa
    tasks.push({ id: id, description: description });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addElemento() {
    let li = document.createElement("li");
    let date = new Date();
    let dia = date.getDate();
    let mes = date.getMonth();
    let ano = date.getFullYear();
    let data = dia + "/" + mes + "/" + ano;
    let inputValue =
        data + " - " + document.getElementById("tarefa").value.toUpperCase();

    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
        alert("Você precisa descrever a tarefa");
    } else {
        document.getElementById("itemLista").appendChild(li);
        // Adiciona a tarefa no localStorage
        addToLocalStorage(Date.now(), inputValue);
    }
    document.getElementById("tarefa").value = "";
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            // Remove a tarefa a partir de seu texto (futuramente mudar para apagar por meio de seu ID)
            // O -2 indica que tem que apagar os ultimos 2 characteres (xx - characteres dos botões de apagar elemento)
            console.log(close[i].parentElement.textContent.slice(0, -2));
            let div = this.parentElement;
            // Remove a tarefa a partir de seu texto (futuramente mudar para apagar por meio de seu ID)
            // O -2 indica que tem que apagar os ultimos 2 characteres (xx - characteres dos botões de apagar elemento)
            removeFromLocalStorage(
                close[i].parentElement.textContent.slice(0, -2)
            );
            div.style.display = "none";
        };
    }
}

function eraseElementos() {
    for (let i = 0; i < myNodelist.length; i++) {
        // Apaga todos os elementos também apartir de seu texto
        // O -2 indica que tem que apagar os ultimos 2 characteres (xx - characteres dos botões de apagar elemento)
        removeFromLocalStorage(myNodelist[i].textContent.slice(0, -2));
        myNodelist[i].style.display = "none";
    }
}

function removeFromLocalStorage(description) {
    let tasks = getStoredTasks();
    // Filtra o localStorage para incluir apenas as tarefas que não contenham a descrição especificada
    tasks = tasks.filter((task) => task.description !== description);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Executa o script assim que a página carrega totalmente
window.onload = function () {
    // Re-carrega as variáveis após a página carregar
    list = document.querySelector("ul");
    myNodelist = document.getElementsByTagName("li");

    getStoredTasks();
    addTasksFromLocalStorage();

    for (let i = 0; i < myNodelist.length; i++) {
        let span = document.createElement("span");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            console.log(close[i].parentElement.textContent.slice(0, -2));
            let div = this.parentElement;
            // Remove a tarefa a partir de seu texto (futuramente mudar para apagar por meio de seu ID)
            // O -2 indica que tem que apagar os ultimos 2 characteres (xx - characteres dos botões de apagar elemento)
            removeFromLocalStorage(
                close[i].parentElement.textContent.slice(0, -2)
            );
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
};
