(() => {
var __defProp = Object.defineProperty;
var __export = (target, all) => {
for (var name in all)
__defProp(target, name, { get: all[name], enumerable: true });
};


var GL_DEPTH_BUFFER_BIT = 256;
var GL_COLOR_BUFFER_BIT = 16384;
var GL_TRIANGLE_STRIP = 5;
var GL_SRC_ALPHA = 770;
var GL_ONE_MINUS_SRC_ALPHA = 771;
var GL_STATIC_DRAW = 35044;
var GL_STREAM_DRAW = 35040;
var GL_ARRAY_BUFFER = 34962;
var GL_CULL_FACE = 2884;
var GL_DEPTH_TEST = 2929;
var GL_RGBA = 6408;
var GL_PIXEL_UNSIGNED_BYTE = 5121;
var GL_FRAGMENT_SHADER = 35632;
var GL_VERTEX_SHADER = 35633;
var GL_NEAREST = 9728;
var GL_TEXTURE_MAG_FILTER = 10240;
var GL_TEXTURE_MIN_FILTER = 10241;
var GL_TEXTURE_WRAP_S = 10242;
var GL_TEXTURE_WRAP_T = 10243;
var GL_TEXTURE_2D = 3553;
var GL_TEXTURE0 = 33984;
var GL_REPEAT = 10497;
var GL_FRAMEBUFFER = 36160;
var GL_UNPACK_FLIP_Y_WEBGL = 37440;
var GL_FLOAT = 5126;


function fetch_image(path) {
return new Promise((resolve) => {
let image = new Image();
image.src = path;
image.onload = () => resolve(image);
});
}
function create_texture_from(gl, image) {
let texture = gl.createTexture();
gl.bindTexture(GL_TEXTURE_2D, texture);
gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_PIXEL_UNSIGNED_BYTE, image);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
return {
Texture: texture,
Width: image.width,
Height: image.height
};
}


var update_span = document.getElementById("update");
var delta_span = document.getElementById("delta");
var fps_span = document.getElementById("fps");
var step = 1 / 60;
var GameImpl = class {
constructor() {
this.Running = 0;
this.Now = 0;
this.ViewportWidth = window.innerWidth;
this.ViewportHeight = window.innerHeight;
this.ViewportResized = true;
this.InputState = {
MouseX: 0,
MouseY: 0
};
this.InputDelta = {
MouseX: 0,
MouseY: 0,
WheelY: 0
};
this.InputDistance = {
Mouse: 0,
Mouse0: 0,
Mouse1: 0,
Mouse2: 0,
Touch0: 0,
Touch1: 0
};
this.InputTouches = {};
this.Ui = document.querySelector("main");
document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());
this.Ui.addEventListener("mousedown", (evt) => {
this.InputState[`Mouse${evt.button}`] = 1;
this.InputDelta[`Mouse${evt.button}`] = 1;
});
this.Ui.addEventListener("mouseup", (evt) => {
this.InputState[`Mouse${evt.button}`] = 0;
this.InputDelta[`Mouse${evt.button}`] = -1;
});
this.Ui.addEventListener("mousemove", (evt) => {
this.InputDelta["MouseX"] = evt.clientX - this.InputState["MouseX"];
this.InputDelta["MouseY"] = evt.clientY - this.InputState["MouseY"];
this.InputState["MouseX"] = evt.clientX;
this.InputState["MouseY"] = evt.clientY;
});
this.Ui.addEventListener("wheel", (evt) => {
evt.preventDefault();
this.InputDelta["WheelY"] = evt.deltaY;
});
this.Ui.addEventListener("touchstart", (evt) => {
if (evt.target === this.Ui) {
evt.preventDefault();
}
if (evt.touches.length === 1) {
this.InputTouches = {};
}
for (let i = 0; i < evt.touches.length; i++) {
let touch = evt.touches[i];
this.InputTouches[touch.identifier] = i;
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 1;
this.InputState[`Touch${index}X`] = touch.clientX;
this.InputState[`Touch${index}Y`] = touch.clientY;
this.InputDelta[`Touch${index}`] = 1;
this.InputDelta[`Touch${index}X`] = 0;
this.InputDelta[`Touch${index}Y`] = 0;
}
});
this.Ui.addEventListener("touchmove", (evt) => {
if (evt.target === this.Ui) {
evt.preventDefault();
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputDelta[`Touch${index}X`] = touch.clientX - this.InputState[`Touch${index}X`];
this.InputDelta[`Touch${index}Y`] = touch.clientY - this.InputState[`Touch${index}Y`];
this.InputState[`Touch${index}X`] = touch.clientX;
this.InputState[`Touch${index}Y`] = touch.clientY;
}
});
this.Ui.addEventListener("touchend", (evt) => {
if (evt.target === this.Ui) {
evt.preventDefault();
}
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 0;
this.InputDelta[`Touch${index}`] = -1;
}
});
this.Ui.addEventListener("touchcancel", (evt) => {
for (let i = 0; i < evt.changedTouches.length; i++) {
let touch = evt.changedTouches[i];
let index = this.InputTouches[touch.identifier];
this.InputState[`Touch${index}`] = 0;
this.InputDelta[`Touch${index}`] = -1;
}
});
window.addEventListener("keydown", (evt) => {
if (!evt.repeat) {
this.InputState[evt.code] = 1;
this.InputDelta[evt.code] = 1;
}
});
window.addEventListener("keyup", (evt) => {
this.InputState[evt.code] = 0;
this.InputDelta[evt.code] = -1;
});
}
Start() {
let accumulator = 0;
let last = performance.now();
let tick = (now) => {
let delta = (now - last) / 1e3;
last = now;
this.Running = requestAnimationFrame(tick);
this.FrameSetup(delta);
accumulator += delta;
while (accumulator >= step) {
accumulator -= step;
this.FixedUpdate(step);
this.InputReset();
}
this.FrameUpdate(delta);
this.FrameReset(delta);
};
this.Stop();
tick(last);
}
Stop() {
cancelAnimationFrame(this.Running);
this.Running = 0;
}
FrameSetup(delta) {
this.Now = performance.now();
let mouse_distance = Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
this.InputDistance["Mouse"] += mouse_distance;
if (this.InputState["Mouse0"] === 1) {
this.InputDistance["Mouse0"] += mouse_distance;
}
if (this.InputState["Mouse1"] === 1) {
this.InputDistance["Mouse1"] += mouse_distance;
}
if (this.InputState["Mouse2"] === 1) {
this.InputDistance["Mouse2"] += mouse_distance;
}
if (this.InputState["Touch0"] === 1) {
this.InputDistance["Touch0"] += Math.abs(this.InputDelta["Touch0X"]) + Math.abs(this.InputDelta["Touch0Y"]);
}
if (this.InputState["Touch1"] === 1) {
this.InputDistance["Touch1"] += Math.abs(this.InputDelta["Touch1X"]) + Math.abs(this.InputDelta["Touch1Y"]);
}
}
FixedUpdate(step2) {
}
FrameUpdate(delta) {
}
InputReset() {
if (this.InputDelta["Mouse0"] === -1) {
this.InputDistance["Mouse0"] = 0;
}
if (this.InputDelta["Mouse1"] === -1) {
this.InputDistance["Mouse1"] = 0;
}
if (this.InputDelta["Mouse2"] === -1) {
this.InputDistance["Mouse2"] = 0;
}
if (this.InputDelta["Touch0"] === -1) {
this.InputDistance["Touch0"] = 0;
}
if (this.InputDelta["Touch1"] === -1) {
this.InputDistance["Touch1"] = 0;
}
for (let name in this.InputDelta) {
this.InputDelta[name] = 0;
}
}
FrameReset(delta) {
this.ViewportResized = false;
let update8 = performance.now() - this.Now;
if (update_span) {
update_span.textContent = update8.toFixed(1);
}
if (delta_span) {
delta_span.textContent = (delta * 1e3).toFixed(1);
}
if (fps_span) {
fps_span.textContent = (1 / delta).toFixed();
}
}
};
var Game3D = class extends GameImpl {
constructor() {
super();
this.Canvas2D = document.querySelector("#billboard");
this.Context2D = this.Canvas2D.getContext("2d");
this.Canvas3D = document.querySelector("#scene");
this.Gl = this.Canvas3D.getContext("webgl2");
this.Audio = new AudioContext();
this.Cameras = [];
this.Targets = {};
this.Gl.enable(GL_DEPTH_TEST);
this.Gl.enable(GL_CULL_FACE);
this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
}
};
function instantiate(game2, blueprint) {
let entity = game2.World.CreateEntity();
for (let mixin of blueprint) {
mixin(game2, entity);
}
return entity;
}


