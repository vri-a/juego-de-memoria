let cards = document.querySelectorAll(".card");
let cardBack = document.querySelectorAll(".card__back");
let message = document.getElementById("message");

let arrContent = [
    "🍕",
    "🍔",
    "🍚",
    "🥗",
    "🥞",
    "🍧",
    "🍩",
    "🍪",
    "🍕",
    "🍔",
    "🍚",
    "🥗",
    "🥞",
    "🍧",
    "🍩",
    "🍪"
];

function addContent() {
    let randomIndex = new Set(); 
    while((randomIndex.size != 16)) {
        let num = Math.floor((Math.random() * 16));
        randomIndex.add(num);
    };

    let randomIndexValues = randomIndex.values();
    let i = 0;
    for(value of randomIndexValues){
        cardBack[i].textContent = arrContent[value];
        i++;
    }
}

let start = document.getElementById("start");
let play = document.getElementById("play");
let restart = document.getElementById("restart");
let idTimer;
let seconds = 0;
let minutes = 0;

function addZero(number) {
    return number = number >= 0 && number <= 9 ? 0 : "";
}

let timer = () => {
    idTimer = setInterval(() => {
        if(seconds == 60){
            seconds = 0;
            minutes++;
        }
        play.textContent = `${addZero(minutes)}${minutes}:${addZero(seconds)}${seconds}`;
        ++seconds;
    }
    , 1000);
    return idTimer;
}

function run() {
    cards.forEach(elem => {
        elem.disabled = false;
    });
    start.disabled = true;
    restart.disabled = false;
    addContent();
    timer();
}

restart.addEventListener("click", () => {
    restart.style.display = "none";
    message.style.display = "none";
    start.disabled = false;
    play.textContent ="JUGAR";
    cards.forEach(elem => {
        elem.classList.remove("rotate");
    })

})

function finish() {
    minutes = 0;
    seconds = 0;
    clearInterval(idTimer);
}


let btn;
let btn2;
let points = 0;
function rotate(id) {
    if(btn != undefined){
        btn2 = btn;
        btn.classList.remove("rotate");
        btn = document.getElementById(id);
        btn.classList.add("rotate");
    } else {
        btn = document.getElementById(id);
        btn.classList.add("rotate");
    }

    if(btn2 != undefined){
        if(btn.textContent == btn2.textContent && btn != btn2) {
            btn.disabled = true;
            btn2.classList.add("rotate");
            btn2.disabled = true;
            btn2 = undefined;
            btn = undefined;
            ++points;
    

    }
}
    if(points == 8){
        finish();
        message.style.display = "block";
        restart.style.display = "block";
        points = 0;
    }
}

start.addEventListener("click", run);




