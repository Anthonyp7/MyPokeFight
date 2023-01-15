// const { FifoMatchmaker } = require('matchmaking');

// const CreateMatch = () => {
//     try {
//         const userid = req.body.id;

//         function runGame(players) {
//             console.log("Game started with:");
//             console.log(players);
//         }
          
//         let mm = new FifoMatchmaker(runGame, { checkInterval: 2000 });
        
//         let player1 = { id:1 }
//         let player2 = { id:2 }
        
//         // Players join match queue
//         mm.push(player1);
//         mm.push(player2);
        
//         // When there are enough players, runGame will be called
        
//         // Game started with:
//         // [ {id:1}, {id:2} ]
          
//     } catch (error) {
//         res.status(500).send("Une erreur est survenue");
//         console.log('error', error);
//     }
    
// }


// module.exports ={
//     CreateMatch
// }