function link(gl, vertex2, fragment2) {
let program = gl.createProgram();
gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex2));
gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment2));
gl.linkProgram(program);
if (false) {
throw new Error(gl.getProgramInfoLog(program));
}
return program;
}
function compile(gl, type, source) {
let shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
if (false) {
throw new Error(gl.getShaderInfoLog(shader));
}
return shader;
}


var vertex = `#version 300 es

uniform mat4 pv;
uniform vec2 sheet_size;


in vec4 attr_position;
in vec2 attr_texcoord;


in vec4 attr_rotation; 
in vec4 attr_translation; 
in vec4 attr_color;
in vec4 attr_sprite;

out vec2 vert_texcoord;
out vec4 vert_color;
out vec4 vert_sprite;

void main() {
mat4 world = mat4(
attr_rotation.xy, 0, 0,
attr_rotation.zw, 0, 0,
0, 0, 1, 0,
attr_translation.xyz, 1
);

vec4 world_position = world * attr_position;
gl_Position = pv * world_position;
if (attr_translation.w == 0.0) {
gl_Position.z = 2.0;
}



vert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;
vert_texcoord.y *= -1.0;
vert_color = attr_color;
}
`;
var fragment = `#version 300 es

precision mediump float;

uniform sampler2D sheet_texture;

in vec2 vert_texcoord;
in vec4 vert_color;

out vec4 frag_color;

void main() {
frag_color = vert_color * texture(sheet_texture, vert_texcoord);
if (frag_color.a == 0.0) {
discard;
}
}
`;
function mat_instanced2d(gl) {
let program = link(gl, vertex, fragment);
return {
Mode: GL_TRIANGLE_STRIP,
Program: program,
Locations: {
Pv: gl.getUniformLocation(program, "pv"),
World: gl.getUniformLocation(program, "world"),
SheetTexture: gl.getUniformLocation(program, "sheet_texture"),
SheetSize: gl.getUniformLocation(program, "sheet_size"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
VertexTexcoord: gl.getAttribLocation(program, "attr_texcoord"),
InstanceRotation: gl.getAttribLocation(program, "attr_rotation"),
InstanceTranslation: gl.getAttribLocation(program, "attr_translation"),
InstanceColor: gl.getAttribLocation(program, "attr_color"),
InstanceSprite: gl.getAttribLocation(program, "attr_sprite")
}
};
}


function transform_position(out, a, m) {
let x = a[0];
let y = a[1];
let z = a[2];
let w = m[3] * x + m[7] * y + m[11] * z + m[15] || 1;
out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
return out;
}


function create() {
return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function invert(out, a) {
let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
let b00 = a00 * a11 - a01 * a10;
let b01 = a00 * a12 - a02 * a10;
let b02 = a00 * a13 - a03 * a10;
let b03 = a01 * a12 - a02 * a11;
let b04 = a01 * a13 - a03 * a11;
let b05 = a02 * a13 - a03 * a12;
let b06 = a20 * a31 - a21 * a30;
let b07 = a20 * a32 - a22 * a30;
let b08 = a20 * a33 - a23 * a30;
let b09 = a21 * a32 - a22 * a31;
let b10 = a21 * a33 - a23 * a31;
let b11 = a22 * a33 - a23 * a32;
let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
if (!det) {
return null;
}
det = 1 / det;
out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
return out;
}
function multiply(out, a, b) {
let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[4];
b1 = b[5];
b2 = b[6];
b3 = b[7];
out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[8];
b1 = b[9];
b2 = b[10];
b3 = b[11];
out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
b0 = b[12];
b1 = b[13];
b2 = b[14];
b3 = b[15];
out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
return out;
}
function from_ortho(out, top, right, bottom, left, near, far) {
let lr = 1 / (left - right);
let bt = 1 / (bottom - top);
let nf = 1 / (near - far);
out[0] = -2 * lr;
out[1] = 0;
out[2] = 0;
out[3] = 0;
out[4] = 0;
out[5] = -2 * bt;
out[6] = 0;
out[7] = 0;
out[8] = 0;
out[9] = 0;
out[10] = 2 * nf;
out[11] = 0;
out[12] = (left + right) * lr;
out[13] = (top + bottom) * bt;
out[14] = (far + near) * nf;
out[15] = 1;
return out;
}


var WorldImpl = class {
constructor(capacity = 1e4) {
this.Signature = [];
this.Graveyard = [];
this.Capacity = capacity;
}
CreateEntity() {
if (this.Graveyard.length > 0) {
return this.Graveyard.pop();
}
if (false) {
throw new Error("No more entities available.");
}
return this.Signature.push(0) - 1;
}
DestroyEntity(entity) {
this.Signature[entity] = 0;
if (false) {
throw new Error("Entity already in graveyard.");
}
this.Graveyard.push(entity);
}
};


var World = class extends WorldImpl {
constructor() {
super(...arguments);
this.Camera = [];
this.CollideDynamic = [];
this.CollideStatic = [];
this.ControlAlways2D = [];
this.ControlPlayer = [];
this.ControlProcess = [];
this.Children = [];
this.Move2D = [];
this.Render2D = [];
this.RigidBody2D = [];
this.Transform2D = [];
}
};


function camera_canvas(projection, clear_color = [0.9, 0.9, 0.9, 1], clear_mask = GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT) {
return (game2, entity) => {
game2.World.Signature[entity] |= 1 /* Camera */;
game2.World.Camera[entity] = {
Kind: 0 /* Canvas */,
Projection: projection,
View: create(),
Pv: create(),
Position: [0, 0, 0],
FogColor: clear_color,
FogDistance: projection.Far,
ClearColor: clear_color,
ClearMask: clear_mask
};
};
}


var QUERY = 4096 /* Transform2D */ | 1 /* Camera */;
var CAMERA_Z = 2;
function sys_camera2d(game2, delta) {
game2.Cameras = [];
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY) === QUERY) {
let camera = game2.World.Camera[i];
if (camera.Kind !== 0 /* Canvas */) {
throw new Error("Only canvas cameras are supported.");
}
let projection = camera.Projection;
let transform2d2 = game2.World.Transform2D[i];
camera.View[0] = transform2d2.Self[0];
camera.View[1] = transform2d2.Self[1];
camera.View[4] = transform2d2.Self[2];
camera.View[5] = transform2d2.Self[3];
camera.View[12] = transform2d2.Self[4];
camera.View[13] = transform2d2.Self[5];
camera.View[14] = -CAMERA_Z;
multiply(camera.Pv, projection.Projection, camera.View);
camera.Position[0] = transform2d2.World[4];
camera.Position[1] = transform2d2.World[5];
camera.Position[2] = CAMERA_Z;
game2.Cameras.push(i);
}
}
}


