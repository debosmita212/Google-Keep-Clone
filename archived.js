const archivedNotesDiv = document.getElementById("archived-notes");

let archivedNotes = localStorage.getItem("archivedNotes");
if (archivedNotes === null) {
  archivedNotes = [];
} else {
  archivedNotes = JSON.parse(archivedNotes);
}

//displaying on page
let archivedNotesHTML = "";
for (let i = 0; i < archivedNotes.length; i++) {
  archivedNotesHTML += `<div class="note">
    <button class="restoreNote" id="${i}" onclick="restoreNote(${i})">Restore</button>
    <div class="title">${
      archivedNotes[i].title === "" ? "Note" : archivedNotes[i].title
    }</div>
    <div class="text">${archivedNotes[i].text}</div>
</div>
    `;
}
archivedNotesDiv.innerHTML=archivedNotesHTML

//restoration
function restoreNote(ind){
    let notes=localStorage.getItem("notes")
    if(notes===null){
        notes=[]
    }
    else{
        notes=JSON.parse(notes)
    }
    notes.push(archivedNotes[ind])
    localStorage.setItem("notes",JSON.stringify(notes))
    archivedNotes.splice(ind,1)
    localStorage.setItem("archivedNotes",JSON.stringify(archivedNotes))
    location.reload()
}
