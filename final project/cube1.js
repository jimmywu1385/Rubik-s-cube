var gl;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var theta = [0, 0, 0];

var matrixLoc;

var numVertices = 36;

var program;

var point = [];
var color = [];

var vertices = [
    vec3(-0.5, -0.5, 0.5),
    vec3(-0.5, 0, 0.5),
    vec3(-0.5, 0.5, 0.5),
    vec3(0, -0.5, 0.5),
    vec3(0, 0, 0.5),
    vec3(0, 0.5, 0.5),
    vec3(0.5, -0.5, 0.5),
    vec3(0.5, 0, 0.5),
    vec3(0.5, 0.5, 0.5),
    vec3(-0.5, -0.5, 0),
    vec3(0, -0.5, 0),
    vec3(0.5, -0.5, 0),
    vec3(0.5, 0, 0),
    vec3(0.5, 0.5, 0),
    vec3(0, 0.5, 0),
    vec3(-0.5, 0.5, 0),
    vec3(-0.5, 0, 0),
    vec3(-0.5, -0.5, -0.5),
    vec3(0, -0.5, -0.5),
    vec3(0.5, -0.5, -0.5),
    vec3(0.5, 0, -0.5),
    vec3(0.5, 0.5, -0.5),
    vec3(0, 0.5, -0.5),
    vec3(-0.5, 0.5, -0.5),
    vec3(-0.5, 0, -0.5),
    vec3(0, 0, -0.5),
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0)
];

// indices of the 12 triangles that compise the cube 

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // color array atrribute buffer	

    matrixLoc = gl.getUniformLocation(program, "transform");
    render();
};
function quad(a, b, c, d) {
    var indices = [a, b, c, a, c, d];
    for (var i = 0; i < indices.length; ++i) {
        point.push(vertices[indices[i]]);
        color.push(vertexColors[a]);
    }
}
function colorCube() {
    quad(0, 1, 4, 3);
    quad(1, 0, 9, 16);
    quad(2, 1, 4, 5);
    quad(3, 0, 9, 10);
    quad(4, 3, 6, 7);
    quad(5, 2, 15, 14);
    quad(6, 3, 10, 11);
    quad(7, 8, 13, 12);
    quad(8, 5, 4, 7);
    quad(9, 10, 18, 17);
    quad(10, 11, 19, 18);
    quad(11, 12, 20, 19);
    quad(12, 11, 6, 7);
    quad(13, 14, 22, 21);
    quad(14, 13, 8, 5);
    quad(15, 16, 24, 23);
    quad(16, 1, 2, 15);
    quad(17, 24, 16, 9);
    quad(18, 17, 24, 25);
    quad(19, 20, 25, 18);
    quad(20, 12, 13, 21);
    quad(21, 20, 25, 22);
    quad(22, 14, 15, 23);
    quad(23, 24, 25, 22);
}
function bottom() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[9] = dup[11];
    vertexColors[10] = dup[20];
    vertexColors[11] = dup[13];
    vertexColors[20] = dup[22];
    vertexColors[13] = dup[15];
    vertexColors[22] = dup[17];
    vertexColors[15] = dup[9];
    vertexColors[17] = dup[10];
    vertexColors[19] = dup[21];
    vertexColors[21] = dup[23];
    vertexColors[23] = dup[18];
    vertexColors[18] = dup[19];
}
function left() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[2] = dup[7];
    vertexColors[8] = dup[20];
    vertexColors[7] = dup[21];
    vertexColors[20] = dup[23];
    vertexColors[21] = dup[15];
    vertexColors[23] = dup[16];
    vertexColors[15] = dup[2];
    vertexColors[16] = dup[8];
    vertexColors[5] = dup[14];
    vertexColors[22] = dup[5];
    vertexColors[13] = dup[22];
    vertexColors[14] = dup[13];
}
function right() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[4] = dup[14];
    vertexColors[8] = dup[13];
    vertexColors[14] = dup[21];
    vertexColors[13] = dup[19];
    vertexColors[21] = dup[10];
    vertexColors[19] = dup[6];
    vertexColors[10] = dup[4];
    vertexColors[6] = dup[8];
    vertexColors[12] = dup[7];
    vertexColors[7] = dup[20];
    vertexColors[20] = dup[11];
    vertexColors[11] = dup[12];
}
function bottomb() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[9] = dup[15];
    vertexColors[10] = dup[17];
    vertexColors[11] = dup[9];
    vertexColors[20] = dup[10];
    vertexColors[13] = dup[11];
    vertexColors[22] = dup[20];
    vertexColors[15] = dup[13];
    vertexColors[17] = dup[22];
    vertexColors[19] = dup[18];
    vertexColors[21] = dup[19];
    vertexColors[23] = dup[21];
    vertexColors[18] = dup[23];
}
function leftb() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[2] = dup[15];
    vertexColors[8] = dup[16];
    vertexColors[7] = dup[2];
    vertexColors[20] = dup[8];
    vertexColors[21] = dup[7];
    vertexColors[23] = dup[20];
    vertexColors[15] = dup[21];
    vertexColors[16] = dup[23];
    vertexColors[5] = dup[22];
    vertexColors[22] = dup[13];
    vertexColors[13] = dup[14];
    vertexColors[14] = dup[5];
}
function rightb() {
    var dup = [];
    for (var i = 0; i < 24; ++i) {
        dup.push(vertexColors[i]);
    }
    vertexColors[4] = dup[10];
    vertexColors[8] = dup[6];
    vertexColors[14] = dup[4];
    vertexColors[13] = dup[8];
    vertexColors[21] = dup[14];
    vertexColors[19] = dup[13];
    vertexColors[10] = dup[21];
    vertexColors[6] = dup[19];
    vertexColors[12] = dup[11];
    vertexColors[7] = dup[12];
    vertexColors[20] = dup[7];
    vertexColors[11] = dup[20];
}
function render() {
    document.getElementById( "b" ).onclick = bottom;
    document.getElementById( "l" ).onclick = left;
    document.getElementById( "r" ).onclick = right;
    document.getElementById( "bb" ).onclick = bottomb;
    document.getElementById( "lb" ).onclick = leftb;
    document.getElementById( "rb" ).onclick = rightb;
    theta[0] = document.getElementById("x").value
    theta[1] = document.getElementById("y").value
    theta[2] = document.getElementById("z").value
    colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(color), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // vertex array attribute buffer

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(point), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var modeling = mult(rotate(theta[xAxis], 1, 0, 0),
        mult(rotate(theta[yAxis], 0, 1, 0), rotate(theta[zAxis], 0, 0, 1)));
    var viewing = lookAt([0, 0, -2], [0, 0, 0], [0, 1, 0]);
    var projection = perspective(95, 1.0, 1.0, 3.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);

    var mvpMatrix = mult(projection, mult(viewing, modeling));
    gl.uniformMatrix4fv(matrixLoc, 0, flatten(mvpMatrix));

    for (var i = 0; i < 144; ++i) {
        point.pop();
    }
    for (var i = 0; i < 144; ++i) {
        color.pop();
    }

    gl.drawArrays(gl.TRIANGLES, 0, 144);

    requestAnimFrame(render);
}
//asd65 83 68