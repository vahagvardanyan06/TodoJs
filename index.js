const root = document.querySelector(".root");
const todoForm = document.querySelector(".todo_form");
const todoInput = document.querySelector(".todo_input")
const todoFooter = document.querySelector(".todo_footer");

todoForm.addEventListener("submit", (evt)=>{
    evt.preventDefault()
})

const todos = []

function addTodo(){

    if(todoInput.value == ""){return}


   let todo = {

    text: todoInput.value,
    complited: false,
    id: new Date().getTime()
    
  }

      todos.push(todo) 

      drawTodos(todos);
    

      todoInput.value = ""


}

function drawTodos(todos){

    document.querySelectorAll(".todoDiv").forEach(todo=>{
        todo.remove()
    })


    todos.forEach((todo) => {

        const todoDiv = document.createElement("div");
              todoDiv.className = "todoDiv";
        const todoLabel = document.createElement("label");
        const todoCheckbox = document.createElement("input");
              todoCheckbox.type = "checkbox";
              todoCheckbox.onchange = () => { checkedTodo(todo) }
        
        const todoText = document.createElement("span");

              todoText.innerHTML = todo.text;    
              todoLabel.appendChild(todoCheckbox);
              todoLabel.appendChild(todoText);

        todoDiv.appendChild(todoLabel);

        const editTodoBtn = document.createElement("button");
              editTodoBtn.innerHTML = "Edit"
              editTodoBtn.onclick = () => {

                const editInput = document.createElement("input");
                      editInput.type = "text";
                      editInput.value = todo.text
                        
                      todoLabel.appendChild(editInput)   
                let editTimeOut;         
                
                editInput.addEventListener("input", (e)=>{
                    
                    clearTimeout(editTimeOut)

                        editTimeOut =  setTimeout(()=>{

                    editInputChange(todo, e.target.value)

                  },1000) 
                
                })      

              }

        const removeTodoBtn = document.createElement("button");
              removeTodoBtn.className = "removeTodoBtn"
              removeTodoBtn.innerHTML = "Delete",
              removeTodoBtn.onclick = ()=>{removeTodo(todo)}


        const todoCreatedTime = document.createElement("span")
        todoCreatedTime.innerHTML = ` created time   ${new Date().getHours()}: ${new Date().getMinutes()}`

              todoCreatedTime.style.color = "green"
              
        todoLabel.appendChild(todoCreatedTime)
              
        todoDiv.appendChild(editTodoBtn)    
        todoDiv.appendChild(removeTodoBtn);

        root.appendChild(todoDiv);

    });

    todoFoot(todos)
    

}


function removeTodo(todo){
    
    for(let i = 0; i < todos.length;++i ){

        if(todos[i].id === todo.id){
            todos.splice(i,1);
        }
    }

    drawTodos(todos)

}

function todoFoot(todos){
    todoFooter.innerHTML = "";

    todoFooter.innerHTML =` ${todos.filter((todo)=>{ todo.complited }).length} / ${todos.length} Completed`

    const clearCompletedBtn = document.createElement("button");
          clearCompletedBtn.innerHTML = "Clear Completed";  
          clearCompletedBtn.onclick = ()=>{claerAllCompleted()};
    
    
     todoFooter.appendChild(clearCompletedBtn)     
}


function claerAllCompleted(){

}

function checkedTodo(todo){

    
        for(let i = 0; i < todos.length;++i ){
    
            if(todos[i].id === todo.id){

                todo.complited = !todo.complited
            }
        } 



}


function claerAllCompleted(){

    for(let i = 0; i < todos.length;++i ){

        if(todos[i].complited === true){
            todos.splice(i,1);
            --i
        }
    }

    drawTodos(todos);

}


function editInputChange(todo, newText){

    todos.forEach(t=>{

        if(t.id == todo.id){
            t.text = newText;
        }
    })

    
        drawTodos(todos)
    
}