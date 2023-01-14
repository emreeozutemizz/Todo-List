// Tüm Elemtleri Seçme 
const form =document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //TÜM EVENT LİSTENER
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
   
    if (confirm("Tümünü silmek istediğinizden emin misiniz?")){
        //Arayüzden todoları temizleme
        // todolist.innerHTML=""; //Yavaş Yöntem
        while(todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            //Bulamadı

            listItem.setAttribute("style","display : none !important" );
        }else {
            listItem.setAttribute("style","display : block");
        }
    });
}
function deleteTodo(e){
    if ( e.target.className === "fa fa-remove"){
      e.target.parentElement.parentElement.remove();   
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
      showAlert("success","Todo başarıyla silindi");

    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodoToStorage();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1); // Arrayden değer silme
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI(){
    let todos= getTodoToStorage();

    todos.forEach(function(todo){
     addTodoToUI(todo); 


     })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if (newTodo === ""){
        // <div class="alert alert-danger" role="alert">
        //                 This is a danger alert—check it out!
        //               </div>
        showAlert("danger","Lütfen bir todo girin");

    }
    else{
        
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert("succes","Todo başarıyla eklendi");

    }



    e.preventDefault();
}
function getTodoToStorage(){ // Storageden Todoları alma
    let todos;
    if (localStorage.getItem("todos") === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodoToStorage();
     
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className= 'alert alert-danger$(type)'; // 'alert alert-danger${type}'
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    
    //setTimeout
    setTimeout(function(){
        alert.remove();
    },1000)
}

function addTodoToUI(newTodo){
    //List Item Oluşturma
    const listItem = document.createElement("li");
    // Link Oluşturma
    const link = document.createElement("a");
    link.href="#";
    link.className = "delete-item";
    link.innerHTML="<i class= 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";

    // TEXXT nODE ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
 
    //Todo Lİst'e Çocuk Item'ı Ekleme
    todolist.appendChild(listItem);
 

}