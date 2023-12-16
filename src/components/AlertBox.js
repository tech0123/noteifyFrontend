import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';


const AlertBox = (props) => {
  
  // eslint-disable-next-line
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Scroll to the top of the page when the alert is shown
    if (show) {
      window.scrollTo(0, 0);
    }
  }, [show]);
    return (
      <Alert variant={props.color} onClose={() => setShow(false)} dismissible fixed="top">
        {props.message}
      </Alert>
    );

}

export default AlertBox
