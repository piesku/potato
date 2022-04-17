(() => {

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
var GL_NEAREST_MIPMAP_NEAREST = 9984;
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
gl.generateMipmap(GL_TEXTURE_2D);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST_MIPMAP_NEAREST);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
return texture;
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
MouseY: 0
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
this.InputState["MouseX"] = evt.clientX;
this.InputState["MouseY"] = evt.clientY;
this.InputDelta["MouseX"] = evt.movementX;
this.InputDelta["MouseY"] = evt.movementY;
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
FrameReset(delta) {
this.ViewportResized = false;
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
let update5 = performance.now() - this.Now;
if (update_span) {
update_span.textContent = update5.toFixed(1);
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
FrameSetup(delta) {
super.FrameSetup(delta);
this.Cameras = [];
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

vert_texcoord = (attr_sprite.xy + attr_texcoord) / attr_sprite.zw;
vert_color = attr_color;
}
`;
var fragment = `#version 300 es

precision mediump float;

uniform sampler2D sheet;

in vec2 vert_texcoord;
in vec4 vert_color;

out vec4 frag_color;

void main() {
frag_color = vert_color * texture(sheet, vert_texcoord);
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
SpriteSheet: gl.getUniformLocation(program, "sheet"),
VertexPosition: gl.getAttribLocation(program, "attr_position"),
VertexTexcoord: gl.getAttribLocation(program, "attr_texcoord"),
InstanceRotation: gl.getAttribLocation(program, "attr_rotation"),
InstanceTranslation: gl.getAttribLocation(program, "attr_translation"),
InstanceColor: gl.getAttribLocation(program, "attr_color"),
InstanceSprite: gl.getAttribLocation(program, "attr_sprite")
}
};
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
this.ControlAlways2D = [];
this.ControlPlayer = [];
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


var QUERY = 256 /* Transform2D */ | 1 /* Camera */;
var CAMERA_Z = 2;
function sys_camera2d(game2, delta) {
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


var QUERY2 = 2 /* ControlAlways2D */ | 32 /* Move2D */;
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
game2.World.Signature[entity] |= 16 /* Dirty */;
}
if (control.Rotation) {
move.Rotation = control.Rotation;
game2.World.Signature[entity] |= 16 /* Dirty */;
}
}


function set(out, x, y) {
out[0] = x;
out[1] = y;
return out;
}
function add(out, a, b) {
out[0] = a[0] + b[0];
out[1] = a[1] + b[1];
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


var QUERY3 = 256 /* Transform2D */ | 32 /* Move2D */ | 16 /* Dirty */;
function sys_move2d(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY3) === QUERY3) {
update2(game2, i, delta);
}
}
}
var direction = [0, 0];
function update2(game2, entity, delta) {
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


function rigid_body2d(kind, friction) {
return (game2, entity) => {
game2.World.Signature[entity] |= 128 /* RigidBody2D */;
game2.World.RigidBody2D[entity] = {
Kind: kind,
Friction: friction,
Acceleration: [0, 0],
VelocityIntegrated: [0, 0]
};
};
}


var QUERY4 = 256 /* Transform2D */ | 128 /* RigidBody2D */;
function sys_physics2d_bounds(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY4) === QUERY4) {
update3(game2, i, delta);
}
}
}
function update3(game2, entity, delta) {
let transform = game2.World.Transform2D[entity];
let rigid_body = game2.World.RigidBody2D[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
let bottom = -game2.ViewportHeight / 2 / UNIT_PX;
let left = -game2.ViewportWidth / 2 / UNIT_PX;
if (transform.Translation[1] < bottom) {
transform.Translation[1] = bottom;
rigid_body.VelocityIntegrated[1] *= float(-3, -1);
}
}
}


var QUERY5 = 256 /* Transform2D */ | 128 /* RigidBody2D */;
var GRAVITY = -9.81;
function sys_physics2d_integrate(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY5) === QUERY5) {
update4(game2, i, delta);
}
}
}
function update4(game2, entity, delta) {
let transform = game2.World.Transform2D[entity];
let rigid_body = game2.World.RigidBody2D[entity];
if (rigid_body.Kind === 1 /* Dynamic */) {
rigid_body.VelocityIntegrated[1] += GRAVITY * delta;
scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
add(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Acceleration);
scale(rigid_body.VelocityIntegrated, rigid_body.VelocityIntegrated, rigid_body.Friction);
let vel_delta = [0, 0];
scale(vel_delta, rigid_body.VelocityIntegrated, delta);
add(transform.Translation, transform.Translation, vel_delta);
game2.World.Signature[entity] |= 16 /* Dirty */;
set(rigid_body.Acceleration, 0, 0);
}
}


