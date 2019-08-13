'use strict'
let canvas = document.getElementById('graph');
canvas.width = 1000;
canvas.height = 500;
let ctx = canvas.getContext('2d');


//final time
let finalTime = 25;

// Length of string
let XMAX = 9;

//Height of graph
let HEIGHT_OF_GRAPH = 3;

//Window
let MAX_DISTANCES = {
    x:XMAX,
    y:HEIGHT_OF_GRAPH
}

//time and position stepsize
let dx = 0.01;
let dt = 0.01;

//??
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

//initial conditions                                    SET FUNCTION HERE!!!!!!!!!!!!!
u[0] = [];
for (let i = 0; i <= nx; i++){
    u[0][i] =   Math.sin(dx*i) + Math.sin(dx*i/2);
}

//Set Global Boundry Conditions
let LB = u[0][0];
let RB = u[0][nx];

//OLD
// //first time step boundry conditions
// u[0][0] = 0;
// u[0][nx] = 0;


//First Layer
u[1] = [];
for (let i = 0; i <= nx; i++){
    u[1][i] = u[0][i] - (C2/2)*(u[0][i+1] - 2*u[0][i] + u[0][i-1]);
}

//second time step boundry conditions
u[1][0] = LB;
u[1][nx] = RB;


//Calculate Rest of points
for(let n = 1; n <= nt; n++){

    u[n+1] = [];
    for (let i = 0; i <= nx; i++){
        u[n+1][i] = -u[n-1][i] + 2*u[n][i] + C2*(u[n][i+1] - 2*u[n][i] + u[n][i-1]);
    }

    //boundry conditions
    u[n+1][0] = LB;
    u[n+1][nx] = RB;
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
    if(j<nt){
    for(let i = 0; i < nx; i++){
        drawPoint({x:i*dx, y: MAX_DISTANCES.y/2 - u[j][i], color:'black'});
    }
}
    j++;
}

setInterval(drawString, 1);




















//Writes new values of variables from forms
function submitted(){

    //Clear Intervals
    let interval_id = window.setInterval("", 9999);
    for (let m = 1; m < interval_id; m++)
        window.clearInterval(m);


    XMAX = parseFloat(document.getElementById('String_Length').value, 10); 

    finalTime = parseFloat(document.getElementById('Sim_Time').value, 10);

    HEIGHT_OF_GRAPH = parseFloat(document.getElementById('Graph_Height').value, 10);

    smallc = parseFloat(document.getElementById('c').value, 10);

    dt = parseFloat(document.getElementById('DT').value, 10);

    dx = parseFloat(document.getElementById('DX').value, 10);
    
    MAX_DISTANCES = {
        x:XMAX,
        y:HEIGHT_OF_GRAPH
    }

    recalculate();
    j = 0;
    setInterval(drawString, 1);

};

function recalculate(){

//Number of time steps
nt = Math.ceil(finalTime/dt);

//Number of position steps
nx = Math.ceil(XMAX/dx);

 u = [];

//initial conditions
u[0] = [];
for (let i = 0; i <= nx; i++){
    u[0][i] =  - Math.sin(dx*i);
}
 LB = u[0][0];
 RB = u[0][nx];


//initial boundry conditions
u[0][0] = LB;
u[0][nx] = RB;


//First Layer
u[1] = [];
for (let i = 0; i <= nx; i++){
    u[1][i] = u[0][i] - (C2/2)*(u[0][i+1] - 2*u[0][i] + u[0][i-1]);
}

//second time step boundry conditions
u[1][0] = LB;
u[1][nx] = RB;


//Calculate Rest of points
for(let n = 1; n <= nt; n++){

    u[n+1] = [];
    for (let i = 0; i <= nx; i++){
        u[n+1][i] = -u[n-1][i] + 2*u[n][i] + C2*(u[n][i+1] - 2*u[n][i] + u[n][i-1]);
    }

    //boundry conditions
    u[n+1][0] = LB;
    u[n+1][nx] = RB;
}

}
