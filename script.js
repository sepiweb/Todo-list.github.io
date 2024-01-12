// @sepiweb😌

$ = document;
const _todoBox = $.getElementById("todoBox");
const _inputElem = $.getElementById("userInput");
const _buttonClear = $.querySelector("#clear");
let _blureye = $.getElementsByClassName("bi bi-eye");
let deleteIcon = $.querySelectorAll(".bi-trash");

const emptyErr = $.querySelector(".ErrorMenu");

let arrayTodo = [];

function addNewTodo() {
  let newTitle = _inputElem.value;

  if (!newTitle == "") {
    _buttonClear.style.display = "flex";

    let newTodoObj = {
      id: arrayTodo.length + 1,
      title: newTitle,
      compelete: false,
    };

    arrayTodo.push(newTodoObj);
    _inputElem.value = "";

    todoGenerator(arrayTodo);
    setLocalStorage(arrayTodo);
  } else {
    emptyErr.style.transform = "translateX(10%)";
    setTimeout(() => {
      emptyErr.style.transform = "translateX(-140%)";
    }, 2000);
  }
}

function setLocalStorage(todo) {
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].title == "") {
      todo.splice(i, 1);
    }
  }
  let localdata = localStorage.setItem("todos", JSON.stringify(todo));
}

function todoGenerator(todo) {
  let new_Todo,
    new_boxIcon,
    new_TitleTodo,
    new_eyeIcon,
    new_DeleteIconTodo;

  _todoBox.innerHTML = "";

  todo.forEach((todo) => {
    new_Todo = $.createElement("div");
    new_boxIcon = $.createElement("div");
    new_TitleTodo = $.createElement("span");
    new_eyeIcon = $.createElement("i");
    new_DeleteIconTodo = $.createElement("i");

    new_Todo.className = "Todo";
    new_boxIcon.className = "boxIcon";
    new_TitleTodo.className = "titleTodo";
    new_eyeIcon.className = "bi bi-eye";
    new_DeleteIconTodo.className = "bi-trash";

    new_DeleteIconTodo.setAttribute("onclick", `deleteTodo(${todo.id})`);
    new_eyeIcon.setAttribute("onclick", `hideTodo(${todo.id})`);
    new_eyeIcon.setAttribute("title", `Hide task`);
    new_TitleTodo.id = todo.id;

    new_TitleTodo.innerHTML = todo.title;

    new_boxIcon.append(new_eyeIcon, new_DeleteIconTodo);
    new_Todo.append(new_TitleTodo, new_boxIcon);
    _todoBox.append(new_Todo);
  });
}

function getLocalStorage() {
  let localTodos = JSON.parse(localStorage.getItem("todos"));
  if (localTodos) {
    arrayTodo = localTodos;
    _buttonClear.style.display = "flex";
  } else {
    arrayTodo = [];
  }
  todoGenerator(arrayTodo);
}

function clearAll() {
  arrayTodo = [];
  localStorage.removeItem("todos");
  todoGenerator(arrayTodo);
}

function deleteTodo(todoID) {
  let LocalData = JSON.parse(localStorage.getItem("todos"));
  arrayTodo = LocalData;

  let indexTodo = arrayTodo.findIndex((todo) => {
    return todo.id == todoID;
  });

  arrayTodo.splice(indexTodo, 1);
  setLocalStorage(arrayTodo);
  todoGenerator(arrayTodo);
}

function hideTodo(todoID) {
  let LocalData = JSON.parse(localStorage.getItem("todos"));

  let indexTodo = arrayTodo.findIndex((todo) => {
    return todo.id == todoID;
  });

  // console.log(arrayTodo[indexTodo]);

  let contentToHide = $.getElementById(todoID);
  let hideIcon = contentToHide.nextElementSibling.children[0];

  if (hideIcon.classList == "bi-eye-slash blured") {
    hideIcon.classList = "bi bi-eye";
  } else {
    hideIcon.classList = "bi-eye-slash blured";
  }

  contentToHide.classList.toggle("blur");
  LocalData = arrayTodo;
}

_inputElem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTodo();
  }
});

window.addEventListener("load", getLocalStorage);
_buttonClear.addEventListener("click", clearAll);