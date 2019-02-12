var canvas, gl, program, vBuffer, fColor;
var central, topLeft; //random vertex
var colors;
var animation;
var tileHist = [];
var ground;
var height;
var gridVertices;
var curTileVertices;
var randTileIndex;
var rotatedPosition;
var pressUp;
var isRotating;
var randStartingPos;
var v, h, t;
var bottomCount, isUpdatingBottom;
var reqStop;
var score, alert, scoreNode, nextNode,scoreN;

pressUp = 0;
isRotating = false;
gridVertices = getGridVert(20, 10, 0, 0, 0);
bottomCount = 0;
scoreN = 0;
alertN = "Enjoy the game! =U ";
initVars(); 

window.onload = function init() {
    console.log("this is working."); 
    canvas = document.getElementById('gl-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) gl = canvas.getContext("experimental-webgl");
    if (!gl) alert("Browser doesn't support webgl");

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(1, 1, 1, 1);
    score = document.getElementById("score");
    scoreNode = document.createTextNode("");
    score.appendChild(scoreNode);

    alert = document.getElementById("alert");
    alertNode = document.createTextNode("");
    alert.appendChild(alertNode);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    fColor = gl.getUniformLocation(program, "fColor");
    rotatedPosition = gl.getUniformLocation(program, "rotation");

    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(vPosition); 

    render();
};

window.addEventListener("keydown", getKey, false);

function render() {
    console.log("still rendering...");
    animation = undefined;
    gl.clear(gl.COLOR_BUFFER_BIT); 
    drawTiles();
    drawGrid();
    if (!reqStop)
    setTimeout(start, 500);

 }

function start(){
    if (!animation && !reqStop) {
        animation = requestAnimFrame(render);
    }   
}

function initVars(){
    central = (Math.floor((Math.random() * 6 - 10)))/10 + 0.25;
    height = 1.05;
    colors = getRandomColors(); 
    randTileIndex = Math.floor(Math.random() * 7) + 1;
    if (randTileIndex != 1) {
        var obj = getRandomTile(randTileIndex, central, height, false);
        v = obj.vertArr;
        h = obj.heightArr;
        t = obj.topLeftArr;
        randStartingPos = Math.floor(Math.random() * h.length);
        curTileVertices = v[randStartingPos];
        topLeft = t[randStartingPos];
        height = h[randStartingPos];
    }
    else{
        var e = getRandomTile(randTileIndex, -0.1, height, false);
        curTileVertices = e[0];
        height = e[1];
        topLeft = e[2];
    }
}

function drawTiles(){
    scoreNode.nodeValue = scoreN;
    alertNode.nodeValue = alertN;
    drawTileHist();
    var xCoors = getXs();
    var yCoors = getYs();
    var canMoveDown = moveDown(0.1, curTileVertices);
    score.nodeValue = scoreN;
    if(canMoveDown){
        curTileVertices = canMoveDown;
        drawEachSquare(curTileVertices);
    }
    else {
        addTileToHist(xCoors, yCoors, colors);
        initVars();
        render();
    }
}

function drawTileHist(){
    for (var i = 0; i < tileHist.length; i ++) {
        var square = tileHist[i];
        var vertices = getSquareVert(square.xCoor, square.yCoor);
        gl.uniform4f(fColor, square.r, square.g, square.b, 1);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);    
        gl.drawArrays(gl.TRIANGLES, 0, 6);  
    }
}

function drawGrid(){
    gl.uniform4f(fColor, 0, 0, 0, 1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(gridVertices), gl.STATIC_DRAW); 
    gl.drawArrays(gl.LINES, 0, 64);
}

function getRandomColors(){
    var r, g, b;
    r = Math.floor(Math.random() * 10 )/10;
    g = Math.floor(Math.random() * 10 )/10;
    b = Math.floor(Math.random() * 10 )/10;
    return [r, g, b];
}

function getGridVert(m, n, r, g, b){
    var vertex = [];
    for (var i = 0; i <= m; i++){
        vertex.push(-1, (1 - 2*i/m), 0, 1);
        vertex.push(0, (1 - 2*i/m), 0, 1);
    }
    for (var k = 0; k <= n; k++ ){
        vertex.push(- k/n, 1, 0, 1);
        vertex.push(- k/n, -1, 0, 1);
    }
    return vertex;
}

function getSquareVert(x, y){
    return [
    x, y, 0, 1,
    x + 0.1, y, 0, 1,
    x + 0.1, y - 0.1, 0, 1,

    x, y, 0, 1,
    x, y - 0.1, 0, 1,
    x + 0.1, y - 0.1, 0, 1
    ];
}

function getRandomTile(x, origCen, origHi, isRotating){
    return getTileVertices(x, origCen, origHi, isRotating);
}

function getXs(){
    var x = [];
    for (var i = 0; i < curTileVertices.length; i++){
        if(i % 24 == 0){
            x.push(curTileVertices[i]);
        }
    }
    return x;
}

function getYs(){
    var y = [];
    for (var i = 0; i < curTileVertices.length; i++){
        if(i % 24 == 1){
            y.push(curTileVertices[i]);
        }
    }
    return y;
}

function roundNum(x){
    return Math.round(10*x)/10 ;
}

function drawEachSquare(tileVert){
    gl.uniform4f(fColor, colors[0], colors[1], colors[2], 1);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(tileVert), gl.STATIC_DRAW);    
    gl.drawArrays(gl.TRIANGLES, 0, curTileVertices.length/4);
}

