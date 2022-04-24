/**
 * @module systems/sys_control_always2d
 */

import {hsva_to_vec4} from "../../common/color.js";
import {element, float, integer} from "../../common/random.js";
import {Entity} from "../../common/world.js";
import {set_color, set_sprite} from "../components/com_render2d.js";
import {Game, Layer} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlProcess | Has.CollideDynamic;

export function sys_control_process(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

const rotations = [0, 90, 180, 270];

function update(game: Game, entity: Entity) {
    let control = game.World.ControlProcess[entity];
    let collide = game.World.CollideDynamic[entity];
    let rigid_body = game.World.RigidBody2D[entity];
    let transform = game.World.Transform2D[entity];

    if (collide.ContactId === null) {
        return;
    }

    let other = game.World.CollideStatic[collide.ContactId];
    if (control.Needs & other.Layer) {
        control.Needs &= ~other.Layer;
        collide.Mask &= ~other.Layer;

        rigid_body.VelocityResolved[0] = 0;
        rigid_body.VelocityResolved[1] = 0;

        if (other.Layer & Layer.ProcessBoil) {
            set_color(game, entity, hsva_to_vec4(float(0, 0.1), 1, 1, 1));
            transform.Rotation = element(rotations);
            return;
        }

        if (other.Layer & Layer.ProcessPeel) {
            set_sprite(game, entity, "ziemniak_obrany");
            set_color(game, entity, [1, 1, 1, 1]);
            transform.Rotation = element(rotations);
            return;
        }

        if (other.Layer & Layer.ProcessCut) {
            set_sprite(game, entity, "ziemniak_kawalek" + integer(1, 2));
            set_color(game, entity, [1, 1, 1, 1]);
            transform.Scale[0] = 0.5;
            transform.Scale[1] = 0.5;
            transform.Rotation = element(rotations);
            collide.Radius = 0.5;
            return;
        }
    }
}
