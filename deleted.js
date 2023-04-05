const deletedNotesDiv = document.getElementById("deleted-notes");

let deletedNotes = localStorage.getItem("deletedNotes");
if (deletedNotes === null) {
  deletedNotes = [];
} else {
  deletedNotes = JSON.parse(deletedNotes);
}

//displaying on page
let deletedNotesHTML = "";
for (let i = 0; i < deletedNotes.length; i++) {
  deletedNotesHTML += `<div class="note">
    <button class="restoreNote" id="${i}" onclick="restoreNote(${i})">Restore</button>
    <div class="title">${
      deletedNotes[i].title === "" ? "Note" : deletedNotes[i].title
    }</div>
    <div class="text">${deletedNotes[i].text}</div>
</div>
    `;
}
deletedNotesDiv.innerHTML=deletedNotesHTML

//restoration
function restoreNote(ind){
    let notes=localStorage.getItem("notes")
    if(notes===null){
        notes=[]
    }
    else{
        notes=JSON.parse(notes)
    }
    notes.push(deletedNotes[ind])
    localStorage.setItem("notes",JSON.stringify(notes))
    deletedNotes.splice(ind,1)
    localStorage.setItem("deletedNotes",JSON.stringify(deletedNotes))
    location.reload()
}
