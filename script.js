let taskHeading = document.querySelector(".task-heading");
let input = document.querySelector(".add_input");
let button = document.querySelector(".add_btn");
const containerList = document.querySelector(".container_list");
const modle_container = document.querySelector('.modle-container');

input.setAttribute("placeholder", "Please Enter Task");

/*-----add task-----*/
function addTask() {
    if(input.value === "") {
        alert("Please Enter Task");
    }
    else {
    let inputValue = input.value;

    const openList = document.createElement('div');
    openList.classList = "container-list1-item";
    const nameOfTask = document.createElement('h4');
    nameOfTask.innerText = inputValue;
    const descriptionOfTask = document.createElement('p');
    descriptionOfTask.classList = "description";

    const deleteTask = document.createElement('button');
    deleteTask.classList = "delete";
    deleteTask.innerText = "";

    /*----------color change each div--------*/
    const itemColor = document.createElement('div');
    itemColor.classList.add('item-color');
    openList.appendChild(itemColor);

    openList.append(nameOfTask, descriptionOfTask, deleteTask)
    containerList.appendChild(openList);
/*------------Delete Task-------*/
    deleteTask.addEventListener('click', (e) => {
        e.stopPropagation()
        openList.remove();
    })
    editModel(openList, nameOfTask, descriptionOfTask);
    input.value = null;
  /*--------dragging and dropping-------*/    
  openList.setAttribute("draggable", "true");
    openList.addEventListener('dragstart', () => {
        openList.classList.add('dragging');
    });
    openList.addEventListener('dragend', () => {
        openList.classList.remove('dragging');
    });
/*-----------dragOver------*/
    const listcontainer = document.querySelectorAll('.container_list');
    listcontainer.forEach((list) => {
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingElm = document.querySelector('.dragging');
            list.appendChild(draggingElm);
        })
    })

}
}
/*--------edit Modal-------*/
function editModel(div, ip, des) {
    div.addEventListener('dblclick', (e) => {
        e.stopPropagation()
        const storeDiv = document.createElement('div');
        storeDiv.classList = "modle-container-style"
        const taskLable = document.createElement('lable');
        taskLable.innerText = "Task Name";
        const descriptionLable = document.createElement('lable');
        descriptionLable.innerText = "Description";

        const inputTask = document.createElement('input');
        inputTask.classList = "editInput";
        inputTask.setAttribute('id', 'edit1');
        inputTask.setAttribute('type', 'text');
        inputTask.value = ip.innerText;

        const textArea = document.createElement('textarea');
        textArea.classList = "editInput"
        textArea.setAttribute('cols', '5');
        textArea.setAttribute('rows', '5');
        textArea.value = des.innerText;

        // const closeBtn = document.createElement('\u00d7;');
        // closeBtn.classList = "close-btn";

        const divButton = document.createElement('div');
        divButton.classList = "buttonDiv";

        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'save';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'close';

        divButton.appendChild(saveBtn);
        divButton.appendChild(deleteBtn);
        storeDiv.append(taskLable, inputTask, descriptionLable, textArea, divButton)
        modle_container.appendChild(storeDiv)

        saveTheEditedValue(saveBtn, ip, des, storeDiv, inputTask, textArea, "save");
        saveTheEditedValue(deleteBtn, ip, des, storeDiv, inputTask, textArea, "close")
        console.log(div.childNodes);
    })
}
/*  --------------Save edit input------*/
function saveTheEditedValue(btnFun, child, des, mainDiv, input1, input2, condition) {
    btnFun.addEventListener('click', (e) => {
        e.stopPropagation();
        if (condition === "save") {
            child = input1.value;
            des.innerText = input2.value;
            mainDiv.remove();
        } else {
            mainDiv.remove();
        }

    })
}

button.addEventListener('click', addTask)