function create2() {
return [1, 0, 0, 1, 0, 0];
}
function invert2(out, a) {
let aa = a[0], ab2 = a[1], ac2 = a[2], ad = a[3];
let atx = a[4], aty = a[5];
let det = aa * ad - ab2 * ac2;
if (!det) {
return null;
}
det = 1 / det;
out[0] = ad * det;
out[1] = -ab2 * det;
out[2] = -ac2 * det;
out[3] = aa * det;
out[4] = (ac2 * aty - ad * atx) * det;
out[5] = (ab2 * atx - aa * aty) * det;
return out;
}
function multiply2(out, a, b) {
let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
out[0] = a0 * b0 + a2 * b1;
out[1] = a1 * b0 + a3 * b1;
out[2] = a0 * b2 + a2 * b3;
out[3] = a1 * b2 + a3 * b3;
out[4] = a0 * b4 + a2 * b5 + a4;
out[5] = a1 * b4 + a3 * b5 + a5;
return out;
}
function compose(out, v, r, s) {
let sin = Math.sin(r);
let cos = Math.cos(r);
out[0] = cos * s[0];
out[1] = sin * s[0];
out[2] = -sin * s[1];
out[3] = cos * s[1];
out[4] = v[0];
out[5] = v[1];
return out;
}
function get_translation(out, a) {
out[0] = a[4];
out[1] = a[5];
return out;
}
function transform_point(out, a, m) {
let x = a[0];
let y = a[1];
out[0] = m[0] * x + m[2] * y + m[4];
out[1] = m[1] * x + m[3] * y + m[5];
return out;
}


function set(out, x, y) {
out[0] = x;
out[1] = y;
return out;
}
function copy(out, a) {
out[0] = a[0];
out[1] = a[1];
return out;
}
function add(out, a, b) {
out[0] = a[0] + b[0];
out[1] = a[1] + b[1];
return out;
}
function subtract(out, a, b) {
out[0] = a[0] - b[0];
out[1] = a[1] - b[1];
return out;
}
function scale(out, a, b) {
out[0] = a[0] * b;
out[1] = a[1] * b;
return out;
}
function normalize2(out, a) {
let x = a[0];
let y = a[1];
let len = x * x + y * y;
if (len > 0) {
len = 1 / Math.sqrt(len);
}
out[0] = a[0] * len;
out[1] = a[1] * len;
return out;
}
function dot(a, b) {
return a[0] * b[0] + a[1] * b[1];
}
function transform_direction(out, a, m) {
let x = a[0];
let y = a[1];
out[0] = m[0] * x + m[2] * y;
out[1] = m[1] * x + m[3] * y;
return out;
}
function length(a) {
return Math.hypot(a[0], a[1]);
}
function distance(a, b) {
let x = b[0] - a[0];
let y = b[1] - a[1];
return Math.hypot(x, y);
}
function distance_squared(a, b) {
let x = b[0] - a[0];
let y = b[1] - a[1];
return x * x + y * y;
}


