import { useContext, useState } from 'react';
import NoteContext from './NoteContext';
import { AlertContext } from './AlertContext';


const NoteState = (props) => {
  
  const { setAlertinfo } = useContext(AlertContext);
  
  const host = "https://noteifybackend.onrender.com";

  const notesInitial = []

  const [notes, setnotes] = useState(notesInitial)


  const getAllNotes = async () => {

    const response = await fetch(`${host}/api/notes/readnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });

    const json = await response.json();
    setnotes(json);
  }


  const addNote = async (title, description, tag) => {

    await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),

    });

    getAllNotes();

    setAlertinfo({ message: "Note Updated Successfully", color: "success" });

  }

  const deleteNote = async (id) => {

    await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });

    getAllNotes();
    setAlertinfo({ message: "Note Deleted Successfully", color: "success" });
  }




  const editNote = async (id, title, description, tag) => {

    await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    getAllNotes();
    setAlertinfo({ message: "Note Updated Successfully", color: "success" });
  }


  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
