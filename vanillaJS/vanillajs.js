/*NOTE: what I have left to do are 
1. all
2. active
3. completed
*/


var count = 0;
var completed = 0;
var allChecked = false;
var addToDo = document.getElementsByClassName("put-in-item")[0];
/*adding toDo*/
addToDo.addEventListener("keypress", function(e){
  var key = e.which;
  if (key === 13) {
    /* creates new div, gets text of input, puts input text in new div, clears input, and adds new div to the page*/
    var newItem = document.createElement("div");
    newItem.setAttribute("class", "one-item");
    // console.log(newItem);
    var completeDiv = document.createElement("div");
    completeDiv.setAttribute("class", "complete");
    newItem.appendChild(completeDiv);
    // console.log(newItem);
    var listItem = document.createElement("div");
    listItem.setAttribute("class", "list-item")
    var inputTextHere = document.getElementsByClassName("put-in-item")[0]
    var itemText = inputTextHere.value;
    // console.log(itemText);
    listItem.textContent = itemText;
    inputTextHere.value = "";
    newItem.appendChild(listItem);
    var removeToDo = document.createElement("div");
    removeToDo.setAttribute("class", "remove-to-do");
    removeToDo.className += " visibility";
    removeToDo.textContent = "x";
    newItem.appendChild(removeToDo);
    var allItems = document.getElementsByClassName("items-to-do")[0];
    allItems.appendChild(newItem);
    /*making complete all button visible*/
    document.getElementsByClassName("complete-all")[0].className = "complete-all";
    /*incrementing counter to change number of items*/
    count++;
    setUpFooter();
    setUpX();
    didTheTask();
  }
})

/*showing X when hovering over element*/


function getAllToDoItems(){
  var getToDoItems = document.getElementsByClassName("one-item");
  var toDoItemsArr = Array.from(getToDoItems);
  return toDoItemsArr[toDoItemsArr.length - 1];
}

function setUpFooter(){
  console.log("count is", count);
  var footer = document.querySelector("footer")
  if (count === 1 && footer.classList.length === 1){
  footer.classList.remove('visibility');
  }
  if (count === 1) {
  // console.log(footer);
  footer.children[0].innerHTML = count + " item left"
  } else {
  // console.dir(footer);
  footer.children[0].innerHTML = count + " items left"
  }
  toggleClearCompleted(footer)
}

function toggleClearCompleted(footer){
  // console.log("hits here")
  // var footer = document.querySelector("footer")
  // var clearCompleted = footer.children[2];
  var clearCompletedClassList = footer.children[2].classList
  // console.dir(clearCompletedClassList);
  if (completed === 0 && clearCompletedClassList.length === 0){
    clearCompletedClassList.value = "visibility";
  } else if (completed !== 0 && clearCompletedClassList.contains("visibility")){
    clearCompletedClassList.value = "";
  }
  if (count === 0 && completed === 0){ //removes visibility of the footer itself
    footer.classList.value += ' visibility';
    // console.dir(document.getElementsByClassName("complete-all"));
    document.getElementsByClassName("complete-all")[0].className += " visibility";
    count = 0;
  }
}

function setUpX(){
  var lastElement = getAllToDoItems();
  var x = lastElement.children[2];
  function mouseEnter(){
    // console.log("enters", lastElement);
    x.classList.toggle("visibility");
  }
  function mouseLeave(){
    // console.log("leaves ", lastElement);
    x.classList.toggle("visibility");
  }
  lastElement.addEventListener("mouseenter", mouseEnter)
  // elem.removeEventListener("mouseenter", mouseEnter)
  lastElement.addEventListener("mouseleave", mouseLeave)
  // elem.removeEventListener("mouseenter", mouseLeave)
  x.addEventListener("click", function(){
    removeTask(lastElement);
  })
}