var QUERY_DYNAMIC = 4096 /* Transform2D */ | 2 /* CollideDynamic */;
var QUERY_STATIC = 4096 /* Transform2D */ | 4 /* CollideStatic */;
var closest_point = [0, 0];
function sys_collide2d(game2, delta) {
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
let transform = game2.World.Transform2D[ent];
let collider = game2.World.CollideDynamic[ent];
get_translation(collider.Center, transform.World);
collider.ContactId = null;
}
}
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY_STATIC) === QUERY_STATIC) {
let transform = game2.World.Transform2D[ent];
let collider = game2.World.CollideStatic[ent];
get_translation(collider.Center, transform.World);
if (collider.Length > 0) {
transform_point(collider.Base, [0, -collider.Length / 2], transform.World);
transform_point(collider.Tip, [0, collider.Length / 2], transform.World);
} else {
transform_point(collider.Base, [collider.Length / 2, 0], transform.World);
transform_point(collider.Tip, [-collider.Length / 2, 0], transform.World);
}
for (let oth = 0; oth < game2.World.Signature.length; oth++) {
if ((game2.World.Signature[oth] & QUERY_DYNAMIC) === QUERY_DYNAMIC) {
let other_collider = game2.World.CollideDynamic[oth];
if (other_collider.Mask & collider.Layer) {
closest_point_on_section(closest_point, collider.Base, collider.Tip, other_collider.Center);
if (distance_squared(closest_point, other_collider.Center) < (collider.Radius + other_collider.Radius) ** 2) {
other_collider.ContactId = ent;
subtract(other_collider.ContactNormal, other_collider.Center, closest_point);
normalize2(other_collider.ContactNormal, other_collider.ContactNormal);
other_collider.ContactDepth = collider.Radius + other_collider.Radius - distance(closest_point, other_collider.Center);
}
}
}
}
}
}
}
var ab = [0, 0];
var ac = [0, 0];
var bc = [0, 0];
function closest_point_on_section(out, base, tip, point) {
subtract(ab, tip, base);
subtract(ac, point, base);
subtract(bc, point, tip);
let t = dot(ac, ab);
if (t <= 0) {
t = 0;
copy(out, base);
} else {
let denom = dot(ab, ab);
if (t >= denom) {
t = 1;
copy(out, tip);
} else {
t = t / denom;
scale(out, ab, t);
add(out, out, base);
}
}
return t;
}


var QUERY2 = 8 /* ControlAlways2D */ | 512 /* Move2D */;
function sys_control_always2d(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY2) === QUERY2) {
update(game2, i);
}
}
}
function update(game2, entity) {
let control = game2.World.ControlAlways2D[entity];
let move = game2.World.Move2D[entity];
if (control.Direction) {
move.Direction[0] = control.Direction[0];
move.Direction[1] = control.Direction[1];
game2.World.Signature[entity] |= 128 /* Dirty */;
}
if (control.Rotation) {
move.Rotation = control.Rotation;
game2.World.Signature[entity] |= 128 /* Dirty */;
}
}


function clamp(min, max, num) {
return Math.max(min, Math.min(max, num));
}
function map_range(value, old_min, old_max, new_min, new_max) {
return (value - old_min) / (old_max - old_min) * (new_max - new_min) + new_min;
}


var QUERY3 = 1 /* Camera */ | 16 /* ControlPlayer */;
var wheel_y_clamped = 0;
function sys_control_camera(game2, delta) {
if (game2.HoverEntity === null && game2.InputDelta["WheelY"]) {
wheel_y_clamped = clamp(-500, 500, wheel_y_clamped + game2.InputDelta["WheelY"]);
let zoom = 4 ** (wheel_y_clamped / -500);
if (0.9 < zoom && zoom < 1.1) {
zoom = 1;
}
game2.UnitSize = BASE_UNIT_SIZE * zoom;
game2.ViewportResized = true;
}
if (game2.ActiveEntity !== null) {
return;
}
if (game2.InputDelta["Mouse0"] === 1) {
document.body.classList.add("grabbing");
} else if (game2.InputDelta["Mouse0"] === -1) {
document.body.classList.remove("grabbing");
}
if (game2.InputDistance["Mouse0"] > 5) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY3) === QUERY3) {
update2(game2, i);
}
}
}
}
function update2(game2, entity) {
let entity_transform = game2.World.Transform2D[entity];
if (game2.InputDistance["Mouse0"] > 5) {
entity_transform.Translation[0] -= game2.InputDelta["MouseX"] / game2.UnitSize;
entity_transform.Translation[1] += game2.InputDelta["MouseY"] / game2.UnitSize;
game2.World.Signature[entity] |= 128 /* Dirty */;
}
}


var QUERY4 = 256 /* Grabbable */ | 4096 /* Transform2D */;
var pointer_position = [0, 0];
var pointer_offset = [0, 0];
function sys_control_grab(game2, delta) {
let camera_entity = game2.Cameras[0];
if (camera_entity === void 0) {
return;
}
let camera = game2.World.Camera[camera_entity];
if (camera.Kind === 2 /* Xr */) {
throw new Error("XR not implemented");
}
let x_ndc = game2.InputState["MouseX"] / game2.ViewportWidth * 2 - 1;
let y_ndc = -(game2.InputState["MouseY"] / game2.ViewportHeight) * 2 + 1;
let pointer3d = [x_ndc, y_ndc, 0];
transform_position(pointer3d, pointer3d, camera.Projection.Inverse);
let camera_transform = game2.World.Transform2D[camera_entity];
let pointer2d = [pointer3d[0], pointer3d[1]];
transform_point(pointer_position, pointer2d, camera_transform.World);
if (game2.ActiveEntity !== null) {
if (game2.InputDelta["Mouse0"] === -1) {
document.body.classList.remove("grabbing");
game2.ActiveEntity = null;
return;
}
let entity_transform = game2.World.Transform2D[game2.ActiveEntity];
copy(entity_transform.Translation, pointer_position);
subtract(entity_transform.Translation, entity_transform.Translation, pointer_offset);
game2.World.Signature[game2.ActiveEntity] |= 128 /* Dirty */;
return;
}
game2.HoverEntity = null;
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY4) === QUERY4) {
let entity_transform = game2.World.Transform2D[ent];
if (is_pointer_over(pointer_position, entity_transform)) {
game2.HoverEntity = ent;
document.body.classList.add("grab");
if (game2.InputDelta["Mouse0"] === 1) {
document.body.classList.add("grabbing");
game2.ActiveEntity = ent;
let dragged_transform = game2.World.Transform2D[ent];
subtract(pointer_offset, pointer_position, dragged_transform.Translation);
}
if (game2.InputDelta["WheelY"]) {
let transform = game2.World.Transform2D[ent];
transform.Rotation -= game2.InputDelta["WheelY"] * 0.1;
transform.Rotation %= 360;
game2.World.Signature[ent] |= 128 /* Dirty */;
}
return;
}
}
}
document.body.classList.remove("grab");
}
var entity_world_position = [0, 0];
function is_pointer_over(pointer_world_position, entity_transform) {
get_translation(entity_world_position, entity_transform.World);
return distance_squared(pointer_world_position, entity_world_position) < 2.9;
}


