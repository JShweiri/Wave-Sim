'use strict'
let canvas = document.getElementById('graph');
canvas.width = 1000;
canvas.height = 500;
let ctx = canvas.getContext('2d');


//final time and position
let finalTime = 15;
let XMAX = 5 * Math.PI;

let MAX_DISTANCES = {
    x:XMAX,
    y:3
}

//time and position stepsize
let dx = 0.01;
let dt = 0.01;

//
let smallc = 1; //?

//Courant Number
let C = smallc*dt/dx;

//C squared
let C2 = C*C;

//Number of time steps
let nt = Math.ceil(finalTime/dt);

//Number of position steps
let nx = Math.ceil(XMAX/dx);

//u[time][xPos]
let u = [];

//initial conditions
u[0] = [];
for (let i = 0; i <= nx; i++){
    u[0][i] =  - Math.sin(dx*i);
}


//initial boundry conditions
u[0][0] = 0;
u[0][nx] = 0;


//First Layer
u[1] = [];
for (let i = 0; i <= nx; i++){
    u[1][i] = u[0][i] - (C2/2)*(u[0][i+1] - 2*u[0][i] + u[0][i-1]);
}

//second time step boundry conditions
u[1][0] = 0;
u[1][nx] = 0;


//Calculate Rest of points
for(let n = 1; n <= nt; n++){

    u[n+1] = [];
    for (let i = 0; i <= nx; i++){
        u[n+1][i] = -u[n-1][i] + 2*u[n][i] + C2*(u[n][i+1] - 2*u[n][i] + u[n][i-1]);
    }

    //boundry conditions
    u[n+1][0] = 0;
    u[n+1][nx] = 0;
}


//Function to return point object
function point(xPos, yPos, pointColor = 'black') {
    return {
        x:xPos,
        y:yPos,
        color:pointColor
    };
}

//Draws point on the canvas
function drawPoint(point){
    let xScale = canvas.width/MAX_DISTANCES.x;
    let yScale = canvas.height/MAX_DISTANCES.y;

    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x*xScale, point.y*yScale, 1, 0, 2 * Math.PI);
    ctx.fill();

}

let j = 0;
function drawString(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for(let i = 0; i < nx; i++){
        drawPoint({x:i*dx, y: MAX_DISTANCES.y/2 - u[j][i], color:'black'});
    }
    j++;
}

setInterval(drawString, 1);
