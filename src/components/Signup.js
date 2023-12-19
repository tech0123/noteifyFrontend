import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { ModeContext } from '../context/ModeContext';
import { AlertContext } from '../context/AlertContext';
import { LoadingBarContext } from '../context/LoadingBarContext';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  let navigate = useNavigate();
  const { darkMode } = useContext(ModeContext);
  const { setAlertinfo } = useContext(AlertContext);
  const { setProgress } = useContext(LoadingBarContext);

  const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleSubmit = async (e) => {

    e.preventDefault();
    setProgress(10);

    if (cred.password !== cred.cpassword) {
      setAlertinfo({ message: "Password and Confirm Password Are Not Same", color: "danger" });
    }
    else {
      setProgress(70);

      const response = await fetch(`https://noteifybackend.onrender.com/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, cpassword: cred.cpassword }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authtoken)
        navigate("/home");
        setAlertinfo({ message: "Signedup Successfully", color: "success" });
      }
      else {
        setAlertinfo({ message: "User Already Exists With This Email", color: "danger" });
      }
      setProgress(100);
      setCred({ name: "", email: "", password: "", cpassword: "" });
    }

  }

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-5">
      <h2>Signup To Use Noteify</h2>

      <Form onSubmit={handleSubmit}>
        <div className='my-4'>

          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="name" type="text" placeholder="Enter name:" name='name' onChange={onChange} minLength={3} required value={cred.name} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="email" type="email" placeholder="Enter email:" name='email' onChange={onChange} required value={cred.email} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="password" type="password" placeholder="Enter password:" name='password' onChange={onChange} minLength={3} required value={cred.password} autoComplete="password" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="cpassword" type="password" placeholder="Enter confirm password:" name='cpassword' onChange={onChange} minLength={3} required value={cred.cpassword} autoComplete="cpassword" />
          </Form.Group>

          <Button variant={`${!darkMode ? 'dark' : 'light'}`} type="submit">Signup</Button>
        </div>

      </Form>
    </div>

  )
}

export default Signup
