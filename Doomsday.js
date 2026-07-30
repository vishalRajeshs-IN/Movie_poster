/* =====================================================
   AVENGERS: DOOMSDAY
   script.js (Part 3A)
===================================================== */

/* ---------------- Loader ---------------- */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.style.display = "none";

        },1000);

    },1800);

});


/* ---------------- Live Clock ---------------- */

function updateClock(){

    const now = new Date();

    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');

    document.getElementById("clock").textContent =
        `${h}:${m}:${s}`;

}

setInterval(updateClock,1000);

updateClock();


/* ---------------- Countdown ---------------- */

/*
Replace with the official release date
Example:
new Date("December 18, 2026 00:00:00")
*/

const releaseDate =
new Date("December 18, 2026 00:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = releaseDate - now;

    if(distance < 0){

        document.getElementById("days").textContent="000";
        document.getElementById("hours").textContent="00";
        document.getElementById("minutes").textContent="00";
        document.getElementById("seconds").textContent="00";

        return;

    }

    const days =
    Math.floor(distance/(1000*60*60*24));

    const hours =
    Math.floor((distance%(1000*60*60*24))/(1000*60*60));

    const minutes =
    Math.floor((distance%(1000*60*60))/(1000*60));

    const seconds =
    Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").textContent =
    String(days).padStart(3,'0');

    document.getElementById("hours").textContent =
    String(hours).padStart(2,'0');

    document.getElementById("minutes").textContent =
    String(minutes).padStart(2,'0');

    document.getElementById("seconds").textContent =
    String(seconds).padStart(2,'0');

    const timer = document.querySelector("#timer span");

    if(timer){

        timer.textContent =
        String(days).padStart(3,'0');

    }

}

setInterval(updateCountdown,1000);

updateCountdown();


/* ---------------- Music ---------------- */

const bgMusic =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

let playing = false;

musicBtn.addEventListener("click",()=>{

    if(!playing){

        bgMusic.volume = 0.4;

        bgMusic.play();

        playing = true;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

    }

    else{

        bgMusic.pause();

        playing=false;

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

    }

});


/* -------- Optional autoplay attempt -------- */

document.body.addEventListener("click",()=>{

    if(!playing){

        bgMusic.volume=0.35;

        bgMusic.play().catch(()=>{});

        playing=true;

    }

},{once:true});


/* ---------------- Doom Mask ---------------- */

const doomMask =
document.getElementById("doom-mask");

window.addEventListener("scroll",()=>{

    const trigger =
    window.scrollY;

    if(trigger>700){

        doomMask.classList.add("show");

    }

    else{

        doomMask.classList.remove("show");

    }

});


/* ---------------- Reveal Animation ---------------- */

const observer = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0)";

}

});

},

{

threshold:.2

}

);

document.querySelectorAll(

".glass-panel,.flip-card,.timeline-item,.count-grid div"

).forEach(el=>{

el.style.opacity=0;

el.style.transform="translateY(80px)";

el.style.transition=".9s";

observer.observe(el);

});


/* ---------------- Smooth Nav ---------------- */

document.querySelectorAll("nav a").forEach(link=>{

link.addEventListener("click",(e)=>{

e.preventDefault();

const target=document.querySelector(

link.getAttribute("href")

);

target.scrollIntoView({

behavior:"smooth"

});

});

});


/* ---------------- Floating Effect ---------------- */

document.querySelectorAll(".glass-box").forEach((box,index)=>{

box.style.animation=

`float ${3+index}s ease-in-out infinite`;

});


console.log(

"⚡ Avengers: Doomsday Part 3A Loaded"

);
/* =====================================================
   AVENGERS: DOOMSDAY
   script.js (Part 3B)
   Lightning • Particles • Cursor Glow • Ambient FX
=====================================================*/

/* ---------------- Canvas Lightning ---------------- */

