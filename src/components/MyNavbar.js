import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from "react-router-dom";
import { ModeContext } from '../context/ModeContext';
import { useNavigate } from "react-router-dom";


const MyNavbar = ({ onDarkModeToggle }) => {

    let location = useLocation();
    let navigate = useNavigate();

    const { darkMode, setDarkMode } = useContext(ModeContext);

    const toggleIcon = () => {
        setDarkMode(!darkMode)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    useEffect(() => {

        if (darkMode) {
            document.body.style.backgroundColor = '#2D4356'; // Change this to your desired dark mode background color
            document.body.style.color = '#fff'; // Change this to your desired text color for dark mode

        } else {
            document.body.style.backgroundColor = '#ede7de'; // Reset to the default background color
            document.body.style.color = ''; // Reset to the default text color
        }

        onDarkModeToggle && onDarkModeToggle(darkMode);

    }, [darkMode, onDarkModeToggle]);

    return (

        <div>

            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme={`${darkMode ? 'dark' : 'light'}`}>
                <Container fluid>
                    <Navbar.Brand><Nav.Link as={Link} to="/" className='font-monospace text-center'><i className="bi bi-journal-text mx-2 p-0" ></i><span className=''>Noteify</span></Nav.Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {
                                localStorage.getItem('token') &&
                                <>
                                    <Nav.Link as={Link} to="/home" className={`mynav ${location.pathname === "/Home" ? "active" : ""}`} >Home</Nav.Link>
                                </>
                            }
                            <Nav.Link as={Link} to="/about" className={`mynav ${location.pathname === "/About" ? "active" : ""}`} >About</Nav.Link>

                        </Nav>
                        {
                            location.pathname !== "/" &&

                            <Button variant="" style={{ border: 'none' }} onClick={toggleIcon}>
                                <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon'} fs-4`}></i>
                            </Button>
                        }



                        {
                            !localStorage.getItem('token') ?
                                <Form className="d-flex">
                                    {location.pathname !== "/login" &&
                                        <Button variant={`outline-${!darkMode ? 'dark' : 'light'}`} className='mx-1' as={Link} to="/login">Login</Button>
                                    }
                                    {location.pathname !== "/signup" &&
                                        <Button variant={`outline-${!darkMode ? 'dark' : 'light'}`} className='mx-1' as={Link} to="/signup">Signup</Button>
                                    }
                                </Form> : <Form className="d-flex">
                                    <Button variant={`outline-${!darkMode ? 'dark' : 'light'}`} className='mx-1' onClick={handleLogout}>Logout</Button>
                                </Form>
                        }


                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>

    )
}

export default MyNavbar