function didTheTask(){
  var lastElement = getAllToDoItems();
  var lastElementCheck = lastElement.children[0];
  var lastElementContent = lastElement.children[1];
  lastElementCheck.addEventListener("click",function(){
    lastElementCheck.classList.toggle("checked-circle");
    lastElementContent.classList.toggle("strikethrough")
    if(lastElementCheck.classList.contains("checked-circle")){
      count--;
      completed++;
      if (count === 0){
        allChecked = true;
      }
    } else {
      count++;
      completed--;
      allChecked = false;
    }
    setUpFooter();
  })
}

function removeTask(element){
  console.dir(element)
  if (element.children[0].classList.contains("checked-circle")){
    completed--;
  } else {
    count--;
  }
  element.remove();
  setUpFooter();
}


var completeAllButton = document.getElementsByClassName("complete-all")[0]

// console.dir(completeAllButton);
completeAllButton.addEventListener("click", function(){
  var oneItem = document.getElementsByClassName("one-item");
  if (!allChecked) {
    Array.from(oneItem).forEach(function(element){
    var childZeroClasses = element.children[0].classList
    var childOneClasses = element.children[1].classList
    if (!childZeroClasses.contains("checked-circle")){
      completed++;
      count--;
      // console.log("hits here?", childZeroClasses)
      childZeroClasses.value += " checked-circle";
      // console.dir(childZeroClasses);
      childOneClasses.value += " strikethrough";
    }
    allChecked = true;
    // console.log("allChecked is", allChecked)
  })
  } else {
    // console.log("allChecked is true")
    Array.from(oneItem).forEach(function(element){
    var childZeroClasses = element.children[0].classList
    var childOneClasses = element.children[1].classList
    if (childZeroClasses.contains("checked-circle")){
      count++;
      completed--;
      // console.log("hits here?", childZeroClasses)
      childZeroClasses.remove("checked-circle");
      // console.dir(childZeroClasses);
      childOneClasses.remove("strikethrough");
    }
    allChecked = false;
  })
}
  setUpFooter();
  })

var footer = document.querySelector("footer")
var clearCompleted = footer.children[2];
clearCompleted.addEventListener("click", function(){
  var oneItem = document.getElementsByClassName("one-item");
  var arrItems = Array.from(oneItem)
  console.log(arrItems);
  for (var i = 0; i < arrItems.length; i++){
    var childZeroClasses = arrItems[i].children[0].classList
    if (childZeroClasses.contains("checked-circle")){
      console.log("gets to here")
      arrItems[i].remove(); //note I'm removing from the DOM not from the array
      completed--;
    }
  }
  setUpFooter();
})

document.getElementById("all").addEventListener("click", function(event){
  event.preventDefault();
  var oneItem = document.getElementsByClassName("one-item");
  var arrItems = Array.from(oneItem);
  arrItems.forEach(function(element){
    // console.dir(element);
    if (element.classList.contains("visibility")){
      console.log("element has visibility class")
      element.classList.remove("visibility");
      element.classList.remove("remove-from-flow");
    }
  })  
})

document.getElementById("active").addEventListener("click", function(event){
  event.preventDefault();
  var oneItem = document.getElementsByClassName("one-item");
  var arrItems = Array.from(oneItem);
  arrItems.forEach(function(element){
    // console.dir(element);
    if (element.children[1].classList.contains("strikethrough")){
      element.className += " visibility";
      console.dir(element);
      element.className += " remove-from-flow"
    } else if (element.classList.contains("remove-from-flow")){
        element.classList.remove("visibility");
        element.classList.remove("remove-from-flow");
      }
    })
})

document.getElementById("completed").addEventListener("click", function(event){
  event.preventDefault();
  var oneItem = document.getElementsByClassName("one-item");
  var arrItems = Array.from(oneItem);  
  arrItems.forEach(function(element){
    if (element.children[1].classList.contains("strikethrough")){
      element.classList.remove("visibility");
      element.classList.remove("remove-from-flow");
    } else {
      if (!element.classList.contains("remove-from-flow")){
        element.className += " visibility";
        element.className += " remove-from-flow"
      }
    }
  })
})

