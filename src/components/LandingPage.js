import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { ModeContext } from '../context/ModeContext';
import { useNavigate } from "react-router-dom";


const LandingPage = () => {


  let navigate = useNavigate();
  const { setDarkMode } = useContext(ModeContext);
  setDarkMode(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [])


  return (
    <div>
      <section className="d-flex align-items-center pt-lg-5 mt-lg-5 pb-1 pb-lg-5">

        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-lg-5 mt-lg-4  mt-5 p-4 pt-5 " >
              <img src="/img.svg" alt="not found" className='img-fluid' />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-lg-start p-lg-3 mt-lg-5 pt-1 ">
              <h2 className='font-monospace text-uppercase'>Unleash Your Productivity</h2>
              <h6 className='font-monospace '> Notes at Your Fingertips</h6>

              <div>
                <div className="text-center text-lg-start">
                  <Button as={Link} to="/signup" variant="dark" className='p-2 mt-2 px-3'>Get Started <i className="bi bi-arrow-right"></i></Button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  )
}

export default LandingPage
