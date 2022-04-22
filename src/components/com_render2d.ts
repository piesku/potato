import {Vec4} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import * as _spritesheet from "../../textures/spritesheet.json";
import {FLOATS_PER_INSTANCE, Game} from "../game.js";
import {Has} from "../world.js";

export interface Render2D {
    Detail: Float32Array;
    Color: Float32Array;
    Sprite: Float32Array;
}

const spritesheet: {
    [key: string]: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
} = _spritesheet;

export function render2d(sprite_name: string, color: Vec4 = [1, 1, 1, 1]) {
    let sprite_path = "../assets/" + sprite_name + ".png";
    return (game: Game, entity: Entity) => {
        let instance_offset = entity * FLOATS_PER_INSTANCE;
        // Detail.
        game.InstanceData[instance_offset + 6] = 0;
        game.InstanceData[instance_offset + 7] = 1; // Has.Render2D
        // Color.
        game.InstanceData[instance_offset + 8] = color[0];
        game.InstanceData[instance_offset + 9] = color[1];
        game.InstanceData[instance_offset + 10] = color[2];
        game.InstanceData[instance_offset + 11] = color[3];
        // Sprite.
        game.InstanceData[instance_offset + 12] = spritesheet[sprite_path].x;
        game.InstanceData[instance_offset + 13] = spritesheet[sprite_path].y;
        game.InstanceData[instance_offset + 14] = spritesheet[sprite_path].width;
        game.InstanceData[instance_offset + 15] = spritesheet[sprite_path].height;

        game.World.Signature[entity] |= Has.Render2D;
        game.World.Render2D[entity] = {
            Detail: game.InstanceData.subarray(instance_offset + 6, instance_offset + 8),
            Color: game.InstanceData.subarray(instance_offset + 8, instance_offset + 12),
            Sprite: game.InstanceData.subarray(instance_offset + 12, instance_offset + 16),
        };
    };
}

export function order(z: number) {
    return (game: Game, entity: Entity) => {
        let instance_offset = entity * FLOATS_PER_INSTANCE;
        game.InstanceData[instance_offset + 6] = z;
    };
}
