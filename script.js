// selecting DOM elements
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');

//loading notes from localstorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

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




function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}