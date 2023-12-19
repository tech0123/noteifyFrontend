import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react'
import { ModeContext } from '../context/ModeContext';
import { useNavigate } from "react-router-dom";
import { AlertContext } from '../context/AlertContext';
import { LoadingBarContext } from '../context/LoadingBarContext';


const Login = () => {

    let navigate = useNavigate();
    const { darkMode } = useContext(ModeContext);
    const { setAlertinfo } = useContext(AlertContext);
    const { setProgress } = useContext(LoadingBarContext);


    const [cred, setCred] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();
        setProgress(10);


        setProgress(70);
        const response = await fetch(`https://noteifybackend.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ email: cred.email, password: cred.password }),
        });


        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/home");
            setAlertinfo({ message: "Logged in Successfully", color: "success" });
        }
        else {
            setAlertinfo({ message: "Invalid Credentials", color: "danger" });
        }
        setProgress(100);
        setCred({ email: "", password: "" });
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-5">
            <h2>Login To Continue With Noteify</h2>

            <Form onSubmit={handleSubmit}>
                <div className='my-4'>

                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="email" type="email" placeholder="Enter email:" name='email' onChange={onChange} required value={cred.email} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control className={`bg-${darkMode ? 'dark' : 'light'} text-${!darkMode ? 'dark' : 'light'} border border-${darkMode ? 'dark' : 'light'}`} id="password" type="password" placeholder="Enter password:" name='password' onChange={onChange} minLength={3} required value={cred.password} autoComplete="password" />
                    </Form.Group>

                    <Button variant={`${!darkMode ? 'dark' : 'light'}`} type="submit">Login</Button>
                </div>

            </Form>
        </div>
    )

}

export default Login
