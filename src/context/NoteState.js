import { useContext, useState } from 'react';
import NoteContext from './NoteContext';
import { AlertContext } from './AlertContext';
import { LoadingBarContext } from '../context/LoadingBarContext';


const NoteState = (props) => {
  
  const { setAlertinfo } = useContext(AlertContext);
  const { setProgress } = useContext(LoadingBarContext);


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
    setProgress(100);
  }


  const addNote = async (title, description, tag) => {
    
    setProgress(10);
    setProgress(65);
    await fetch(`${host}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),

    });

    getAllNotes();

    setTimeout(() => {
      setAlertinfo({ message: "Note Added Successfully", color: "success" });
    }, 900);
    

  }

  const deleteNote = async (id) => {
    setProgress(10);
    setProgress(65);
    await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });

    getAllNotes();

    setTimeout(() => {
      setAlertinfo({ message: "Note Deleted Successfully", color: "success" });
      
    }, 900);
  }




  const editNote = async (id, title, description, tag) => {
    setProgress(10);
    setProgress(65);
    await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    getAllNotes();

    setTimeout(() => {
      setAlertinfo({ message: "Note Updated Successfully", color: "success" });
    }, 900);
  }


  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
