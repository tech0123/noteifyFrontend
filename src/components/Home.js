import React from 'react'
import Notes from './Notes';


const Home = ({ setAlert }) => {

  return (
    <div>
      <Notes setAlert={setAlert} />
    </div>
  )
}

export default Home
