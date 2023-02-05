import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../styles/WaitScreen.css';


export default function WaitingScreen(props) {

  // const [screen, setScreen] = useState(["https://win.gg/wp-content/uploads/2021/10/Pokemon-Unite.jpg", "https://objectifsmartphone.fr/wp-content/uploads/2021/07/pokemon-unite-lucario-and-team.jpg", "https://images2.alphacoders.com/116/1160159.png", "https://wallpapercave.com/wp/wp10659112.jpg"]);
  

  return (
      <Modal
        {...props}
        fullscreen={true}
        className="screen"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >




      
      <Modal.Body className="screen" style={{backgroundImage:"url(https://images2.alphacoders.com/116/1160159.png)", backgroundSize: "cover"}}>

        <h1 className='load-h1'>MyPokéFight</h1>

        <div className="prog-bar">
          <span class="bar">
            <span class="prog"></span>
          </span>
        </div>

      </Modal.Body>

      
    </Modal>
    
    );
}