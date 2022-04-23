import {Game3D} from "../common/game.js";
import {Texture} from "../common/texture.js";
import {
    GL_ARRAY_BUFFER,
    GL_FLOAT,
    GL_STATIC_DRAW,
    GL_STREAM_DRAW,
    GL_UNPACK_FLIP_Y_WEBGL,
} from "../common/webgl.js";
import {Entity} from "../common/world.js";
import {mat_instanced2d} from "./materials/mat_instanced2d.js";
import {sys_camera2d} from "./systems/sys_camera2d.js";
import {sys_collide2d} from "./systems/sys_collide2d.js";
import {sys_control_always2d} from "./systems/sys_control_always2d.js";
import {sys_control_camera} from "./systems/sys_control_camera.js";
import {sys_control_grab} from "./systems/sys_control_grab.js";
import {sys_control_process} from "./systems/sys_control_process.js";
import {sys_draw_background} from "./systems/sys_draw_background.js";
import {sys_move2d} from "./systems/sys_move2d.js";
import {sys_physics2d_bounds} from "./systems/sys_physics2d_bounds.js";
import {sys_physics2d_integrate} from "./systems/sys_physics2d_integrate.js";
import {sys_physics2d_resolve} from "./systems/sys_physics2d_resolve.js";
import {sys_render2d} from "./systems/sys_render2d.js";
import {sys_resize2d} from "./systems/sys_resize2d.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {World} from "./world.js";

export const WORLD_CAPACITY = 50_100;
export const FLOATS_PER_INSTANCE = 16;
export const BYTES_PER_INSTANCE = FLOATS_PER_INSTANCE * 4;
export const BASE_UNIT_SIZE = 32;

export class Game extends Game3D {
    World = new World(WORLD_CAPACITY);

    MaterialInstanced = mat_instanced2d(this.Gl);
    Textures: Record<string, Texture> = {};

    UnitSize = BASE_UNIT_SIZE;

    HoverEntity: Entity | null = null;
    ActiveEntity: Entity | null = null;

    /**
     * A typed array with instance data, suitable for passing to `gl.bufferData`.
     * Each instance is FLOATS_PER_INSTANCE floats long; see Instance2DLayout.
     */
    InstanceData = new Float32Array(this.World.Capacity * FLOATS_PER_INSTANCE);
    InstanceBuffer = this.Gl.createBuffer()!;

    constructor() {
        super();

        this.Gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, true);

        let material = this.MaterialInstanced;

        // Vertex positions and texture coordinates.
        let vertex_buf = this.Gl.createBuffer()!;
        this.Gl.bindBuffer(GL_ARRAY_BUFFER, vertex_buf);
        this.Gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
        this.Gl.enableVertexAttribArray(material.Locations.VertexPosition);
        this.Gl.vertexAttribPointer(
            material.Locations.VertexPosition,
            3,
            GL_FLOAT,
            false,
            4 * 5,
            0
        );
        this.Gl.enableVertexAttribArray(material.Locations.VertexTexcoord);
        this.Gl.vertexAttribPointer(
            material.Locations.VertexTexcoord,
            2,
            GL_FLOAT,
            false,
            4 * 5,
            4 * 3
        );

        // Instance data.
        this.Gl.bindBuffer(GL_ARRAY_BUFFER, this.InstanceBuffer);
        this.Gl.bufferData(
            GL_ARRAY_BUFFER,
            this.World.Capacity * BYTES_PER_INSTANCE,
            GL_STREAM_DRAW
        );

        this.Gl.enableVertexAttribArray(material.Locations.InstanceRotation);
        this.Gl.vertexAttribDivisor(material.Locations.InstanceRotation, 1);
        this.Gl.vertexAttribPointer(
            material.Locations.InstanceRotation,
            4,
            GL_FLOAT,
            false,
            BYTES_PER_INSTANCE,
            0
        );

        this.Gl.enableVertexAttribArray(material.Locations.InstanceTranslation);
        this.Gl.vertexAttribDivisor(material.Locations.InstanceTranslation, 1);
        this.Gl.vertexAttribPointer(
            material.Locations.InstanceTranslation,
            4,
            GL_FLOAT,
            false,
            BYTES_PER_INSTANCE,
            4 * 4
        );

        this.Gl.enableVertexAttribArray(material.Locations.InstanceColor);
        this.Gl.vertexAttribDivisor(material.Locations.InstanceColor, 1);
        this.Gl.vertexAttribPointer(
            material.Locations.InstanceColor,
            4,
            GL_FLOAT,
            false,
            BYTES_PER_INSTANCE,
            4 * 8
        );

        this.Gl.enableVertexAttribArray(material.Locations.InstanceSprite);
        this.Gl.vertexAttribDivisor(material.Locations.InstanceSprite, 1);
        this.Gl.vertexAttribPointer(
            material.Locations.InstanceSprite,
            4,
            GL_FLOAT,
            false,
            BYTES_PER_INSTANCE,
            4 * 12
        );
    }

    override FixedUpdate(delta: number) {
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

    override FrameUpdate(delta: number) {
        sys_control_always2d(this, delta);

        sys_move2d(this, delta);

        sys_resize2d(this, delta);
        sys_camera2d(this, delta);

        sys_draw_background(this, delta);
        sys_render2d(this, delta);
    }
}

// prettier-ignore
let vertex_arr = Float32Array.from([
    -0.5, -0.5, 0,    0, 1,    // SW
    0.5, -0.5, 0,     1, 1,    // SE
    -0.5, 0.5, 0,     0, 0,    // NW
    0.5, 0.5, 0,      1, 0     // NE
]);

export const enum Layer {
    None,
    Bowl = 1 << 0,
    Obstacle = 1 << 1,
    PotatoBoil = 1 << 2,
    PotatoPeel = 1 << 3,
    PotatoCut = 1 << 4,
}
