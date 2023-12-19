import React, { useContext } from 'react'
import { ModeContext } from '../context/ModeContext';
import Card from 'react-bootstrap/Card';
import NoteContext from '../context/NoteContext';

const NoteItem = (props) => {

  const { notes, updatenote } = props;
  const { darkMode } = useContext(ModeContext);
  const { deleteNote } = useContext(NoteContext);


  return (
    <div className="col-md-4 my-3">

      <Card className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'}`}>
        <Card.Body>
          <div className='d-flex justify-content-between '>
            <Card.Title>{notes.title}</Card.Title>
            <span>
              <i className="bi bi-pencil-square m-1 text-primary" onClick={() => { updatenote(notes) }}></i>
              <i className="bi bi-trash m-1 text-danger" onClick={() => {
                deleteNote(notes._id);
              }}></i>
            </span>
          </div>
          <Card.Text className='fs-6 text-secondary'>{notes.tag}</Card.Text>
          <Card.Text >{notes.description} </Card.Text>


        </Card.Body>
      </Card>

    </div>
  )
}

export default NoteItem
