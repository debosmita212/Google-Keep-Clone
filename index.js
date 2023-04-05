const addTitle = document.getElementById("addTitle");
const addText = document.getElementById("addText");
const addNoteButton = document.getElementById("addNote");
const notesDiv = document.getElementById("notes");
/*

//local storage vs session storage
//local storage stores the data and transforms it using JSON
*/

showNotes();

//adding the notes into array
function addNotes() {
  let notes = localStorage.getItem("notes");

  //not getting the notes arrray from localstorage
  if (notes === null) {
    notes = [];
  } else {
    //parse it
    notes = JSON.parse(notes);
  }

  if (addText.value === "") {
    alert("Please add a note!");
    return;
  }

  const noteObj = {
    title: addTitle.value,
    text: addText.value,
    dueDate: document.getElementById("dueDate").value,
    creationTime:new Date()
  };
  //Reinitialize them
  addTitle.value = "";
  addText.value = "";
  document.getElementById("dueDate").value = "";
  notes.push(noteObj);
  //update it
  localStorage.setItem("notes", JSON.stringify(notes));

  showNotes();

  //schedule notification if due date is set
  if(noteObj.dueDate){
    const dueDateTime=new Date(noteObj.dueDate).getTime()
    const currentTime=new Date().getTime()
    const timeUntilDue=dueDateTime-currentTime

    if(timeUntilDue>0){
      setTimeout(function(){
        alert(`Reminder: ${noteObj.title}`)
      },timeUntilDue)
    }
  }
}

//showing the notes
function showNotes(sortBy="creationTime",filterBy=null) {
  let notesHTML = "";
  let notes = localStorage.getItem("notes");
  //edge case
  //not getting the notes arrray from localstorage
  if (notes === null) {
    notes = [];
  } else {
    //parse it
    notes = JSON.parse(notes);
  }

  //Sorting
  notes=notes.sort((a,b)=>{
    if(sortBy==="creationTime"){
      return new Date(b.creationTime)-new Date(a.creationTime)
    }
    else if(sortBy==="dueDate"){
      return new Date(b.dueDate)-new Date(a.dueDate)
    }
    else if(sortBy==="title"){
      return a.title.localeCompare(b.title)
    }
  })
  //Filtering
  if(filterBy!==null){
    notes=notes.filter((note)=>{
      note.title.toLowerCase().includes(filterBy.toLowerCase())
    })
  }
  for (let i = 0; i < notes.length; i++) {
    notesHTML += `<div class="note">
    <div class="buttons">
    <button class="editNote" id=${i} onclick="editNote(${i})" >Edit</button>
    <button class="archiveNote" id=${i} onclick="archiveNote(${i})" >Archive</button>
        <button class="deleteNote" id=${i} onclick="deleteNote(${i})" >Delete</button>
        
        </div>
        <div class="title">${
          notes[i].title === "" ? "Note" : notes[i].title
        }</div>
        <div class="text">${notes[i].text}</div>
    </div>`;
  }
  notesDiv.innerHTML = notesHTML;
}
//delete the notes
function deleteNote(ind) {
  let notes = localStorage.getItem("notes");
  //edge case
  //not getting the notes arrray from localstorage
  if (notes === null) {
    notes = [];
  } else {
    //parse it
    notes = JSON.parse(notes);
  }

  let deletedNotes = localStorage.getItem("deletedNotes");
  if (deletedNotes === null) {
    deletedNotes = [];
  } else {
    deletedNotes = JSON.parse(deletedNotes);
  }
  deletedNotes.push(notes[ind]);
  notes.splice(ind, 1);
  //update it
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));

  showNotes();
}

//archive the notes
function archiveNote(ind) {
  let notes = localStorage.getItem("notes");
  //edge case
  //not getting the notes arrray from localstorage
  if (notes === null) {
    notes = [];
  } else {
    //parse it
    notes = JSON.parse(notes);
  }

  let archivedNotes = localStorage.getItem("archivedNotes");
  if (archivedNotes === null) {
    archivedNotes = [];
  } else {
    archivedNotes = JSON.parse(archivedNotes);
  }
  archivedNotes.push(notes[ind]);
  notes.splice(ind, 1);
  //update it
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("archivedNotes", JSON.stringify(archivedNotes));

  showNotes();
}

// Function to display the current title and text as editable fields
function editNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes"));
  let note = notes[index];
  let titleField = document.createElement("input");
  titleField.type = "text";
  titleField.value = note.title;
  titleField.placeholder = "Title";
  let textField = document.createElement("textarea");
  textField.value = note.text;
  textField.placeholder = "Text";
  let saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.addEventListener("click", function () {
    let newTitle = titleField.value.trim();
    let newText = textField.value.trim();
    if (newTitle !== "" || newText !== "") {
      note.title = newTitle || note.title;
      note.text = newText || note.text;
      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes();
    }
    closeEditFields();
  });
  let cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.addEventListener("click", closeEditFields);
  let editFields = document.createElement("div");
  editFields.classList.add("edit-fields");
  editFields.appendChild(titleField);
  editFields.appendChild(textField);
  editFields.appendChild(saveButton);
  editFields.appendChild(cancelButton);
  let noteDiv = document.querySelector(`#notes .note:nth-child(${index + 1})`);
  noteDiv.appendChild(editFields);
  titleField.focus();

  function closeEditFields() {
    editFields.remove();
  }
}

addNoteButton.addEventListener("click", addNotes);
