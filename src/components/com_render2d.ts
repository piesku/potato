import {Vec2, Vec4} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {FLOATS_PER_INSTANCE, Game} from "../game.js";
import {Has} from "../world.js";

export interface Render2D {
    Detail: Float32Array;
    Color: Float32Array;
    Sprite: Float32Array;
}

export function render2d(sheet_size: Vec2, sprite_offset: Vec2, color: Vec4 = [1, 1, 1, 1]) {
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
        game.InstanceData[instance_offset + 12] = sprite_offset[0];
        // Flip the Y offset; sprite_offset is +Y=down, while texcoords are +Y=up.
        game.InstanceData[instance_offset + 13] = sheet_size[1] - sprite_offset[1] - 1;
        game.InstanceData[instance_offset + 14] = sheet_size[0];
        game.InstanceData[instance_offset + 15] = sheet_size[1];

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