function hsva_to_vec4(h, s, v, a) {
let i = ~~(h * 6);
let f = h * 6 - i;
let p = v * (1 - s);
let q = v * (1 - f * s);
let t = v * (1 - (1 - f) * s);
switch (i % 6) {
case 0:
return [v, t, p, a];
case 1:
return [q, v, p, a];
case 2:
return [p, v, t, a];
case 3:
return [p, q, v, a];
case 4:
return [t, p, v, a];
default:
return [v, p, q, a];
}
}


var seed = 1;
function rand() {
seed = seed * 16807 % 2147483647;
return (seed - 1) / 2147483646;
}
function integer(min = 0, max = 1) {
return ~~(rand() * (max - min + 1) + min);
}
function float(min = 0, max = 1) {
return rand() * (max - min) + min;
}
function element(arr) {
return arr[integer(0, arr.length - 1)];
}


function control_process(kind) {
return (game2, entity) => {
game2.World.Signature[entity] |= 32 /* ControlProcess */;
game2.World.ControlProcess[entity] = {
Kind: kind
};
};
}


var spritesheet_exports = {};
__export(spritesheet_exports, {
"../assets/garnek11.png": () => ___assets_garnek11_png,
"../assets/garnek12.png": () => ___assets_garnek12_png,
"../assets/garnek13.png": () => ___assets_garnek13_png,
"../assets/garnek14.png": () => ___assets_garnek14_png,
"../assets/garnek21.png": () => ___assets_garnek21_png,
"../assets/garnek22.png": () => ___assets_garnek22_png,
"../assets/garnek23.png": () => ___assets_garnek23_png,
"../assets/garnek24.png": () => ___assets_garnek24_png,
"../assets/garnek2_front.png": () => ___assets_garnek2_front_png,
"../assets/platform1.png": () => ___assets_platform1_png,
"../assets/sloik.png": () => ___assets_sloik_png,
"../assets/ziemniak_kawalek1.png": () => ___assets_ziemniak_kawalek1_png,
"../assets/ziemniak_kawalek2.png": () => ___assets_ziemniak_kawalek2_png,
"../assets/ziemniak_obrany.png": () => ___assets_ziemniak_obrany_png,
"../assets/ziemniak_surowy.png": () => ___assets_ziemniak_surowy_png,
default: () => spritesheet_default
});
var ___assets_garnek11_png = {
x: 0,
y: 0,
width: 128,
height: 96
};
var ___assets_garnek12_png = {
x: 128,
y: 0,
width: 128,
height: 96
};
var ___assets_garnek13_png = {
x: 0,
y: 96,
width: 128,
height: 96
};
var ___assets_garnek14_png = {
x: 128,
y: 96,
width: 128,
height: 96
};
var ___assets_garnek21_png = {
x: 256,
y: 0,
width: 128,
height: 96
};
var ___assets_garnek22_png = {
x: 256,
y: 96,
width: 128,
height: 96
};
var ___assets_garnek23_png = {
x: 0,
y: 192,
width: 128,
height: 96
};
var ___assets_garnek24_png = {
x: 128,
y: 192,
width: 128,
height: 96
};
var ___assets_garnek2_front_png = {
x: 256,
y: 192,
width: 128,
height: 96
};
var ___assets_platform1_png = {
x: 0,
y: 288,
width: 128,
height: 32
};
var ___assets_sloik_png = {
x: 0,
y: 320,
width: 64,
height: 64
};
var ___assets_ziemniak_kawalek1_png = {
x: 192,
y: 288,
width: 16,
height: 16
};
var ___assets_ziemniak_kawalek2_png = {
x: 208,
y: 288,
width: 16,
height: 16
};
var ___assets_ziemniak_obrany_png = {
x: 128,
y: 288,
width: 32,
height: 32
};
var ___assets_ziemniak_surowy_png = {
x: 160,
y: 288,
width: 32,
height: 32
};
var spritesheet_default = {
"../assets/garnek11.png": ___assets_garnek11_png,
"../assets/garnek12.png": ___assets_garnek12_png,
"../assets/garnek13.png": ___assets_garnek13_png,
"../assets/garnek14.png": ___assets_garnek14_png,
"../assets/garnek21.png": ___assets_garnek21_png,
"../assets/garnek22.png": ___assets_garnek22_png,
"../assets/garnek23.png": ___assets_garnek23_png,
"../assets/garnek24.png": ___assets_garnek24_png,
"../assets/garnek2_front.png": ___assets_garnek2_front_png,
"../assets/platform1.png": ___assets_platform1_png,
"../assets/sloik.png": ___assets_sloik_png,
"../assets/ziemniak_kawalek1.png": ___assets_ziemniak_kawalek1_png,
"../assets/ziemniak_kawalek2.png": ___assets_ziemniak_kawalek2_png,
"../assets/ziemniak_obrany.png": ___assets_ziemniak_obrany_png,
"../assets/ziemniak_surowy.png": ___assets_ziemniak_surowy_png
};


var spritesheet = spritesheet_exports;
function render2d(sprite_name, color = [1, 1, 1, 1]) {
let sprite_path = "../assets/" + sprite_name + ".png";
return (game2, entity) => {
let instance_offset = entity * FLOATS_PER_INSTANCE;
game2.InstanceData[instance_offset + 6] = map_range(entity, 0, game2.World.Capacity, 1, 0);
game2.InstanceData[instance_offset + 7] = 1;
game2.InstanceData[instance_offset + 8] = color[0];
game2.InstanceData[instance_offset + 9] = color[1];
game2.InstanceData[instance_offset + 10] = color[2];
game2.InstanceData[instance_offset + 11] = color[3];
game2.InstanceData[instance_offset + 12] = spritesheet[sprite_path].x;
game2.InstanceData[instance_offset + 13] = spritesheet[sprite_path].y;
game2.InstanceData[instance_offset + 14] = spritesheet[sprite_path].width;
game2.InstanceData[instance_offset + 15] = spritesheet[sprite_path].height;
game2.World.Signature[entity] |= 1024 /* Render2D */;
game2.World.Render2D[entity] = {
Detail: game2.InstanceData.subarray(instance_offset + 6, instance_offset + 8),
Color: game2.InstanceData.subarray(instance_offset + 8, instance_offset + 12),
Sprite: game2.InstanceData.subarray(instance_offset + 12, instance_offset + 16)
};
};
}
function order(z) {
return (game2, entity) => {
let instance_offset = entity * FLOATS_PER_INSTANCE;
game2.InstanceData[instance_offset + 6] = z;
};
}


