    import cors from 'cors';
    import bodyParser from 'body-parser';

    const app = express();  

    import Database from './Database.js';
    const db = new Database();

    

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //main route
    app.get('/',( req, res) => {  
        let json  = {health : true};
        if(json.health == true){
            res.send = json;
        }
        else {
            res.status(500).send('Server is not healthy');
        }
        
    }); 
    //Create a post API to be able to create a new note

    // let notes = [];

    app.post('/notes', (req, res) => {
        const body = req.body;
        console.log("BODY : ",body);
        db.addNote(body).then(data => {
            console.log("DATA : ",data);
            res.send(data);
        }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
        });
        // // Vérifier si Body est bien un tableau
        // if (Array.isArray(Body)) {
        //     Body.forEach(note => {
        //     if (note && note.title) { // S'assurer que la note et son titre existent
        //         notes.push(note.title);
        //     }
        //     });
        // } else if (Body && Body.title) { // Si Body est un seul objet note
        //     notes.push(Body.title);
        // }
    });


    //Create a get API to be able to get all notes
    app.get('/notes', (req, res) => {
        const {title} = req.query;
        if (title) {
            db.getNotesByTitle(title).then(data => {
            console.log("DATA by title : ",data);
            res.send(data);
             }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
             });
        }else {
            db.getNotes().then(data => {
            console.log("DATA : ",data);
            res.send(data);
             }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
            });
        }   
        // res.send(notes);
    });

    //Create a get API to be able to get a note by id
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        db.getNoteById(id).then(data => {
            console.log("Note : ", id ,data);
            if (!data) {
                return res.status(404).send('Note not found with this id : ' + id);
            }else {
                res.send(data);
            }
        }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
        });
    });

    //Create a update API to be able to update a note by id
    app.put('/notes', (req, res) => {
        // const id = req.params.id
        const body = req.body;
        db.updateNote(body).then(data => {
            if (!data) {
                return res.status(404).send('Note not found with this id : ' + id);
            }else {
                // db.addNote(body).then(data => {
                //     console.log("DATA : ",data);
                // res.send(data);}).catch(err => {
                //     console.error("Error : ",err);
                //     res.status(500).send(err);
                // });
                res.send(data);
            }
        }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
        });
    });

    //Create a delete API to be able to delete a note by id
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        db.deleteNote(id).then(data => {
            if (!data) {
                return res.status(404).send('Note not found with this id : ' + id);
            }else {
                res.send(data);
            }
        }).catch(err => {
            console.error("Error : ",err);
            res.status(500).send(err);
        });
    });


            
    const port = process.env.PORT || 3000;
    console.log("PORT : ",port);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        db.connect();
    });