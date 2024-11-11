// selecting DOM elements
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');

//loading notes from localstorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
renderNotes();


//function to render notes 
function renderNotes() {
    notesContainer.innerHTML= '';
    notes.forEach((note, index)=>{
        const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML=`
            <span class="note-content" contenteditable="false">${note}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            //event listener for delete button
            noteElement.querySelector('.deleteBtn').addEventListener('click', () => {
                deleteNote(index)
            })

            //Event listener for edit button
            noteElement.querySelector('.editBtn').addEventListener('click',(e)=>{
                toggleEditMode(e,index)
            })
    })
}

addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if(noteText){
        notes.push(noteText);
        saveNotes();
        renderNotes();
        noteInput.value='';
    }
})

// function to delete
function deleteNote(index){
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// function to edit
function toggleEditMode(event,index) {
    event.stopPropogation();
    const noteElement = event.target.closest('.note');
    const noteContent = noteElement.querySelector('.note-content');

    if(noteContent.isContentEditable) {
        notes[index]=noteContent.textContent.trim();
        saveNotes();
        noteContent.contentEditable="false";
        event.target.textContent='Edit';
    }else{
         noteContent.contentEditable="true";
         noteContent.focus();
         event.target.textContent='Save';
    }

    noteContent.contenteditable=!noteContent.contenteditable 
}


function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}


// synchronous code
console.log('Start');

for(let index=0; index<10; index++){
    console.log('index', index);
}
console.log('End');

// Asynchronous code
console.log('start');
setTimeout(() =>{
    console.log('Task is finished');
}, 5000);

console.log('End');

// Creating a promise using a constructor
const number = new Promise((resolve, reject) => {
    if (5<4) {
        resolve('Resolved, Condition is True');
    }else{
        reject('Rejected, Condition is False');
    }
});

// Handling The promise
//checkNumber.then((message)=> {
  //  console.log('then', message);
//}).catch((error) => {
   // console.log('Error', error); 
//});

// Function that returns a promise based on the value of input number
function checkNumber(num) {
    return new Promise((resolve, reject) => {
        if (num>100) {
            const data = {
                msg: 'Resolved',
                statuscode: 200,
                value: num
            };
            resolve(data);
        }else {
            reject('The number is too small');
        }
    });
}

// Calling the checknumber fuction with number 100
checkNumber(100).then((e)=>{
    console.log(e); 
}).catch((error)=>{
    console.log(error);
    
});

const apiUrl= 'https://jsonplaceholder.typicode.com/users';

// To fetch data from API
fetch(apiUrl)
    .then((res)=>res.json()) // To convert the response to JSON format
    .then((data)=>console.log('data', data)) 
    .catch((error)=>console.log('error', error)) //Handle error that occur during fetch
    


