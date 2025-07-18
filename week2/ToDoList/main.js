let todolist = document.getElementById('todolist');
let quantityField = document.getElementsByClassName('counter');
let button = document.getElementsByTagName('button');
let quantity = 0;

// Save items to local storage
function saveItems() {
  let items = [];
  const list = todolist.querySelectorAll('li');
  list.forEach((item, index) => {
    const contentDiv = item.querySelector('div > div');
    const checkbox = item.querySelector('input[type="checkbox"]');

    items.push({
      id: index,
      text: contentDiv.textContent,
      completed: checkbox.checked
    });
  });

  localStorage.setItem('todo-items', JSON.stringify(items));
}

// Create a new todo item
function createTodoItem(text, isCompleted = false) {
  let item = document.createElement('li');
  let itemContainer = document.createElement('div');

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = isCompleted;
  
  let content = document.createElement('div');
  content.textContent = text;
  
  if (isCompleted) {
    content.style.textDecoration = 'line-through';
  }
  
  // Add event listeners
  checkbox.addEventListener('change', function() { 
    content.style.textDecoration = this.checked ? 'line-through' : 'none';
    saveItems();
  });

  deleteButton.addEventListener('click', function() {
    if (window.confirm('Do you want to delete this item?')) {
      item.remove();
      quantity--;
      quantityField[0].textContent = quantity;
      saveItems();
    }
  });

  itemContainer.appendChild(content);
  itemContainer.appendChild(deleteButton);
  itemContainer.appendChild(checkbox);
  item.appendChild(itemContainer);
  
  return item;
}

// Load items from local storage
function loadItems() {
  const savedItems = localStorage.getItem('todo-items');
  if (savedItems) {
    const items = JSON.parse(savedItems);
    quantity = 0;

    items.forEach(itemData => {
      quantity++;
      const todoItem = createTodoItem(itemData.text, itemData.completed);
      todolist.appendChild(todoItem);
    });

    quantityField[0].textContent = quantity;
  }
}

// Add new item button handler
button[0].addEventListener('click', function() {
  let inputField = document.getElementsByTagName('input')[0];
  let inputText = inputField.value.trim();
  
  if (inputText === '') {
    alert('Please enter a task');
    return;
  }
  
  quantity++;
  quantityField[0].textContent = quantity;
  
  const todoItem = createTodoItem(inputText);
  todolist.appendChild(todoItem);
  saveItems();
  
  // Clear input field
  inputField.value = '';
  inputField.focus();
});

// Load items when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadItems();
});