/**
 * @module systems/sys_control_player
 */

import {clamp} from "../../common/number.js";
import {Entity} from "../../common/world.js";
import {BASE_UNIT_SIZE, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;
let wheel_y_clamped = 0;

export function sys_control_player(game: Game, delta: number) {
    if (game.InputDelta["Mouse0"] === 1) {
        document.body.classList.add("grabbing");
    } else if (game.InputDelta["Mouse0"] === -1) {
        document.body.classList.remove("grabbing");
    }

    if (game.InputDelta["WheelY"]) {
        wheel_y_clamped = clamp(-500, 500, wheel_y_clamped + game.InputDelta["WheelY"]);
        let zoom = 4 ** (wheel_y_clamped / -500);
        if (0.9 < zoom && zoom < 1.1) {
            zoom = 1;
        }
        game.UnitSize = BASE_UNIT_SIZE * zoom;
        game.ViewportResized = true;
    }

    if (game.InputDistance["Mouse0"] > 5) {
        for (let i = 0; i < game.World.Signature.length; i++) {
            if ((game.World.Signature[i] & QUERY) === QUERY) {
                update(game, i);
            }
        }
    }
}

function update(game: Game, entity: Entity) {
    let entity_transform = game.World.Transform2D[entity];
    if (game.InputDistance["Mouse0"] > 5) {
        entity_transform.Translation[0] -= game.InputDelta["MouseX"] / game.UnitSize;
        entity_transform.Translation[1] += game.InputDelta["MouseY"] / game.UnitSize;
        game.World.Signature[entity] |= Has.Dirty;
    }
}
