import mongoose from 'mongoose';
import Note from './schemas/note.js';


class Database {
    constructor() {
        // this.Url = 'mongodb://localhost:27017/Notaty'; 
        this.Url = process.env.MONGODB_URL || 'mongodb+srv://admin:geoinfo@clusternotaty.gzzvhyu.mongodb.net/Notaty?retryWrites=true&w=majority&appName=ClusterNotaty';
    }
// chetouanizakaria1
// geoinfo
    connect() {
        mongoose.connect(this.Url)
            .then(() => {
                console.log('Connected  successfully to Mo  ngoDB !!');
            })
            .catch(err => {
                console.error('Could not connect to MongoDB :: ', err);
            });
    }

    addNote(note) {
        return new Promise((resolve, reject) =>{
            let newNote = new Note(note);
            newNote.save()
                .then((doc) => {
                    // console.log('Note saved successfully', doc);
                    resolve(doc);
                })
                .catch(err => {
                    // console.error('Error saving note: ', err);
                    reject(err);
                });
        })
        
    }

    getNotes(){
        return new Promise((resolve, reject) => {
            Note.find({})
                .then((data) => {
                    // console.log('Notes retrieved successfully', docs);
                    resolve(data);
                })
                .catch(err => {
                    // console.error('Error retrieving notes: ', err);
                    reject(err);
                });
        })
    }

    getNoteById(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id)
                .then((data) => {
                    // console.log('Note retrieved successfully', doc);
                    resolve(data);
                })
                .catch((err) => {
                    // console.error('Error retrieving note: ', err);
                    reject(err);
                });
        })
    }

    updateNote(note) {
        return new Promise((resolve, reject) => {
            note.updatedAt = new Date();
            Note.findByIdAndUpdate(note._id, note).
                then((data) => {
                    console.log('Note updated successfully', data);
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }

    deleteNote(id) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(id)
                .then((data) => {
                    console.log('Note deleted successfully', data);
                    resolve(data);
                })
                .catch((err) => {
                    console.error('Error deleting note: ', err);
                    reject(err);
                });
        })
    }

    getNotesByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            const regex = new RegExp(noteTitle, 'i');
            Note.find({ title: regex })
                .then((data) => {
                    console.log('Notes retrieved successfully', data);
                    resolve(data);
                })
                .catch(err => {
                    // console.error('Error retrieving notes: ', err);
                    reject(err);
                });
    })
    }
}

export default Database;
