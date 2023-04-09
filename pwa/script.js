const localStorageKey = 'to-do-list';

function tarefaJaCriada() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");    
    let inputValue = document.getElementById('tarefa').value;
    let existe = values.find(element => element.name == inputValue);

    return !existe ? false : true;

}
function newTask() {
    let input = document.getElementById('tarefa');  

    input.style.border = ''; 

    if(!input.value) {
        input.style.border = '2px solid red';
        alert('Informe a descrição da tarefa!');
    } else if(tarefaJaCriada()) {
        alert('Já existe uma tarefa com essa descrição!');
    }
    else {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        })

        localStorage.setItem(localStorageKey, JSON.stringify(values))

        showTasks();
    }

    input.value = '';
}

function showTasks() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    let list = document.getElementById('lista-itens');

    list.innerHTML = ''

    for(let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}
                                <button id='tarefaFinalizada' onclick='removerItem("${values[i]['name']}")'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg>
                                </button>
                           </li>`
    }
}

function removerItem(item) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    let index = values.findIndex(elemento => elemento.name == item);

    values.splice(index, 1);

    localStorage.setItem(localStorageKey, JSON.stringify(values));

    showTasks();
}

showTasks();