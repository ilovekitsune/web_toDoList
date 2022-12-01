let section = document.querySelector("section");
let add = document.querySelector("form button");

add.addEventListener("click",e=>{
		
		e.preventDefault();//prevent Form from being Submitted
		
		// getinput value
		let form = e.target.parentElement;
		//console.log(form.child);
		let todoText = form.children[0].value;
		let todoMonth = form.children[1].value;
		let todoDate = form.children[2].value;
		//console.log(todoText,todoMonth,todoDate);
		if (todoText === ""){
			alert("Please Enter things to DO!!");
			return;
		}
		
		//createElement   create todoList
		let todo = document.createElement("div");
		todo.classList.add("todo");
		let text = document.createElement("p");
		text.classList.add("todo-text");
		text.innerText = todoText;
		let time = document.createElement("p");
		time.classList.add("todo-time");
		time.innerText = todoMonth+'/'+todoDate;
		
		todo.appendChild(text);
		todo.appendChild(time);
		//create green check and trach can
		let completeButton = document.createElement("button");
		completeButton.classList.add("complete");
		completeButton.innerHTML = '<i class="fas fa-check"></i>'
		completeButton.addEventListener("click",e=>{
			let todoItem = e.target.parentElement;
			 todoItem.classList.toggle("done");
			 // localStorage todoDone
			 	let text = todoItem.children[0].innerText;
				let myListArray = JSON.parse(localStorage.getItem("list"));
				myListArray.forEach((item,index)=>{
					if (item.todoText == text){
						item.todoDone = !item.todoDone;
						localStorage.setItem("list",JSON.stringify(myListArray));
					}
				})
		})
		let trashButton = document.createElement("button");
		trashButton.classList.add("trash");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>'
		trashButton.addEventListener("click",e=>{
			let todoItem = e.target.parentElement;
			todoItem.addEventListener("animationend",()=>{
				
				//remove from localStorage
				let text = todoItem.children[0].innerText;
				let myListArray = JSON.parse(localStorage.getItem("list"));
				myListArray.forEach((item,index)=>{
					if (item.todoText == text){
						myListArray.splice(index,1);
						localStorage.setItem("list",JSON.stringify(myListArray));
					}
				})
				todoItem.remove();
			})
			todoItem.style.animation = "scaleDown 0.3s forwards";
			
		})
		todo.appendChild(completeButton);
		todo.appendChild(trashButton);
		todo.style.animation = "scaleUp 0.3s forwards";
		//create an Object
		let myTodo = {
		todoText:todoText,
		todoMonth:todoMonth,
		todoDate:todoDate,
		todoDone:false
		};
		
		//store data into an Array of Object
		let myList = localStorage.getItem("list");
		if (myList == null)
		{
			localStorage.setItem("list",JSON.stringify([myTodo]));
		}else{
			let myListArray = JSON.parse(myList);
			myListArray.push(myTodo)
			localStorage.setItem("list",JSON.stringify(myListArray));
		}
		console.log(JSON.parse(localStorage.getItem("list")));
		
		form.children[0].value ="";
		section.appendChild(todo);
})


let myList = localStorage.getItem("list");

if (myList !== null){
	let myListArray = JSON.parse(myList);
	myListArray.forEach(item => {
		// Create todo
		let todo = document.createElement("div");
		todo.classList.add("todo");
		let text = document.createElement("p");
		text.classList.add("todo-text");
		text.innerText = item.todoText;
		let time = document.createElement("p");
		time.classList.add("todo-time");
		time.innerText = item.todoMonth+'/'+item.todoDate;
		todo.appendChild(text);
		todo.appendChild(time);
		let completeButton = document.createElement("button");
		completeButton.classList.add("complete");
		completeButton.innerHTML = '<i class="fas fa-check"></i>'
		completeButton.addEventListener("click",e=>{
			let todoItem = e.target.parentElement;
			 todoItem.classList.toggle("done");
			 // localStorage todoDone
			 	let text = todoItem.children[0].innerText;
				let myListArray = JSON.parse(localStorage.getItem("list"));
				myListArray.forEach((item,index)=>{
					if (item.todoText == text){
						item.todoDone = !item.todoDone;
						localStorage.setItem("list",JSON.stringify(myListArray));
					}
				})
		})
		let trashButton = document.createElement("button");
		trashButton.classList.add("trash");
		trashButton.innerHTML = '<i class="fas fa-trash"></i>'
		trashButton.addEventListener("click",e=>{
			let todoItem = e.target.parentElement;
			todoItem.addEventListener("animationend",()=>{
				
				//remove from localStorage
				let text = todoItem.children[0].innerText;
				let myListArray = JSON.parse(localStorage.getItem("list"));
				myListArray.forEach((item,index) => {
					if (item.todoText == text){
						myListArray.splice(index,1);
						localStorage.setItem("list",JSON.stringify(myListArray));
					}
				})
				todoItem.remove();
			})
			todoItem.style.animation = "scaleDown 0.3s forwards";
			
		})
		if (item.todoDone){
			todo.classList.toggle("done");
		}
		todo.appendChild(completeButton);
		todo.appendChild(trashButton);
		section.appendChild(todo);
		
	})
	
}