var QUERY5 = 32 /* ControlProcess */ | 2 /* CollideDynamic */;
function sys_control_process(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY5) === QUERY5) {
update3(game2, i);
}
}
}
var rotations = [0, 90, 180, 270];
function update3(game2, entity) {
let control = game2.World.ControlProcess[entity];
let collide = game2.World.CollideDynamic[entity];
let rigid_body = game2.World.RigidBody2D[entity];
let transform = game2.World.Transform2D[entity];
if (collide.Mask === 0 /* None */) {
switch (control.Kind) {
case 0 /* Potato */: {
collide.Mask = 2 /* Obstacle */ | 4 /* PotatoBoil */;
break;
}
}
}
if (collide.ContactId === null) {
return;
}
let other = game2.World.CollideStatic[collide.ContactId];
if (other.Layer === 2 /* Obstacle */) {
return;
}
rigid_body.VelocityResolved[0] = 0;
rigid_body.VelocityResolved[1] = 0;
switch (control.Kind) {
case 0 /* Potato */: {
if (other.Layer & 4 /* PotatoBoil */) {
render2d("ziemniak_surowy", hsva_to_vec4(float(0, 0.1), 1, 1, 1))(game2, entity);
transform.Rotation = element(rotations);
collide.Mask &= ~4 /* PotatoBoil */;
collide.Mask |= 8 /* PotatoPeel */;
break;
}
if (other.Layer & 8 /* PotatoPeel */) {
render2d("ziemniak_obrany")(game2, entity);
transform.Rotation = element(rotations);
collide.Mask &= ~8 /* PotatoPeel */;
collide.Mask |= 16 /* PotatoCut */;
break;
}
if (other.Layer & 16 /* PotatoCut */) {
render2d("ziemniak_kawalek" + integer(1, 2))(game2, entity);
transform.Scale[0] = 0.5;
transform.Scale[1] = 0.5;
transform.Rotation = element(rotations);
collide.Mask &= ~16 /* PotatoCut */;
collide.Mask |= 1 /* Bowl */;
collide.Radius = 0.5;
break;
}
break;
}
}
}


var QUERY6 = 4096 /* Transform2D */ | 512 /* Move2D */ | 128 /* Dirty */;
function sys_move2d(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY6) === QUERY6) {
update4(game2, i, delta);
}
}
}
var direction = [0, 0];
function update4(game2, entity, delta) {
let transform = game2.World.Transform2D[entity];
let move = game2.World.Move2D[entity];
if (move.Direction[0] || move.Direction[1]) {
direction[0] = move.Direction[0];
direction[1] = move.Direction[1];
let amount = Math.min(1, length(direction));
if (transform.Parent !== void 0) {
let parent = game2.World.Transform2D[transform.Parent];
transform_direction(direction, direction, parent.Self);
} else {
transform_direction(direction, direction, transform.World);
}
normalize2(direction, direction);
scale(direction, direction, amount * move.MoveSpeed * delta);
add(transform.Translation, transform.Translation, direction);
move.Direction[0] = 0;
move.Direction[1] = 0;
}
if (move.Rotation) {
transform.Rotation += move.Rotation * move.RotationSpeed * delta;
move.Rotation = 0;
}
}


function rigid_body2d(kind, friction) {
return (game2, entity) => {
game2.World.Signature[entity] |= 2048 /* RigidBody2D */;
game2.World.RigidBody2D[entity] = {
Kind: kind,
Friction: friction,
Acceleration: [0, 0],
VelocityIntegrated: [0, 0],
VelocityResolved: [0, 0]
};
};
}


var QUERY7 = 4096 /* Transform2D */ | 2048 /* RigidBody2D */;
function sys_physics2d_bounds(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY7) === QUERY7) {
update5(game2, i, delta);
}
}
}
function update5(game2, entity, delta) {
let transform = game2.World.Transform2D[entity];
let rigid_body = game2.World.RigidBody2D[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
let bottom = -game2.ViewportHeight / game2.UnitSize / 2;
let left = -game2.ViewportWidth / game2.UnitSize / 2;
if (transform.Translation[1] < bottom) {
transform.Translation[1] = bottom;
rigid_body.VelocityResolved[0] = float(-3, 3);
rigid_body.VelocityResolved[1] *= float(-1, -0.5);
}
if (transform.Translation[0] < left) {
transform.Translation[0] = left;
rigid_body.VelocityResolved[0] *= -1;
}
if (transform.Translation[0] > -left) {
transform.Translation[0] = -left;
rigid_body.VelocityResolved[0] *= -1;
}
}
}


var QUERY8 = 4096 /* Transform2D */ | 2048 /* RigidBody2D */;
var GRAVITY = -9.81;
function sys_physics2d_integrate(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY8) === QUERY8) {
update6(game2, i, delta);
}
}
}
function update6(game2, entity, delta) {
let transform = game2.World.Transform2D[entity];
let rigid_body = game2.World.RigidBody2D[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
copy(rigid_body.VelocityIntegrated, rigid_body.VelocityResolved);
rigid_body.VelocityIntegrated[1] += GRAVITY * delta;
scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
add(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
scale(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Friction);
let vel_delta = [0, 0];
scale(vel_delta, rigid_body.VelocityIntegrated, delta);
add(transform.Translation, transform.Translation, vel_delta);
game2.World.Signature[entity] |= 128 /* Dirty */;
set(rigid_body.Acceleration, 0, 0);
}
}


var QUERY9 = 4096 /* Transform2D */ | 2 /* CollideDynamic */ | 2048 /* RigidBody2D */;
function sys_physics2d_resolve(game2, delta) {
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY9) === QUERY9) {
update7(game2, ent);
}
}
}
var response_translation = [0, 0];
var response_velocity = [0, 0];
function update7(game2, entity) {
let transform = game2.World.Transform2D[entity];
let rigid_body = game2.World.RigidBody2D[entity];
let collide = game2.World.CollideDynamic[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
if (collide.ContactId !== null && game2.World.Signature[collide.ContactId] & 2048 /* RigidBody2D */) {
scale(response_translation, collide.ContactNormal, collide.ContactDepth);
add(transform.Translation, transform.Translation, response_translation);
game2.World.Signature[entity] |= 128 /* Dirty */;
let other_rigid_body = game2.World.RigidBody2D[collide.ContactId];
let response_magnitude = dot(rigid_body.VelocityIntegrated, collide.ContactNormal);
scale(response_velocity, collide.ContactNormal, -response_magnitude * other_rigid_body.Friction);
add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, response_velocity);
} else {
copy(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
}
}
}