function sys_render2d(game2, delta) {
for (let i = 0; i < game2.World.Signature.length; i++) {
let offset = i * FLOATS_PER_INSTANCE + 7;
if (game2.World.Signature[i] & 64 /* Render2D */) {
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
game2.Gl.useProgram(material.Program);
game2.Gl.uniformMatrix4fv(material.Locations.Pv, false, eye.Pv);
game2.Gl.activeTexture(GL_TEXTURE0);
game2.Gl.bindTexture(GL_TEXTURE_2D, game2.Textures["spritesheet.png"]);
game2.Gl.uniform1i(material.Locations.SpriteSheet, 0);
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


var QUERY6 = 1 /* Camera */;
function sys_resize2d(game2, delta) {
if (game2.ViewportWidth != window.innerWidth || game2.ViewportHeight != window.innerHeight) {
game2.ViewportResized = true;
}
if (game2.ViewportResized) {
game2.ViewportWidth = game2.Canvas3D.width = game2.Canvas2D.width = window.innerWidth;
game2.ViewportHeight = game2.Canvas3D.height = game2.Canvas2D.height = window.innerHeight;
for (let i = 0; i < game2.World.Signature.length; i++) {
if ((game2.World.Signature[i] & QUERY6) === QUERY6) {
let camera = game2.World.Camera[i];
if (camera.Kind == 0 /* Canvas */ && camera.Projection.Kind == 1 /* Orthographic */) {
camera.Projection.Radius = game2.ViewportHeight / UNIT_PX / 2;
let aspect = game2.ViewportWidth / game2.ViewportHeight;
resize_ortho_constant(camera.Projection, aspect);
break;
}
}
}
}
}


function create2() {
return [1, 0, 0, 1, 0, 0];
}
function invert2(out, a) {
let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
let atx = a[4], aty = a[5];
let det = aa * ad - ab * ac;
if (!det) {
return null;
}
det = 1 / det;
out[0] = ad * det;
out[1] = -ab * det;
out[2] = -ac * det;
out[3] = aa * det;
out[4] = (ac * aty - ad * atx) * det;
out[5] = (ab * atx - aa * aty) * det;
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


var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;


var QUERY7 = 256 /* Transform2D */ | 16 /* Dirty */;
function sys_transform2d(game2, delta) {
for (let ent = 0; ent < game2.World.Signature.length; ent++) {
if ((game2.World.Signature[ent] & QUERY7) === QUERY7) {
let transform = game2.World.Transform2D[ent];
update_transform(game2.World, ent, transform);
}
}
}
var world_position = [0, 0];
function update_transform(world, entity, transform) {
world.Signature[entity] &= ~16 /* Dirty */;
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
if (world.Signature[entity] & 8 /* Children */) {
let children = world.Children[entity];
for (let i = 0; i < children.Children.length; i++) {
let child = children.Children[i];
if (world.Signature[child] & 256 /* Transform2D */) {
let child_transform = world.Transform2D[child];
child_transform.Parent = entity;
update_transform(world, child, child_transform);
}
}
}
}


var WORLD_CAPACITY = 50001;
var FLOATS_PER_INSTANCE = 16;
var BYTES_PER_INSTANCE = FLOATS_PER_INSTANCE * 4;
var UNIT_PX = 32;
var Game4 = class extends Game3D {
constructor() {
super();
this.World = new World(WORLD_CAPACITY);
this.MaterialInstanced = mat_instanced2d(this.Gl);
this.Textures = {};
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
FrameUpdate(delta) {
sys_resize2d(this, delta);
sys_camera2d(this, delta);
sys_control_always2d(this, delta);
sys_move2d(this, delta);
sys_physics2d_integrate(this, delta);
sys_transform2d(this, delta);
sys_physics2d_bounds(this, delta);
sys_render2d(this, delta);
}
};
var vertex_arr = Float32Array.from([
-0.5,
-0.5,
0,
0,
0,
0.5,
-0.5,
0,
1,
0,
-0.5,
0.5,
0,
0,
1,
0.5,
0.5,
0,
1,
1
]);


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


function render2d(sheet_size, sprite_offset, color = [1, 1, 1, 1]) {
return (game2, entity) => {
let instance_offset = entity * FLOATS_PER_INSTANCE;
game2.InstanceData[instance_offset + 6] = 0;
game2.InstanceData[instance_offset + 7] = 1;
game2.InstanceData[instance_offset + 8] = color[0];
game2.InstanceData[instance_offset + 9] = color[1];
game2.InstanceData[instance_offset + 10] = color[2];
game2.InstanceData[instance_offset + 11] = color[3];
game2.InstanceData[instance_offset + 12] = sprite_offset[0];
game2.InstanceData[instance_offset + 13] = sheet_size[1] - sprite_offset[1] - 1;
game2.InstanceData[instance_offset + 14] = sheet_size[0];
game2.InstanceData[instance_offset + 15] = sheet_size[1];
game2.World.Signature[entity] |= 64 /* Render2D */;
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


function transform2d(translation = [0, 0], rotation = 0, scale2 = [1, 1]) {
return (game2, entity) => {
game2.World.Signature[entity] |= 256 /* Transform2D */ | 16 /* Dirty */;
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
instantiate(game2, [transform2d([0, 0]), camera_canvas(orthographic(5, 1, 3))]);
let dynamic_count = 5e3;
for (let i = 0; i < dynamic_count; i++) {
instantiate(game2, [
transform2d([float(-10, 10), float(9, 10)], 0),
render2d([8, 8], [integer(0, 1), 0], hsva_to_vec4(float(0.1, 0.2), 0.5, 1, 1)),
order(1 - i / dynamic_count),
rigid_body2d(1 /* Dynamic */, float(0.98, 0.99))
]);
}
}


var game = new Game4();
window.game = game;
Promise.all([load_texture(game, "checker1.png"), load_texture(game, "spritesheet.png")]).then(() => {
scene_stage(game);
game.Start();
});
async function load_texture(game2, name) {
let image = await fetch_image("../textures/" + name + ".webp");
game2.Textures[name] = create_texture_from(game2.Gl, image);
}
})();
