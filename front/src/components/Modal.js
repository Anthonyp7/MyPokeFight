import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../styles/PokemonColors.css'
import '../styles/Liste.css'

export default function ModalTest(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
      <div className={props.type}>


        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">
            {/* {props.name} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <div className="card mb-3" >
            <div className="row g-0">
              <div className="col-md-4" id="modal-col">
                <img className="img-modal" src={props.img} alt=""></img>
                {/* <img className="img-modal" src={props.img2} alt=""></img> */}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{props.name}</h3>
                  <p className="card-text">Height: {props.height} m <br></br>
                    Weight: {props.weight} kg</p>
                  <br></br>

                  <div className='progress-stats'>
                    {/* <p>Hp</p> */}
                    <ProgressBar animated variant='success' now={props.stathp} label={`${props.stathp}`} />
                    <br></br>
                    {/* <p>Attack</p> */}
                    <ProgressBar animated variant='danger' now={props.stathp} label={`${props.statattack}`} />
                    <br></br>
                    {/* <p>Speed</p> */}
                    <ProgressBar animated variant='info' now={props.statspeed} label={`${props.statspeed}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </div>
    </Modal>
  );
}

