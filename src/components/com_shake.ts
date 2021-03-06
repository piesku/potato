/**
 * @module components/com_shake
 */

import {Vec2} from "../../common/math.js";
import {Entity} from "../../common/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Shake {
    Magnitude: Vec2;
}

/**
 * sys_shake modifies the transform of the entity. Add it to children only.
 */
export function shake(magnitude: Vec2) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Shake;
        game.World.Shake[entity] = {
            Magnitude: magnitude,
        };
    };
}
