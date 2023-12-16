import React, { useContext, useEffect, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../context/NoteContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModeContext } from '../context/ModeContext';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";



const Notes = ({ setAlert }) => {

    let navigate = useNavigate();

    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;

    const { darkMode } = useContext(ModeContext);
    const { editNote } = useContext(NoteContext);

    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const handleEditNote = (e) => {
        e.preventDefault();
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        handleClose();
        setAlert({ message: "Note Updated Successfully", color: "success" });
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if(localStorage.getItem('token'))
{
    getAllNotes();
}
else
{
    navigate("/login");
}
        
        // eslint-disable-next-line
    }, [])

    const updatenote = (notes) => {
        handleShow();
        setnote({ eid: notes._id, etitle: notes.title, edescription: notes.description, etag: notes.tag });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }



    return (
        <>
            <AddNote setAlert={setAlert}/>

            <Modal show={show} onHide={handleClose}  >
                <Modal.Header closeButton style={{ backgroundColor: darkMode ? '#2D4356' : '#ede7de', border: 0 }}>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: darkMode ? '#2D4356' : '#ede7de', border: 0 }} className={`text-${!darkMode ? 'dark' : 'light'}`}>
                    <Form>
                        <div>

                            <Form.Group className="mb-3">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="etitle" type="text" placeholder="Enter title:" name='etitle' onChange={onChange} value={note.etitle} minLength={3} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="edescription" type="text" placeholder="Enter description:" name='edescription' onChange={onChange} value={note.edescription} minLength={3} required />
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Tag:</Form.Label>
                                <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="etag" type="text" placeholder="Enter tag:" name='etag' onChange={onChange} value={note.etag} minLength={3} required />
                            </Form.Group>


                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: darkMode ? '#2D4356' : '#ede7de', border: 0 }}>
                    <Button disabled={note.etitle.length<3 || note.edescription.length<3 || note.etag.length<3} variant={`${!darkMode ? 'dark' : 'light'}`} onClick={handleEditNote}>Update Note</Button>
                </Modal.Footer>
            </Modal>




            <div className="row my-5">
                <h1>Your Notes</h1>
                <div className="my-1">
                    <h5 className='text-secondary'>{notes.length === 0 && "Welcome Add Your Notes!"}</h5>
                </div>
                {
                    notes.map((notes) => {
                        return <NoteItem notes={notes} updatenote={updatenote} setAlert={setAlert} key={notes._id} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes
