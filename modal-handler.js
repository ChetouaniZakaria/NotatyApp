
function openAddModal(){

    // Clear previous modal 
    clearAddModal()

    const modal = document.getElementById('addNoteModal');
    modal.style.display = 'block';

    let closeButton = document.getElementById("closeAdd");

    closeButton.onclick = () => {
        modal.style.display = 'none';
    }

    let cancelButton = document.getElementById("cancelAddNoteBtn");

    cancelButton.onclick = () => {
        modal.style.display = 'none';
    }
}

function clearAddModal(){
    document.getElementById('addTitle').value = "";
    document.getElementById('addContent').value = "";
    document.getElementById('addError').innerHTML = "";
}

function saveNewNote(){
    let titleStr = document.getElementById('addTitle').value;
    let contentStr = document.getElementById('addContent').value;

    const noteData = {
        title: titleStr,
        content: contentStr
    };

    addNote(noteData).then(response => {
        if (response.ok) {
            alert("Note added successfully");
            const modal = document.getElementById('addNoteModal');
            modal.style.display = 'none';
            response.json().then(data => {
                newNoteId = data._id;
                updateNotesTable(newNoteId);
            });
        } else {
            response.text().then(error => {
                document.getElementById('addError').innerHTML = error;
            });
        }
    }).catch(error => {
        console.error('Error:', error);
        // document.getElementById('addError').innerHTML = error;
    });
    
}  

function openEditModal(noteId){
    const modal = document.getElementById('editNoteModal');
    modal.style.display = 'block';

    let closeButton = document.getElementById("closeEdit");

    closeButton.onclick = () => {
        modal.style.display = 'none';
    }

    let cancelButton = document.getElementById("cancelEditNoteBtn");
    cancelButton.onclick = () => {
        modal.style.display = 'none';
    }
    loadNotedata(noteId);

}

function loadNotedata(noteId){
    let modal = document.getElementById('editNoteModal');
    // const noteIdAttribute = modal.createAttribute("noteId");
    // noteIdAttribute.value = noteId;
    // modal.setAttributeNode(noteIdAttribute);
    modal.setAttribute("noteId", noteId);

    getNoteById(noteId).then(note => {
        document.getElementById('editTitle').value = note.title;
        document.getElementById('editContent').value = note.content;
    }).catch(error => {
        console.error('Error:', error);
    });
}

function saveEditNote(){
    const titleStr = document.getElementById('editTitle').value;
    const contentStr = document.getElementById('editContent').value;
    const modal = document.getElementById('editNoteModal');
    const noteId = modal.getAttribute("noteId");

    const noteData = {
        _id: noteId,
        title: titleStr,
        content: contentStr
    };

    updateNote(noteData).then(response => {
        if (response.ok) {
            alert("Note updated successfully");
            const modal = document.getElementById('editNoteModal');
            modal.style.display = 'none';
            updateNotesTable(noteId);
        
        } else {
            response.text().then(error => {
                document.getElementById('editError').innerHTML = error;
            });
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}