function sys_render2d(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
let offset = i * FLOATS_PER_INSTANCE + 7;
if (game2.World.Signature[i] & 1024 /* Render2D */) {
if (game2.InstanceData[offset] == 0) {
game2.InstanceData[offset] = 1;
}
} else if (game2.InstanceData[offset] == 1) {
game2.InstanceData[offset] = 0;
}
}
for (let camera_entity of game2.Cameras) {
let camera = game2.World.Camera[camera_entity];
switch (camera.Kind) {
case 0 /* Canvas */:
game2.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
game2.Gl.viewport(0, 0, game2.ViewportWidth, game2.ViewportHeight);
game2.Gl.clearColor(...camera.ClearColor);
game2.Gl.clear(camera.ClearMask);
render_all(game2, camera);
break;
}
}
}
function render_all(game2, eye) {
let material = game2.MaterialInstanced;
let sheet = game2.Textures["spritesheet.png"];
game2.Gl.useProgram(material.Program);
game2.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game2.Gl.activeTexture(GL_TEXTURE0);
game2.Gl.bindTexture(GL_TEXTURE_2D, sheet.Texture);
game2.Gl.uniform1i(material.Locations.SheetTexture, 0);
game2.Gl.uniform2f(material.Locations.SheetSize, sheet.Width, sheet.Height);
game2.Gl.bindBuffer(GL_ARRAY_BUFFER, game2.InstanceBuffer);
game2.Gl.bufferData(GL_ARRAY_BUFFER, game2.InstanceData, GL_STREAM_DRAW);
game2.Gl.drawArraysInstanced(material.Mode, 0, 4, game2.World.Signature.length);
}


function orthographic(radius, near, far) {
return {
Kind: 1 /* Orthographic */,
Radius: radius,
Near: near,
Far: far,
Projection: create(),
Inverse: create()
};
}
function resize_ortho_constant(projection, aspect) {
from_ortho(projection.Projection, projection.Radius, projection.Radius * aspect, -projection.Radius, -projection.Radius * aspect, projection.Near, projection.Far);
invert(projection.Inverse, projection.Projection);
}


var QUERY10 = 1 /* Camera */;
function sys_resize2d(game2, delta) {
if (game2.ViewportWidth != window.innerWidth || game2.ViewportHeight != window.innerHeight) {
game2.ViewportResized = true;
}
if (game2.ViewportResized) {
game2.ViewportWidth = game2.Canvas3D.width = game2.Canvas2D.width = window.innerWidth;
game2.ViewportHeight = game2.Canvas3D.height = game2.Canvas2D.height = window.innerHeight;
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY10) === QUERY10) {
let camera = game2.World.Camera[i];
if (camera.Kind == 0 /* Canvas */ && camera.Projection.Kind == 1 /* Orthographic */) {
camera.Projection.Radius = game2.ViewportHeight / game2.UnitSize / 2;
let aspect = game2.ViewportWidth / game2.ViewportHeight;
resize_ortho_constant(camera.Projection, aspect);
break;
}
}
}
}
}


var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;


var QUERY11 = 4096 /* Transform2D */ | 128 /* Dirty */;
function sys_transform2d(game2, delta) {
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY11) === QUERY11) {
let transform = game2.World.Transform2D[ent];
update_transform(game2.World, ent, transform);
}
}
}
var world_position = [0, 0];
function update_transform(world, entity, transform) {
world.Signature[entity] &= ~128 /* Dirty */;
compose(transform.World, transform.Translation, transform.Rotation * DEG_TO_RAD, transform.Scale);
if (transform.Parent !== void 0) {
let parent_transform = world.Transform2D[transform.Parent];
multiply2(transform.World, parent_transform.World, transform.World);
if (transform.Gyroscope) {
get_translation(world_position, transform.World);
compose(transform.World, world_position, transform.Rotation * DEG_TO_RAD, transform.Scale);
}
}
invert2(transform.Self, transform.World);
if (world.Signature[entity] & 64 /* Children */) {
let children2 = world.Children[entity];
for (let i = 0; i < children2.Children.length; i++) {
let child = children2.Children[i];
if (world.Signature[child] & 4096 /* Transform2D */) {
let child_transform = world.Transform2D[child];
child_transform.Parent = entity;
update_transform(world, child, child_transform);
}
}
}
}


