/**
 * @module systems/sys_control_always2d
 */

import {hsva_to_vec4} from "../../common/color.js";
import {element, float, integer} from "../../common/random.js";
import {Entity} from "../../common/world.js";
import {ProcessKind} from "../components/com_control_process.js";
import {render2d} from "../components/com_render2d.js";
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

    // Set it up.
    if (collide.Mask === Layer.None) {
        switch (control.Kind) {
            case ProcessKind.Potato: {
                collide.Mask = Layer.Obstacle | Layer.PotatoBoil;
                break;
            }
        }
    }

    if (collide.ContactId === null) {
        return;
    }

    let other = game.World.CollideStatic[collide.ContactId];
    if (other.Layer === Layer.Obstacle) {
        return;
    }

    rigid_body.VelocityResolved[0] = 0;
    rigid_body.VelocityResolved[1] = 0;

    switch (control.Kind) {
        case ProcessKind.Potato: {
            if (other.Layer & Layer.PotatoBoil) {
                render2d("ziemniak_surowy", hsva_to_vec4(float(0, 0.1), 1, 1, 1))(game, entity);
                transform.Rotation = element(rotations);
                collide.Mask &= ~Layer.PotatoBoil;
                collide.Mask |= Layer.PotatoPeel;
                break;
            }
            if (other.Layer & Layer.PotatoPeel) {
                render2d("ziemniak_obrany")(game, entity);
                transform.Rotation = element(rotations);
                collide.Mask &= ~Layer.PotatoPeel;
                collide.Mask |= Layer.PotatoCut;
                break;
            }
            if (other.Layer & Layer.PotatoCut) {
                render2d("ziemniak_kawalek" + integer(1, 2))(game, entity);
                transform.Scale[0] = 0.5;
                transform.Scale[1] = 0.5;
                transform.Rotation = element(rotations);
                collide.Mask &= ~Layer.PotatoCut;
                collide.Mask |= Layer.Bowl;
                collide.Radius = 0.5;
                break;
            }

            break;
        }
    }
}