function addTileToHist(xs, ys, color){
    for (var i = 0; i < xs.length; i++){
       var x = xs[i];
       var y = ys[i];
       var square = { 
            xCoor: x, 
            yCoor: y, 
            r: color[0], 
            g: color[1], 
            b: color[2]
        };
        tileHist.push(square);
        if (roundNum(y) == -0.9) bottomCount++;
        if (roundNum(y) > 0.9) {
            alertN = "Game over..";
            alertNode.nodeValue = alertN;
            reqStop = true;
        }

    }
    checkBottom();
}

function updateBottom(){
    console.log("score node value is ", score.nodeValue );
    bottomCount = 0;
    for (i = 0; i < tileHist.length; i++){
        var sq = tileHist[i];
        //console.log("before  x, y is  ", roundNum(sq.xCoor), roundNum(sq.yCoor));
        sq.yCoor = sq.yCoor - 0.1;
        //console.log("after  x, y is  ", roundNum(sq.xCoor), roundNum(sq.yCoor));
        if (roundNum(sq.yCoor) == -0.9) bottomCount++; 
    }
    for (i = 0; i < tileHist.length; i++){
        var sq = tileHist[i];
        if (roundNum(sq.yCoor) == -1) {
            tileHist.splice(i,1);
            i--;
        }
    }
    checkBottom();
}

function checkBottom(){
    if (bottomCount == 10) {
        scoreN++; 
        updateBottom();
    }
}

function getKey(key) {
    switch (key.key) {
        case "ArrowLeft":
            curTileVertices = moveLeft(0.1, curTileVertices) || curTileVertices;
            break;
        case "ArrowRight":
            curTileVertices = moveRight(0.1, curTileVertices) || curTileVertices;
            break;
        case "ArrowUp":
            isRotating = true;
            pressUp++;
            //console.log("after press pressUp is: ", pressUp);
            curTileVertices = rotatedTileVert() || curTileVertices;
            isRotating = false;
            //console.log("after rotation pressUp is: ", pressUp);
            break;
        case "ArrowDown":
            curTileVertices = moveDown(0.1, curTileVertices) || curTileVertices;
            break;
        case "q":
            reqStop = true;
            alertN = "You have quit the game..";
            alertNode.nodeValue = alertN;
            break;
        case "r":
            reqStop = true;
            restart();
            break;
    }
}

function restart(){
    reqStop =  false;
    scoreN = 0;
    alertN= "Enjoy the game! =U ";
    initVars();
    pressUp = 0;
    isRotating = false;
    gridVertices = getGridVert(20, 10, 0, 0, 0);
    bottomCount = 0;
    tileHist.length = 0;
    render();
}

function moveLeft(x, tileVert){
    var res = tileVert.slice();
    for (var i = 0; i < res.length; i++){
            if (i % 4 == 0 ) {
                res[i] = res[i] - x;
            }
    }

    if (checkSurrounding(false, res)){
        central = central - x;
        return res;
    }
    return false;
}

function moveRight(x, tileVert){
    var res = tileVert.slice();
    for (var i = 0; i < res.length; i++){
            if (i % 4 == 0 ) {
                res[i] = res[i] + x;
            }
    }
    if (checkSurrounding(false, res)){
        central = central + x;
        return res;
    }
    console.log("moveRight will return false");
    return false;
}

function moveDown(y, tileVert){
    var res = tileVert.slice();
    for (var i = 0; i < res.length; i++){
        if (i % 4 == 1 ) {
            res[i] = res[i] - y;
        }
    }
    if (checkSurrounding(false, res)) {
        height = height - y;
        return res;
    }
    return false;
}

function rotatedTileVert(){
    if (randTileIndex == 1){
        return false;
    }
    console.log("inside rotatedTileVert origCen:",central);

    var newVerObj = getTileVertices(randTileIndex, central, height, true);
    var v = newVerObj.vertArr;
    var nextPos = (randStartingPos + pressUp) % v.length;
    var tileVert = v[nextPos];
    //console.log("next pos: ", nextPos);
    //console.log("next verts: ", tileVert);

    if (checkSurrounding(true, tileVert)){
        return tileVert;
    }
    else{
        pressUp--;
    }
    return false;
}

function checkSurrounding(rotating, tile){
    var notCollided = true;
    //check collision 
    for (var i = 0; i < (tile.length - 1); i++){
        if (i % 24 == 0 ) {
            for (var j = 0; j < tileHist.length; j++) {
                var square = tileHist[j];
                var vertices = getSquareVert(square.xCoor, square.yCoor);
                if (roundNum(vertices[0]) == roundNum(tile[i]) && roundNum(vertices[1]) == roundNum(tile[i+1])){
                    return false;
                } 
            }
        }
    }

    //check borders
    if (rotating) {
        for (var i = 0; i < tile.length; i++){
            if (i % 4 == 0 && (roundNum(tile[i]) < -1 || roundNum(tile[i]) > 0) ){
                return false;
            }
        }
    }
    else{
        for (var i = 0; i < tile.length - 1; i++){
            if (i % 4 == 0 ){
                if(roundNum(tile[i]) < -1 ) return false;
                
                if(roundNum(tile[i]) > 0 ) return false;
                
                if(roundNum(tile[i+1]) < -1) return false;
            }
        }
    }
    return notCollided;
}
