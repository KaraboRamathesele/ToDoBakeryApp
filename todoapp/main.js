
let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let addBtn = document.getElementById('addBtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

// Validate the inputs
let formValidation = () => {
    if (textInput.value === '') {
        console.log('blank form');
        msg.innerHTML = `Cannot leave field blank!`; 
    } else {
        console.log('valid form');
        msg.innerHTML = '';
        acceptData();
        addBtn.setAttribute('data-bs-dismiss','modal');
        addBtn.click();

       (() => {
        addBtn.setAttribute('data-bs-dismiss','');
       })();
    }
};

// Empty array to collect the data input and store
let data = [];

// Use this function to fetch data in input and store in empty object. 
let acceptData = () => {
    data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value
    });

    localStorage.setItem('data', JSON.stringify(data));

    createTasks();
    // console.log(data);
};

// Output the result inputed from modal on list
let createTasks = () => {
    tasks.innerHTML = '';
    data.map((x,y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
    
        <p>${x.description}</p>
        <span class="options">
          <i onClick = 'completeTask(this)' class="fa-solid fa-check"></i>
          <i onClick = 'editTask(this)' data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
          <i onClick = 'deleteTask(this);createTasks()' class="fa-solid fa-trash"></i>
        </span>
      </div>
      `);
    });

  resetForm();

};

let resetForm = ()=> {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
};

let completeTask = (e) => {
    // let checkButton = document.createElement('button');
    // checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    // checkButton.classList.add('checkTask');
    // task.appendChild(checkButton);
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
}

// Update contentEditable?
let editTask = (e)=> {
    let selectedTask =  e.parentElement.parentElement; // div with tasks is the main parent 

    textInput.value = selectedTask.children[0].innerHTML
    dateInput.value = selectedTask.children[1].innerHTML
    textarea.value = selectedTask.children[2].innerHTML

    deleteTask(e);
}

(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    console.log(data);
    createTasks();
})()

