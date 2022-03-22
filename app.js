const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); //경로 생성
        ctx.moveTo(x,y); //선 시작 좌표
    } else {
        ctx.lineTo(x,y); //선 끝 좌표
        ctx.stroke(); //선 그리기
    }
}

function handleColorclick(event) {
    const color = event.target.style.backgroundColor;
    //console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
} 

function handleCanvasClick() {
    if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorclick)
);

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}