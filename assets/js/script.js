function getNextId() {
    const currentId = localStorage.getItem("nextId") || 0;
    const newId = +currentId + 1;
    localStorage.setItem("nextId", newId);
    return newId;
}

function createTaskFromFields(id) {
    const newTask = {
        taskId: id,
        taskName: taskName.value,
        taskDesc: taskDesc.value,
        dueDate: dueDate.value,
    };
    return newTask;
}

function createTaskCard(props) {
    const { taskId, taskName, taskDesc, dueDate } = props;
    const cardHtml = `
        <div id="nextId-${taskId}" class="card" style="width:18rem;">
          <div class="card-header">${taskName}</div>
          <ul class="list-group list-group-flush">
             <li class="list-group-item">${taskDesc} </li>
             <li class="list-group-item">${dueDate}</ li>
             <div>HERE</div>
         </ul>
         <button onclick="handleDeleteTask(${taskId})">Delete ${taskId}</button> 
       </div>
    `;
    return cardHtml;
}

function handleDeleteTask(taskId){
    const tasks = readTasks();
    const updatedTasks = tasks.reduce(function(acc, task) {
        if(task.taskId !== taskId){
            acc.push(task);
        }
        return acc;
    }, []);
    writeTasks(updatedTasks);
    renderTasks(updatedTasks);
}

function handleSubmitTask(event) {
    event.preventDefault();

    const id = getNextId();
    const newTask = createTaskFromFields(id);

    const tasks = readTasks();
    tasks.push(newTask);
    writeTasks(tasks);

    const cardTaskHtml = createTaskCard(newTask);
    $('#todoCards').append(cardTaskHtml);
}

function readTasks(){
    const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return currentTasks;
};

function writeTasks(tasks){
    const storeTasks = JSON.stringify(tasks);
    return localStorage.setItem("tasks", storeTasks);
}

function renderTasks(tasks){
    $('#todoCards').empty();
    tasks.forEach(function(task) {
        const cardTaskHtml = createTaskCard(task);
        $('#todoCards').append(cardTaskHtml);
    });
}

$(document).ready(function () {
    const tasks = readTasks();
    renderTasks(tasks);
    submitTaskButton.addEventListener('click', handleSubmitTask);
});