const canvas = document.getElementById("lightningCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawLightning(x, y, length, angle, depth) {

    if (depth <= 0) return;

    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = Math.max(1, depth / 2);

    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00ff88";

    ctx.stroke();

    drawLightning(
        x2,
        y2,
        length * 0.72,
        angle + (Math.random() - 0.5),
        depth - 1
    );

    if (Math.random() > 0.65) {

        drawLightning(
            x2,
            y2,
            length * 0.55,
            angle - (Math.random() - 0.5),
            depth - 2
        );

    }

}

function flashLightning() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const startX =
        Math.random() * canvas.width;

    drawLightning(
        startX,
        0,
        110,
        Math.PI/2,
        10
    );

    setTimeout(() => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    },150);

}

setInterval(() => {

    if(Math.random()>0.55){

        flashLightning();

    }

},2500);


/* ---------------- Particles ---------------- */

particlesJS("particles-js",{

particles:{

number:{
value:110
},

color:{
value:"#00ff88"
},

shape:{
type:"circle"
},

opacity:{
value:.4
},

size:{
value:3
},

move:{
enable:true,
speed:1
},

line_linked:{
enable:true,
distance:170,
color:"#00ff88",
opacity:.18
}

},

interactivity:{

events:{

onhover:{
enable:true,
mode:"grab"
},

onclick:{
enable:true,
mode:"push"
}

},

modes:{

grab:{
distance:180
},

push:{
particles_nb:6
}

}

},

retina_detect:true

});


/* ---------------- Cursor Glow ---------------- */

const glow = document.createElement("div");

glow.id="cursorGlow";

document.body.appendChild(glow);

Object.assign(glow.style,{

position:"fixed",

width:"18px",

height:"18px",

borderRadius:"50%",

background:"#00ff88",

boxShadow:"0 0 30px #00ff88",

pointerEvents:"none",

transform:"translate(-50%,-50%)",

zIndex:"999999",

transition:"transform .08s linear"

});

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});


/* ---------------- Ambient Energy Pulse ---------------- */

setInterval(()=>{

document.querySelectorAll(".glass-box,.flip-front,.timeline-item")
.forEach(el=>{

el.animate([

{

boxShadow:"0 0 10px rgba(0,255,136,.15)"

},

{

boxShadow:"0 0 35px rgba(0,255,136,.65)"

},

{

boxShadow:"0 0 10px rgba(0,255,136,.15)"

}

],{

duration:2200,

iterations:1

});

});

},4500);


/* ---------------- Hero Title Flicker ---------------- */

const doomTitle =
document.querySelector(".hero-content h1 span");

setInterval(()=>{

doomTitle.style.opacity=".6";

setTimeout(()=>{

doomTitle.style.opacity="1";

},120);

},7000);


/* ---------------- Floating Particles ---------------- */

for(let i=0;i<30;i++){

const dot=document.createElement("div");

dot.className="energyDot";

Object.assign(dot.style,{

position:"fixed",

width:Math.random()*6+3+"px",

height:Math.random()*6+3+"px",

borderRadius:"50%",

background:"#00ff88",

opacity:.35,

left:Math.random()*100+"vw",

top:100+Math.random()*30+"vh",

pointerEvents:"none",

boxShadow:"0 0 15px #00ff88",

animation:`rise ${8+Math.random()*10}s linear infinite`

});

document.body.appendChild(dot);

}

const style=document.createElement("style");

style.innerHTML=`

@keyframes rise{

0%{

transform:translateY(0);

opacity:0;

}

15%{

opacity:.45;

}

100%{

transform:translateY(-130vh);

opacity:0;

}

}

.energyDot{

will-change:transform;

}

`;

document.head.appendChild(style);


/* ---------------- Random Screen Flash ---------------- */

setInterval(()=>{

if(Math.random()>0.82){

document.body.animate([

{

filter:"brightness(1)"

},

{

filter:"brightness(1.18)"

},

{

filter:"brightness(1)"

}

],{

duration:180

});

}

},3500);


/* ---------------- Console Message ---------------- */

console.log("🟢 Emerald FX Loaded");
console.log("⚡ Lightning Engine Active");
console.log("🎬 Avengers: Doomsday Experience Ready");