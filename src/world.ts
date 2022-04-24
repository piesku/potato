import {WorldImpl} from "../common/world.js";
import {AnimateSprite} from "./components/com_animate_sprite.js";
import {Camera} from "./components/com_camera.js";
import {Children} from "./components/com_children.js";
import {CollideDynamic, CollideStatic} from "./components/com_collide2d.js";
import {ControlAlways2D} from "./components/com_control_always2d.js";
import {ControlPlayer} from "./components/com_control_player.js";
import {ControlProcess} from "./components/com_control_process.js";
import {Move2D} from "./components/com_move2d.js";
import {Render2D} from "./components/com_render2d.js";
import {RigidBody2D} from "./components/com_rigid_body2d.js";
import {Transform2D} from "./components/com_transform2d.js";

const enum Component {
    AnimateSprite,
    Camera,
    CollideDynamic,
    CollideStatic,
    ControlAlways2D,
    ControlPlayer,
    ControlProcess,
    Children,
    Dirty,
    Grabbable,
    Move2D,
    Render2D,
    RigidBody2D,
    Transform2D,
}

export const enum Has {
    None = 0,
    AnimateSprite = 1 << Component.AnimateSprite,
    Camera = 1 << Component.Camera,
    CollideDynamic = 1 << Component.CollideDynamic,
    CollideStatic = 1 << Component.CollideStatic,
    ControlAlways2D = 1 << Component.ControlAlways2D,
    ControlPlayer = 1 << Component.ControlPlayer,
    ControlProcess = 1 << Component.ControlProcess,
    Children = 1 << Component.Children,
    Dirty = 1 << Component.Dirty,
    Grabbable = 1 << Component.Grabbable,
    Move2D = 1 << Component.Move2D,
    Render2D = 1 << Component.Render2D,
    RigidBody2D = 1 << Component.RigidBody2D,
    Transform2D = 1 << Component.Transform2D,
}

export class World extends WorldImpl {
    AnimateSprite: Array<AnimateSprite> = [];
    Camera: Array<Camera> = [];
    CollideDynamic: Array<CollideDynamic> = [];
    CollideStatic: Array<CollideStatic> = [];
    ControlAlways2D: Array<ControlAlways2D> = [];
    ControlPlayer: Array<ControlPlayer> = [];
    ControlProcess: Array<ControlProcess> = [];
    Children: Array<Children> = [];
    Move2D: Array<Move2D> = [];
    Render2D: Array<Render2D> = [];
    RigidBody2D: Array<RigidBody2D> = [];
    Transform2D: Array<Transform2D> = [];
}
