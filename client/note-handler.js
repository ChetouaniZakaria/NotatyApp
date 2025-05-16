function updateNotesTable(noteId , noteTitle){
    const notesTable = document.getElementById('notes-table');
    
    // Clear the table before adding new rows   
    let countRows = notesTable.rows.length;

    for(i=countRows-1; i>0; i--){
        notesTable.deleteRow(i);
    }

    // while(--countRows){
    //     notesTable.deleteRow(countRows);
    // }

    getNotes(noteTitle).then(data => {
        data.forEach(note => {
            const row = notesTable.insertRow(1);
            row.setAttribute("Id", note._id);   ;
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            cell1.innerHTML = note.title;   
            cell2.innerHTML = note.content;
            cell3.innerHTML = note.updatedAt;
            cell4.innerHTML = `<a href="#"  > <img onclick="openEditModal('${note._id}')" src="./images/edit.png" style="width:20px" > </a>
                                <a href="#"  > <img onclick="confirmDeleteNote('${note._id}')" src="./images/delete.png" style="width:20px" > </a>`
        })
    }).then(() => {
        console.log("Notes table updated", noteId);
        if (noteId) {
            let row = notesTable.querySelector(`tr[Id="${noteId}"]`);
            row.setAttribute("style" ,  "animation : new-row 0.5s;");
        }
    });
}           


function searchNotes(){
    const searchTitle = document.getElementById('searchInput').value;
    updateNotesTable(undefined,searchTitle);
}

function confirmDeleteNote(noteId){
    const deleteNoteAction = confirm("Are you sure you want to delete this note?");
    if (deleteNoteAction) {
        deleteNote(noteId).then(() =>{
            updateNotesTable();
        })
        // alert("Note deleted successfully");
    } else {
        alert("Note not deleted");
    }
}