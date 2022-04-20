/**
 * @module systems/sys_physics_resolve
 */

import {Vec2} from "../../common/math.js";
import {add, copy, dot, scale} from "../../common/vec2.js";
import {Entity} from "../../common/world.js";
import {RigidKind} from "../components/com_rigid_body2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Collide2D | Has.RigidBody2D;

export function sys_physics2d_resolve(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            update(game, ent);
        }
    }
}

const response_translation: Vec2 = [0, 0];
const response_velocity: Vec2 = [0, 0];

function update(game: Game, entity: Entity) {
    let rigid_body = game.World.RigidBody2D[entity];
    let collide = game.World.Collide2D[entity];

    if (rigid_body.Kind === RigidKind.Dynamic) {
        let has_collision = false;

        for (let i = 0; i < collide.Collisions.length; i++) {
            let collision = collide.Collisions[i];
            if (game.World.Signature[collision.OtherId] & Has.RigidBody2D) {
                has_collision = true;

                let transform = game.World.Transform2D[entity];
                scale(response_translation, collision.Normal, -collision.Depth);
                add(transform.Translation, transform.Translation, response_translation);
                game.World.Signature[entity] |= Has.Dirty;

                let other_rigid_body = game.World.RigidBody2D[collision.OtherId];
                let response_magnitude = dot(rigid_body.VelocityIntegrated, collision.Normal);
                scale(
                    response_velocity,
                    collision.Normal,
                    -response_magnitude * other_rigid_body.Friction
                );
                add(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated, response_velocity);
            }
        }

        if (!has_collision) {
            copy(rigid_body.VelocityResolved, rigid_body.VelocityIntegrated);
        }
    }
}
