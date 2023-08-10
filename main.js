//rendering message module
const ScreenUI =(()=>{

    //private functions
    const renderMessage =(message)=>{
        document.querySelector('#message').innerHTML = message;
    }


    //public functions
    return{
        renderMessage,
    }

})();


// setting up Gameboard object module
const Gameboard =(()=>{

    let gameboard =["", "","", "","","","","",""];

    //private functions

    const render =()=>{
        let board = " ";
        gameboard.forEach((element, index)=>{
            board +=`<div class="grid-items" id="item-${index}">${element}</div>`;
            
        });
        document.querySelector('#gameboard').innerHTML = board;
        const items = document.querySelectorAll('.grid-items');
        items.forEach((element)=>{
            element.addEventListener('click',DisplayController.handleClick);
        })
        
       
    }
    const update =(index, value)=>{
          gameboard[index] = value;
          render();

    }

    const getGameboard =()=>gameboard;

    //  public functions
    return {
        render, 
        update,
        getGameboard,
    };


})();

//create multiple players using functory functions
const createPlayers =(name, marker)=>{


    //public functions
    return {
        name,
        marker

    }

}

//setting up the DisplayController object module
const DisplayController =(()=>{

    let players =[];
    let currentPlayerIndex;
    let gameOver;

    //private functions
    const start =()=>{
        players =[
                 createPlayers(document.querySelector('#player-one').value, "X"), 
                 createPlayers(document.querySelector('#player-two').value, "O")
                 ];

        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();

    }
    const handleClick =(event)=>{
        if(gameOver){
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);
        if(Gameboard.getGameboard()[index] !==""){
            return;
            
        }
        Gameboard.update(index, players[currentPlayerIndex].marker);

        //checking for win
        if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].marker)){
            gameOver = true;
            ScreenUI.renderMessage(`${players[currentPlayerIndex].name} wins`);

        }else if(checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            ScreenUI.renderMessage("It is a tie");
        }

        currentPlayerIndex =currentPlayerIndex === 0 ? 1 : 0;

        console.log(currentPlayerIndex);

    }

    const restart =()=>{
        for(let i =0; i < 9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render();
        gameOver =false;
        document.querySelector('#message').innerHTML ="";
    }

    //public functions
    return { 
        start,
        handleClick,
        restart,
    }


})();


function checkForWin(board){
    const winningCombinations =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ]
    for(let i=0; i<winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if(board[a] && board[a] ===board[b] && board[a] ===board[c]){
            return true;
        }
    }
    return false;
}

function checkForTie(board){
    return board.every(cell =>cell !== "");
}


//working with the DOM
const buttonStart =document.querySelector('#start-button');
const buttonRestart = document.querySelector('#restart-game');

buttonStart.addEventListener('click', ()=>{
     DisplayController.start();
})

buttonRestart.addEventListener('click',()=>{
    DisplayController.restart();
})

