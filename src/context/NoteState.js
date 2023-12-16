import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

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

  }


  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
