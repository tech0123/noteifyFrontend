import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { ModeContext } from '../context/ModeContext';
import NoteContext from '../context/NoteContext';

const AddNote = () => {

    const { darkMode } = useContext(ModeContext);
    const { addNote } = useContext(NoteContext);

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-5">
            <h1>Add Notes</h1>

            <Form>
                <div className='my-4'>

                    <Form.Group className="mb-3">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="title" type="text" placeholder="Enter title:" name='title' onChange={onChange} minLength={3} required value={note.title} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="description" type="text" placeholder="Enter description:" name='description' onChange={onChange} minLength={3} required value={note.description} />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Tag:</Form.Label>
                        <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="tag" type="text" placeholder="Enter tag:" name='tag' onChange={onChange} minLength={3} required value={note.tag} />
                    </Form.Group>

                    <Button disabled={note.title.length < 3 || note.description.length < 3 || note.tag.length < 3} variant={`${!darkMode ? 'dark' : 'light'}`} type="submit" onClick={handleAddNote} >Add Note</Button>
                </div>

            </Form>
        </div>
    )
}

export default AddNote
