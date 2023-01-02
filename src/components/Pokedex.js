// import React, { useState, useEffect } from 'react';

export default function Pokedex(){

    // function RandomPoke(pokemax) {

    //   var rand = Math.floor((Math.random() * pokemax) + 1);
    //   document.getElementById('test').value = rand;

      
    //     <div>
    //         <input type="text" id="test" name="tb" />
    //     </div>
    // }
    
   


      return (
        <div>
            <h1 className="load-h1">Mon Pokedex</h1>

           
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

{/*         
            <form name="rn">
                
                <input type="button" value="Random Number!" onclick={RandomPoke(10)} />
            </form> */}

        </div>
      );

}