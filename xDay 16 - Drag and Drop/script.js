const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Assignment Work', 'Complete Journal'];
    progressListArray = ['Work on projects', 'Watch Left Lectures'];
    completeListArray = ['Web Series', 'Walk 1500 Steps'];
    onHoldListArray = ['Sleep at least 8 Hours'];
  }
}

getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray,progressListArray,completeListArray,onHoldListArray];
  const arrayNames = ['backlog','progress','complete','onHold'];
  arrayNames.forEach((arr,index) =>{
    localStorage.setItem(`${arr}Items`,JSON.stringify(listArrays[index]));
  });

}

// filter Array to remove empty items
function filterArray(arr){
  const filteredArray = arr.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);

  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart','drag(event)');

  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout',`updateItem(${index},${column})`);

  //Append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((item,index) =>{
    createItemEl(backlogList,0,item,index);
  });
  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((item,index) =>{
    createItemEl(progressList,1,item,index);
  });
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((item,index) =>{
    createItemEl(completeList,2,item,index);
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((item,index) =>{
    createItemEl(onHoldList,3,item,index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();

}

// update item - delete if neccessary or update array value if values are different
function updateItem(id,column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if(!dragging) {
    if(!selectedColumnEl[id].textContent)
  {
    // delted item from array
    delete selectedArray[id];
  }
  else {
    selectedArray[id] = selectedColumnEl[id].textContent;
  }
  updateDOM();

  }
}


// add to column list , reset TextBox
function addTocolumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();

}

//  Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';

}
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';

  addTocolumn(column);

}

// Allows array to reflect Drag and Drop items
function rebuildArrays() {
  backlogListArray = [];
  for(let i = 0;i<backlogList.children.length;i++)
  {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  progressListArray = [];
  for(let i = 0;i<progressList.children.length;i++)
  {
    progressListArray.push(progressList.children[i].textContent);
  }
  completeListArray = [];
  for(let i = 0;i<completeList.children.length;i++)
  {
    completeListArray.push(completeList.children[i].textContent);
  }
  onHoldListArray = [];
  for(let i = 0;i<onHoldList.children.length;i++)
  {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }
  updateDOM();
}

// Drag function - when item start dragging
function drag(event) {
  draggedItem = event.target;
  // console.log('draggedItem ',draggedItem);
  dragging = true;
}

// drop enter function - when item enters column area
function dragEnter(column) {
  // console.log(listColumns[column]);
  listColumns[column].classList.add('over');
  currColumn = column;
}

// column allows for item to drop
function allowDrop(event) {
  event.preventDefault();

}

//Dropping Item in Column
function drop(event) {
  event.preventDefault();
  // remove background color and padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });
  // add item to column
  const parent = listColumns[currColumn];
  parent.appendChild(draggedItem);
  // dragging complete
  dragging = false;
  rebuildArrays();
}


// on load 
updateDOM();