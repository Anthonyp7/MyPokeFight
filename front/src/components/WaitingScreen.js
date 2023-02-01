import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


export default function WaitingScreen(props) {

  const [screen, setScreen] = useState(["https://win.gg/wp-content/uploads/2021/10/Pokemon-Unite.jpg", "https://objectifsmartphone.fr/wp-content/uploads/2021/07/pokemon-unite-lucario-and-team.jpg", "https://images2.alphacoders.com/116/1160159.png", ""]);
  

  return (
      <Modal
        {...props}
        fullscreen={true}
        className="screen"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

      

      
      <Modal.Body className="screen" style={{backgroundImage:"url(https://images2.alphacoders.com/116/1160159.png)", backgroundSize: "cover"}}>

        
      </Modal.Body>

      
    </Modal>
    
    );
}