var WORLD_CAPACITY = 50100;
var FLOATS_PER_INSTANCE = 16;
var BYTES_PER_INSTANCE = FLOATS_PER_INSTANCE * 4;
var BASE_UNIT_SIZE = 32;
var Game5 = class extends Game3D {
constructor() {
super();
this.World = new World(WORLD_CAPACITY);
this.MaterialInstanced = mat_instanced2d(this.Gl);
this.Textures = {};
this.UnitSize = BASE_UNIT_SIZE;
this.HoverEntity = null;
this.ActiveEntity = null;
this.InstanceData = new Float32Array(this.World.Capacity * FLOATS_PER_INSTANCE);
this.InstanceBuffer = this.Gl.createBuffer();
this.Gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, true);
let material = this.MaterialInstanced;
let vertex_buf = this.Gl.createBuffer();
this.Gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
this.Gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
this.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
this.Gl.vertexAttribPointer(material.Locations.VertexPosition, 3, GL_FLOAT, false, 4 * 5, 0);
this.Gl.enableVertexAttribArray(material.Locations.VertexTexcoord);
this.Gl.vertexAttribPointer(material.Locations.VertexTexcoord, 2, GL_FLOAT, false, 4 * 5, 4 * 3);
this.Gl.bindBuffer(GL_ARRAY_BUFFER, this.InstanceBuffer);
this.Gl.bufferData(GL_ARRAY_BUFFER, this.World.Capacity * BYTES_PER_INSTANCE, GL_STREAM_DRAW);
this.Gl.enableVertexAttribArray(material.Locations.InstanceRotation);
this.Gl.vertexAttribDivisor(material.Locations.InstanceRotation, 1);
this.Gl.vertexAttribPointer(material.Locations.InstanceRotation, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 0);
this.Gl.enableVertexAttribArray(material.Locations.InstanceTranslation);
this.Gl.vertexAttribDivisor(material.Locations.InstanceTranslation, 1);
this.Gl.vertexAttribPointer(material.Locations.InstanceTranslation, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 4);
this.Gl.enableVertexAttribArray(material.Locations.InstanceColor);
this.Gl.vertexAttribDivisor(material.Locations.InstanceColor, 1);
this.Gl.vertexAttribPointer(material.Locations.InstanceColor, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 8);
this.Gl.enableVertexAttribArray(material.Locations.InstanceSprite);
this.Gl.vertexAttribDivisor(material.Locations.InstanceSprite, 1);
this.Gl.vertexAttribPointer(material.Locations.InstanceSprite, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 12);
}
FixedUpdate(delta) {
sys_control_grab(this, delta);
sys_control_camera(this, delta);
sys_physics2d_bounds(this, delta);
sys_physics2d_integrate(this, delta);
sys_transform2d(this, delta);
sys_collide2d(this, delta);
sys_physics2d_resolve(this, delta);
sys_transform2d(this, delta);
sys_control_process(this, delta);
}
FrameUpdate(delta) {
sys_control_always2d(this, delta);
sys_move2d(this, delta);
sys_resize2d(this, delta);
sys_camera2d(this, delta);
sys_render2d(this, delta);
}
};
var vertex_arr = Float32Array.from([
-0.5,
-0.5,
0,
0,
1,
0.5,
-0.5,
0,
1,
1,
-0.5,
0.5,
0,
0,
0,
0.5,
0.5,
0,
1,
0
]);


function children(...blueprints) {
return (game2, entity) => {
if (game2.World.Signature[entity] & 64 /* Children */) {
} else {
game2.World.Signature[entity] |= 64 /* Children */;
game2.World.Children[entity] = {
Children: []
};
}
let child_entities = game2.World.Children[entity].Children;
for (let blueprint of blueprints) {
let child = instantiate(game2, blueprint);
child_entities.push(child);
}
};
}


function collide_dynamic(diameter, mask) {
return (game2, entity) => {
game2.World.Signature[entity] |= 2 /* CollideDynamic */;
game2.World.CollideDynamic[entity] = {
EntityId: entity,
Mask: mask,
Radius: diameter / 2,
Center: [0, 0],
ContactId: null,
ContactNormal: [0, 0],
ContactDepth: 0
};
};
}
function collide_static(layer, diameter, length2 = 0) {
return (game2, entity) => {
game2.World.Signature[entity] |= 4 /* CollideStatic */;
game2.World.CollideStatic[entity] = {
EntityId: entity,
Layer: layer,
Radius: diameter / 2,
Length: length2,
Center: [0, 0],
Tip: [0, 0],
Base: [0, 0]
};
};
}


function control_player() {
return (game2, entity) => {
game2.World.Signature[entity] |= 16 /* ControlPlayer */;
game2.World.ControlPlayer[entity] = {};
};
}


function grabbable() {
return (game2, entity) => {
game2.World.Signature[entity] |= 256 /* Grabbable */;
};
}


function transform2d(translation = [0, 0], rotation = 0, scale2 = [1, 1]) {
return (game2, entity) => {
game2.World.Signature[entity] |= 4096 /* Transform2D */ | 128 /* Dirty */;
game2.World.Transform2D[entity] = {
World: game2.InstanceData.subarray(entity * FLOATS_PER_INSTANCE, entity * FLOATS_PER_INSTANCE + 6),
Self: create2(),
Translation: translation,
Rotation: rotation,
Scale: scale2,
Gyroscope: false
};
};
}


function scene_stage(game2) {
game2.World = new World(WORLD_CAPACITY);
game2.ViewportResized = true;
instantiate(game2, [
transform2d([0, 0]),
camera_canvas(orthographic(5, 1, 3)),
control_player()
]);
instantiate(game2, [
transform2d([0, 5], 0, [4, 3]),
render2d("garnek2_front"),
order(1),
collide_static(4 /* PotatoBoil */, 1),
grabbable(),
children([transform2d(), render2d("garnek21"), order(0)], [
transform2d([-0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
], [
transform2d([0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
])
]);
instantiate(game2, [
transform2d([0, 0], 0, [4, 3]),
render2d("garnek2_front"),
order(1),
collide_static(8 /* PotatoPeel */, 1),
grabbable(),
children([transform2d(), render2d("garnek21"), order(0)], [
transform2d([-0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
], [
transform2d([0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
])
]);
instantiate(game2, [
transform2d([0, -5], 0, [4, 3]),
render2d("garnek2_front"),
order(1),
collide_static(16 /* PotatoCut */, 1),
grabbable(),
children([transform2d(), render2d("garnek21"), order(0)], [
transform2d([-0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
], [
transform2d([0.3, 0]),
collide_static(2 /* Obstacle */, 0.3, 0.25),
rigid_body2d(0 /* Static */, 1)
])
]);
instantiate(game2, [
transform2d([-2.5, 10], -45, [4, 1]),
render2d("platform1"),
collide_static(2 /* Obstacle */, 1, -0.65),
rigid_body2d(0 /* Static */, 1.3),
grabbable()
]);
instantiate(game2, [
transform2d([2.5, 10], 45, [4, 1]),
render2d("platform1"),
collide_static(2 /* Obstacle */, 1, -0.65),
rigid_body2d(0 /* Static */, 1.3),
grabbable()
]);
let dynamic_count = 1e4;
for (let i = 0; i < dynamic_count; i++) {
instantiate(game2, [
transform2d([float(-3, 3), float(20, 100)], 0),
render2d("ziemniak_surowy", hsva_to_vec4(float(0.1, 0.15), float(0, 0.5), float(0.5, 1), 1)),
control_process(0 /* Potato */),
collide_dynamic(1, 0 /* None */),
rigid_body2d(1 /* Dynamic */, float(0.99, 0.999))
]);
}
}


var game = new Game5();
window.game = game;
Promise.all([load_texture(game, "spritesheet.png")]).then(() => {
scene_stage(game);
game.Start();
});
async function load_texture(game2, name) {
let image = await fetch_image("../textures/" + name + ".webp");
game2.Textures[name] = create_texture_from(game2.Gl, image);
}
})();