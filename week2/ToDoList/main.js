let todolist = document.getElementById('todolist');
let quantityField = document.getElementsByClassName('counter');
let button = document.getElementsByTagName('button');
let quantity = 0;


function save() {
  let items = [];
  const list = todolist.querySelectorAll('li');
  list.forEach((item, index) => {
    const contentDiv = item.querySelector('div > div');
    const checkbox = item.querySelector('input[type="checkbox"]');

    items.push({
      id: index,
      text: contentDiv.textContent,
      status: checkbox.checked ? 'completed' : 'active'
    });
  });

  localStorage.setItem('To-do items', JSON.stringify(items));
}

// function load() {
//   const savedItems = localStorage.getItem('To-do items');
//   if (savedItems) {
//     const items = JSON.parse(savedItems);
//     quantity = 0;

//     items.forEach(item => {
//       quantity++;
//       let item = document.createElement('li');
//       let itemContainer = document.createElement('div');

//       let deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';

//       let checkbox = document.createElement('input');
//       checkbox.setAttribute('type', 'checkbox');
//       checkbox.checked = item.completed;

//       let content = document.createElement('div');
//       content.textContent = item.text;

//       if (item.completed)
//     });
//   }
// }

button[0].addEventListener('click', function () {
  quantity++;
  let item = document.createElement('li');
  let itemContainer = document.createElement('div');

  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  
  checkbox.addEventListener('change', function () { 
    if (this.checked) {
      content.style.textDecoration = 'line-through';
    } else {
      content.style.textDecoration = 'none';
    }
  });

  let inputText = document.getElementsByTagName('input')[0].value;
  let content = document.createElement('div');
  content.textContent = inputText;
  
  itemContainer.appendChild(content);
  itemContainer.appendChild(deleteButton);
  itemContainer.appendChild(checkbox);
  item.appendChild(itemContainer);
  todolist.appendChild(item);

  deleteButton.addEventListener('click', function () {
    if (window.confirm('Do you want to delete this item?')) {
      item.remove();
      quantity--;
      quantityField[0].textContent = quantity;
    }
  });

  quantityField[0].textContent = quantity;
  // document.getElementsByTagName('input')[0].value = '';
});







