let boxes = document.querySelectorAll(".button");
let image = document.querySelector(".Image");
let message = document.querySelector(".avatar-message")
let result = document.querySelector("#results");
let replay_button = document.querySelector("#replay_button");
let isgameover = false;
let turn = "X"

boxes.forEach(e =>{
    e.innerHTML= ""
    e.addEventListener("click", ()=>{
        if(!isgameover && e.innerHTML === ""){
            e.innerHTML = turn;
            checkwin();
            checkdraw();
            changeturn();
        }
        e.disabled = true;
    })
})


const winnerpatterns = [

    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6],          //diagonal

]


function checkwin(){
   for (let i = 0 ; i < winnerpatterns.length ; i++ ){      //traverse the winning array 
    let [a, b, c] = winnerpatterns[i];  //assign each value to a,b,c

    if(boxes[a].innerHTML != "" && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML ){
        result.innerHTML = turn + " Won this round" 
        if(turn == "X"){    
                image.src = "./Images/angry-face.png";       //when player win change face
                message.innerHTML = "Let's Play Again";     //change message 
            }else{
                image.src = "./Images/happy-face.png";
                message.innerHTML = "That was easy";
            }
            isgameover=true;    
        }
   }

}

function changeturn(){ 

    turn = (turn == "X") ? "O" : "X"; 
    document.querySelector(".bg").style.left =  (turn === "X") ? '0' : '85px';
    document.querySelector(".bg").style.backgroundColor = (turn === "X") ? "#FF2E63" : "#08D9D6" ;

    if(turn === "O" && !isgameover){
        setTimeout(computermove(),500)
    }
}

function checkdraw(){
    if(!isgameover){
         let Draw = [...boxes].every(e =>e.innerHTML !== "");
         if(Draw){
            message.innerHTML = "It is a draw";
            result.innerHTML = "Draw";
            isgameover = true
        }   
    }
}

function computermove(){
    if(!isgameover && turn === "O"){
        let emptyboxes = [...boxes].filter(e => e.innerHTML ==="")
        

        if(emptyboxes.length > 0){
            setTimeout(() =>{
                let randomboxes = emptyboxes[Math.floor(Math.random() * emptyboxes.length)];
                randomboxes.innerHTML = "O";
                checkwin();
                checkdraw();
            if (!isgameover) changeturn();
            },500)
        }
    }
}


replay_button.addEventListener("click", ()=>{
    isgameover = false;
    turn = "X";
    document.querySelector(".bg").style.left = '0px';
    document.querySelector(".bg").style.backgroundColor ="#FF2E63";
    result.innerHTML = "";
    image.src = "./Images/neutral-face.png";
    message.innerHTML = "Hello Player";

    boxes.forEach(e =>{
        e.innerHTML = "";

    })

})

