// const baseUrl = "http://localhost:3000";
const baseUrl = "https://notatyapp2.onrender.com"; 

async function addNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(noteData),
    });
    return response;
}

async function updateNote(noteData) {
    const response = await fetch(`${baseUrl}/notes`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(noteData),
    });
    return response;
}

async function deleteNote(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`, {
        method: 'DELETE',
    });
    return response;
}

async function getNotes(noteTitle) {

    let url = `${baseUrl}/notes`;
    if (noteTitle){
        url = url + `?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();
}

async function getNoteById(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`);
    return response.json();
}