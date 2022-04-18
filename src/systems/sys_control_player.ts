/**
 * @module systems/sys_control_player
 */

import {Entity} from "../../common/world.js";
import {Game, UNIT_PX} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;

export function sys_control_player(game: Game, delta: number) {
    if (game.InputDistance["Mouse0"] > 10) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY) === QUERY) {
                update(game, i);
            }
        }

        document.body.classList.add("grabbing");
    } else if (game.InputDelta["Mouse0"] === -1) {
        document.body.classList.remove("grabbing");
    }
}

function update(game: Game, entity: Entity) {
    let entity_transform = game.World.Transform2D[entity];
    if (game.InputDistance["Mouse0"] > 10) {
        entity_transform.Translation[0] -= game.InputDelta["MouseX"] / UNIT_PX / 2;
        entity_transform.Translation[1] += game.InputDelta["MouseY"] / UNIT_PX / 2;
        game.World.Signature[entity] |= Has.Dirty;
    }
}
