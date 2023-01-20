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
      scrollable="true"

    >

      <div className={props.type}>


        <Modal.Header closeButton >
          <Modal.Title id="contained-modal-title-vcenter">

          </Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <div className="card mb-3" >
            <div className="row g-0">
              <div className="col-md-4" id="modal-col">
                <img className="img-modal" src={props.img} alt=""></img>
                <img className="img-modal" src={props.img2} alt=""></img>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{props.name}</h2>
                  <p className="card-text">Taille: {props.height} m <br></br>
                    Poids: {props.weight} kg</p>
                  <br></br>

                  <div className='progress-stats'>
                    {/* <p>Hp:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/7037/7037210.png' alt='' /><br></br>
                    <ProgressBar animated variant='success' now={props.stathp} label={`${props.stathp}`} />

                    <br></br>
                    {/* <p>Attaque:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/2746/2746914.png' alt='' /><br></br>
                    <ProgressBar animated variant='danger' now={props.statattack} label={`${props.statattack}`} />
                    <br></br>
                    {/* <p>Speed:</p> */}
                    <img src='https://cdn-icons-png.flaticon.com/512/7154/7154506.png' alt='' /><br></br>
                    <ProgressBar animated variant='info' now={props.statspeed} label={`${props.statspeed}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </div>
    </Modal>
  );
}