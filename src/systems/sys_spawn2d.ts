/**
 * @module systems/sys_spawn2d
 */

import {instantiate} from "../../common/game.js";
import {get_translation} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {transform2d} from "../components/com_transform2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Spawn;

export function sys_spawn2d(game: Game, delta: number) {
    let spawned_this_frame = 0;
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            if (spawned_this_frame < game.spawnCount) {
                update(game, i, delta);
                spawned_this_frame++;
            } else {
                return;
            }
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let spawn = game.World.Spawn[entity];

    spawn.SinceLast += delta;
    if (spawn.SinceLast > game.spawnInterval) {
        spawn.SinceLast = 0;

        let entity_transform = game.World.Transform2D[entity];
        let world_position: Vec2 = [0, 0];
        get_translation(world_position, entity_transform.World);

        instantiate(game, [...spawn.Creator(game), transform2d(world_position, 0)]);
    }
}
