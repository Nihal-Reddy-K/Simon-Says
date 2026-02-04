let game_seq = [];
let user_seq = [];

let btns = ["c1","c2","c3","c4"];

let game_start = false;
let acceptingInput = false;
let level = 0;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

function startGame(){
    if(!game_start){
        console.log("The game started");
        game_start = true;
        document.removeEventListener("keypress", startGame);
        levelUp();
    }
}

document.addEventListener("keypress", startGame);

function levelUp(){
    acceptingInput = false;
    user_seq=[];
    level++;
    h2.innerText = `level ${level}`;
    let idx = Math.floor(Math.random()*4);
    let randColor = btns[idx];
    let randBtn = document.querySelector(`#${randColor}`)
    game_seq.push(randColor);
    console.log(game_seq);
    gameFlash(randBtn);    
    
    setTimeout(() => {
        acceptingInput = true;
    }, 300);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    },250);
}

function verifyDaAnswer(idx){
if(user_seq[idx] == game_seq[idx]){
    if(user_seq.length == game_seq.length){
        setTimeout(levelUp,1000);
    }
}else{
    h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br/> Press any key to start the game again.`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },200);
    resetDaGame();
}
}

function btnPressed(){
    if (!game_start || !acceptingInput) return;
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    user_seq.push(userColor);
    verifyDaAnswer(user_seq.length-1);
}

for(let btn of allBtns){
    btn.addEventListener("click",btnPressed);
}

function resetDaGame(){
    game_start=false;
    acceptingInput = false;
    user_seq=[];
    game_seq=[];
    level=0;
    document.addEventListener("keypress", startGame);
}
